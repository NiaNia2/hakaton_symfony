<?php

namespace App\Controller;

use App\Entity\Units;
use App\Entity\User;
use App\Repository\UnitsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class GamesController extends AbstractController
{
    #[Route('/units/colors', name: 'units_colors_by_type', methods: ['GET','POST'])]
    public function colorsByType(Request $request, UnitsRepository $repository): Response
    {
        $type = $request->get('type');

        if (!$type) {
            return new Response('', 200);
        }

        $colors = $repository->findBy(["type" => $type]);

        return $this->render('games/units/_color_options.html.twig', [
            'colors' => $colors,
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
