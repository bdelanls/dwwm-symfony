<?php

namespace App\Controller;

use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/backstage'), IsGranted('ROLE_USER')]
class BackstageController extends AbstractController
{
    #[Route('/', name: 'backstage_index')]
    public function index(): Response
    {
        return $this->render('backstage/index.html.twig', [
            'controller_name' => 'BackstageController',
        ]);
    }

    // #[Route('/profil/{id}', name: 'user_show', methods: ['GET'])]
    // public function show(User $user): Response
    // {
    //     return $this->render('user/show.html.twig', [
    //         'user' => $user,
    //     ]);
    // }
}
