<?php

namespace App\Controller;

use DateTimeZone;
use App\Entity\File;
use App\Entity\User;
use App\Form\UserType;
use App\Form\FilesType;
use App\Form\UserNoteType;
use App\Form\UserRoleType;
use App\Form\FilesUserType;
use App\Service\UploadService;
use App\Repository\FileRepository;
use App\Repository\LessonRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/')]
class UserController extends AbstractController
{
    #[Route('backstage/user/list', name: 'user_index', methods: ['GET']), IsGranted('ROLE_TEACHER') ]    
    public function index(UserRepository $userRepository): Response
    {

        $roleUser = $this->getUser()->getRoles();
        
        $tabUsers = $userRepository->findBy([], ['id' => 'DESC']);


        if (in_array("ROLE_ADMIN", $roleUser)) {
            return $this->render('user/index.html.twig', [
                'users' => $tabUsers,
            ]);

        } else {
            $tabStudent = [];
            foreach($tabUsers as $tabUser) {
                if(in_array('ROLE_STUDENT', $tabUser->getRoles()) || ($tabUser->isVerified() == 0)){
                    array_push($tabStudent, $tabUser);
                }
            }
            return $this->render('user/index.html.twig', [
                'users' => $tabStudent,
            ]);
        }

        
        
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


    /**
     * Method student_show
     */
    #[Route('backstage/student/{id}', name: 'student_show', methods: ['GET', 'POST']), 
    Security("is_granted('ROLE_ADMIN') and is_granted('ROLE_TEACHER')")]    
    public function student_show(int $id, User $user, Request $request, FileRepository $fileRepository, UploadService $uploader, LessonRepository $lessonRepository): Response
    {

        //dd($id);

        // Note
        $form_note = $this->createForm(UserNoteType::class, $user);
        $form_note->handleRequest($request);

        if ($form_note->isSubmitted() && $form_note->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'La note a été mise à jour');
            return $this->redirectToRoute('student_show', ['id' => $user->getId()], Response::HTTP_SEE_OTHER);
        }

        // Cours
        $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
        $lessons = $lessonRepository->findByNextDayUser($time, $user->getId());



        // Documents
        $files = $fileRepository->findAllByUser($user->getId());

        $file = new File();
        $form_file = $this->createForm(FilesUserType::class, $file);
        $form_file->handleRequest($request);

        if ($form_file->isSubmitted() && $form_file->isValid()) {
            $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
            $file->setPublishedAt($time);
            $userFile = $user;
            //dd($userFile);
            $file->addUser($user);

            $filePath = $form_file->get('path')->getData();
            if ($filePath) {
                $filename = $uploader->upload($filePath);
                $file->setPath($filename);

            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($file);
            $entityManager->flush();

            $this->addFlash('success', 'Le document a bien été envoyé');
            return $this->redirectToRoute('student_show', ['id' => $user->getId()], Response::HTTP_SEE_OTHER);
        }


        return $this->renderForm('user/student_show.html.twig', [
            'user' => $user,
            'form_note' => $form_note,
            'files' => $files,
            'form_file' => $form_file,
            'lessons' => $lessons,
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
