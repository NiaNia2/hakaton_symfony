<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\TeamsRepository;
use App\Repository\UnitsRepository;
use App\Service\TurnBasedBattleService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class GamesController extends AbstractController
{
    #[Route('/units/colors', name: 'units_colors_by_type', methods: ['GET','POST'])]
    public function colorsByType(Request $request, UnitsRepository $unitsRepository, TeamsRepository $teamsRepository): Response
    {
        $type = $request->get('type');

        if (!$type) {
            return new Response('', Response::HTTP_NO_CONTENT);
        }

        $colors = $unitsRepository->findBy(['type' => $type], ['color' => 'ASC']);

        $team = $teamsRepository->findOneBy(['user' => $this->getUser()]);
        $unitOneType   = $team?->getUnitOne()?->getType();
        $unitOneColor  = $team?->getUnitOne()?->getColor();
        $unitTwoType   = $team?->getUnitTwo()?->getType();
        $unitTwoColor  = $team?->getUnitTwo()?->getColor();
        $unitThreeType = $team?->getUnitThree()?->getType();
        $unitThreeColor= $team?->getUnitThree()?->getColor();

        return $this->render('games/units/_color_options.html.twig', [
            'colors'         => $colors,
            'unitOneType'    => $unitOneType,
            'unitOneColor'   => $unitOneColor,
            'unitTwoType'    => $unitTwoType,
            'unitTwoColor'   => $unitTwoColor,
            'unitThreeType'  => $unitThreeType,
            'unitThreeColor' => $unitThreeColor,
        ]);
    }

    #[Route('/island/{id}', name: 'island')]
    public function island(User $user, Request $request, UnitsRepository $unitsRepository): Response
    {

        $typesRows = $unitsRepository->createQueryBuilder('unit')
            ->select('DISTINCT unit.type')
            ->getQuery()
            ->getScalarResult();
        $types = array_map(fn($r) => $r['type'], $typesRows);
        $team = $user->getTeams();

        return $this->render('games/island.html.twig', [
            'team' => $team,
            'user' => $user,
            'types' => $types,
            'unitOneType'     => $team?->getUnitOne()?->getType(),
            'unitOneColor'    => $team?->getUnitOne()?->getColor(),
            'unitTwoType'     => $team?->getUnitTwo()?->getType(),
            'unitTwoColor'    => $team?->getUnitTwo()?->getColor(),
            'unitThreeType'   => $team?->getUnitThree()?->getType(),
            'unitThreeColor'  => $team?->getUnitThree()?->getColor(),
        ]);
    }

    #[Route('/team/save-unit', name: 'team_save_unit', methods: ['POST'])]
    public function saveUnit(Request $request, UnitsRepository $unitsRepo, TeamsRepository $teamsRepo, EntityManagerInterface $entityManager,): Response
    {
        $slot  = $request->request->get('slot');
        $type  = $request->request->get('type');
        $color = $request->request->get('color');

        if (!$slot || !$type || !$color) {
            return new Response('', Response::HTTP_NO_CONTENT);
        }

        $team = $teamsRepo->findOneBy(['user' => $this->getUser()]);

        $unit = $unitsRepo->findOneBy(['type' => $type, 'color' => $color]);
        if (!$unit) {
            return new Response('Invalid unit', Response::HTTP_BAD_REQUEST);
        }

        match ($slot) {
            'one'   => $team->setUnitOne($unit),
            'two'   => $team->setUnitTwo($unit),
            'three' => $team->setUnitThree($unit),
            default => null
        };

        $entityManager->persist($team);
        $entityManager->flush();

        $previewId = match ($slot) {
            'one' => 'unitOnePreview',
            'two' => 'unitTwoPreview',
            'three' => 'unitThreePreview',
            default => null,
        };

        $html = $this->renderView('games/units/_unit_card_wrapper.html.twig', [
            'previewId' => $previewId,
            'unit'      => $unit,
        ]);

        return new Response($html, Response::HTTP_OK);
    }

    #[Route('/games', name: 'games')]
    public function index(): Response
    {
        return $this->render('games/game.html.twig', [
            'controller_name' => 'GamesController',
        ]);
    }

    #[Route('/battle/turn-based', name: 'battle_turn_based', methods: ['GET'])]
    public function turnBased(Request $request, TeamsRepository $teamsRepository, TurnBasedBattleService $battle): Response
    {
        $teamAId = $request->query->get('teamA');
        $teamBId = $request->query->get('teamB');

        if (!$teamAId || !$teamBId) {
            return $this->json(['error' => 'teamA et teamB sont requis'], Response::HTTP_BAD_REQUEST);
        }

        $teamA = $teamsRepository->find($teamAId);
        $teamB = $teamsRepository->find($teamBId);

        if (!$teamA || !$teamB) {
            return $this->json(['error' => 'Equipe introuvable'], Response::HTTP_NOT_FOUND);
        }

        $result = $battle->simulate($teamA, $teamB);

        return $this->json($result);
    }

    #[Route('/battle/view', name: 'battle_view', methods: ['GET'])]
    public function battleView(Request $request, TeamsRepository $teamsRepository, TurnBasedBattleService $battle): Response
    {
        $teamAId = $request->query->get('teamA');
        $teamBId = $request->query->get('teamB');

        if (!$teamAId || !$teamBId) {
            throw $this->createNotFoundException('Paramètres teamA et teamB requis');
        }

        $teamA = $teamsRepository->find($teamAId);
        $teamB = $teamsRepository->find($teamBId);

        if (!$teamA || !$teamB) {
            throw $this->createNotFoundException('Equipe introuvable');
        }

        $result = $battle->simulate($teamA, $teamB);

        return $this->render('games/CombatSummary.html.twig', [
            'teamA'  => $teamA,
            'teamB'  => $teamB,
            'result' => $result,
        ]);
    }

    #[Route('/opponents', name: 'opponents_list', methods: ['GET'])]
    public function listOpponents(TeamsRepository $teamsRepository): Response
    {
        $currentUser = $this->getUser();
        $myTeam = $teamsRepository->findOneBy(['user' => $currentUser]);

        // Equipes adverses complètes (3 unités) et exclure l'utilisateur courant
        $qb = $teamsRepository->createQueryBuilder('t')
            ->leftJoin('t.user', 'u')
            ->addSelect('u')
            ->where('t.unitOne IS NOT NULL')
            ->andWhere('t.unitTwo IS NOT NULL')
            ->andWhere('t.unitThree IS NOT NULL');

        if ($currentUser) {
            $qb->andWhere('u != :me')->setParameter('me', $currentUser);
        }

        $opponents = $qb->getQuery()->getResult();

        return $this->render('games/opponents.html.twig', [
            'myTeam'    => $myTeam,
            'opponents' => $opponents,
        ]);
    }

}
