<?php

namespace App\Controller;

use DateTimeZone;
use App\Entity\User;
use App\Form\UserType;
use App\Form\UserRoleType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/')]
class UserController extends AbstractController
{
    #[Route('backstage/user/list', name: 'user_index', methods: ['GET']), IsGranted("ROLE_TEACHER"), IsGranted("ROLE_ADMIN")]
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('user/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    #[Route('user/new', name: 'user_new', methods: ['GET','POST'])]
    public function new(Request $request): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('user_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/new.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('backstage/profil/{id}', name: 'user_show', methods: ['GET']), IsGranted('ROLE_USER')]
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }


    #[Route('backstage/student/{id}', name: 'student_show', methods: ['GET']), IsGranted('ROLE_USER')]
    public function student_show(User $user): Response
    {
        return $this->render('user/student_show.html.twig', [
            'user' => $user,
        ]);
    }



    #[Route('user/{id}/edit', name: 'user_edit', methods: ['GET','POST'])]
    public function edit(Request $request, User $user): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        $form_role = $this->createForm(UserRoleType::class, $user);
        $form_role->handleRequest($request);

        $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));

            if ($form->isSubmitted() && $form->isValid()) {
            $user->setUpdateDate($time);
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'Le compte a bien été mis à jour.');
            return $this->redirectToRoute('user_show', ['id' => $user->getId()], Response::HTTP_SEE_OTHER);
        }

        if ($form_role->isSubmitted() && $form_role->isValid()) {
            $user->setUpdateDate($time);
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'Les rôles ont été mis à jour');
            return $this->redirectToRoute('user_show', ['id' => $user->getId()], Response::HTTP_SEE_OTHER);
        }


        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
            'form_role' => $form_role,
        ]);
    }


    #[Route('user/{id}', name: 'user_delete', methods: ['POST'])]
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index', [], Response::HTTP_SEE_OTHER);
    }
}
