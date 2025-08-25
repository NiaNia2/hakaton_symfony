<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\TeamsRepository;
use App\Repository\UnitsRepository;
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
            return new Response('', 200);
        }

        $types = $unitsRepository->createQueryBuilder('u')
            ->select('DISTINCT u.type')
            ->getQuery()
            ->getResult();
        $team = $teamsRepository->findOneBy(['user' => $this->getUser()]);

        return $this->render('games/units/_color_options.html.twig', [
            'types' => $types,
            'unitOneType' => $team?->getUnitOne()?->getType(),
            'unitOneColor' => $team?->getUnitOne()?->getColor(),
            'unitTwoType' => $team?->getUnitTwo()?->getType(),
            'unitTwoColor' => $team?->getUnitTwo()?->getColor(),
            'unitThreeType' => $team?->getUnitThree()?->getType(),
            'unitThreeColor' => $team?->getUnitThree()?->getColor(),
        ]);
    }

    #[Route('/island/{id}', name: 'island')]
    public function island(User $user, Request $request, UnitsRepository $unitsRepository): Response
    {
        $type = $request->query->get('type');
        $types = $unitsRepository->createQueryBuilder('u')->select('DISTINCT u.type')->getQuery()->getScalarResult();
        $team = $user->getTeams();
        $units = $unitsRepository->findBy(["type" => $type]);
        return $this->render('games/island.html.twig', [
            'team' => $team,
            'user' => $user,
            'units' => $units,
            'types' => $types,
            'type' => $type,
        ]);
    }

    #[Route('/games', name: 'games')]
    public function index(): Response
    {
        return $this->render('games/game.html.twig', [
            'controller_name' => 'GamesController',
        ]);
    }
}
