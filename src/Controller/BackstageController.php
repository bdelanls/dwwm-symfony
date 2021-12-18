<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/backstage'), IsGranted('ROLE_USER')]
class BackstageController extends AbstractController
{
    #[Route('/', name: 'backstage_index')]
    public function index(): Response
    {
        return $this->render('backstage/index.html.twig', [
            // 'user' => $user,
            'user' => 'Bertrand',
        ]);
    }

    
}
