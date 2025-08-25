<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class GamesController extends AbstractController
{
    #[Route('/island/{id}', name: 'island')]
    public function island(User $user): Response
    {
        $team = $user->getTeams();
        return $this->render('games/island.html.twig', [
            'team' => $team,
            'user' => $user,
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
