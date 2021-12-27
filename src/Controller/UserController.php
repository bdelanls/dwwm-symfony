<?php

namespace App\Controller;

use DateTime;
use DateInterval;
use DateTimeZone;
use App\Entity\File;
use App\Entity\User;
use App\Form\UserType;
use App\Form\FilesType;
use App\Service\Mailer;
use App\Form\UserNoteType;
use App\Form\UserRoleType;
use App\Form\FilesUserType;
use App\Service\UploadService;
use App\Repository\FileRepository;
use App\Repository\UserRepository;
use App\Repository\LessonRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\Session;
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
        // test User
        if ($this->getUser()->getRoles() != "ROLE_ADMIN") {
            $user = $this->getUser();
        }


        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }


    /**
     * Method student_show
     */
    #[Route('backstage/student/{id}', name: 'student_show', methods: ['GET', 'POST']), IsGranted('ROLE_TEACHER')]    
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



    #[Route('user/{id}/edit', name: 'user_edit', methods: ['GET','POST']), IsGranted('ROLE_USER')]
    public function edit(Request $request, User $user): Response
    {
        // test User
        if ($this->getUser()->getRoles() != "ROLE_ADMIN") {
            $user = $this->getUser();
        }

        
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
    public function delete(Request $request, User $user, LessonRepository $lessonRepository, Mailer $mailer, UserRepository $userRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {

            $admin = $userRepository->findByRole('ADMIN');
            

            // on récupère toutes les cours de l'user
            // $time = new DateTime('now', new DateTimeZone('Europe/Paris'));
            // $lessons = $lessonRepository->findByNextDayUser($time, $user->getId());
            $lessons = $lessonRepository->findBy(['user' => $user->getId()], []);
            
            $message = "";

           

            if ($lessons){

                $now = new DateTime('now', new DateTimeZone('Europe/Paris'));
                $afterTomorrow = $now->add(new DateInterval('P2D'));

                $arrLessonsSupp = [];
                $arrLessonsNonSupp = [];
            
                for ($i=0; $i < count($lessons); $i++){

                    if($lessons[$i]->getDate() < $now) {

                        // le cours est attribué à l'admin
                        $lessons[$i]->setUser($admin[0]);

                    }else if($lessons[$i]->getDate() > $afterTomorrow || $lessons[$i]->getValid() == false ){
                        $arrLessonsSupp[] = $lessons[$i];

                        $lessons[$i]->setBookedOn(null);
                        $lessons[$i]->setValid(null);
                        $lessons[$i]->setUser(null);

                        $this->getDoctrine()->getManager()->flush();

                    }else{
                        $arrLessonsNonSupp[] = $lessons[$i];
                    }
                }

            }


            if (isset($arrLessonsNonSupp) && $arrLessonsNonSupp){

                // mail
                $to = $user->getEmail();
                $subject = "Suppression de compte";
                $lessonsDelete = $arrLessonsSupp;
                $lessonsNoDelete = $arrLessonsNonSupp;
                $student = $user; 
                $tmp = 'email_delete_standby.html.twig';
                // mail à l'élève
                $mailer->envoiEmailDelete($to , $subject, $lessonsDelete, $lessonsNoDelete, $student, $tmp);
                // mail au prof
                $mailer->envoiEmailDelete('' , $subject, $lessonsDelete, $lessonsNoDelete, $student, 'email_delete_standby_teacher.html.twig');


                // message
                if (count($arrLessonsNonSupp) == 1){
                    $message = "Un cours ne peut pas être annulé. Un mail a été envoyé au professeur pour qu'il annule le cours et supprime votre compte.";
                }else if (count($arrLessonsNonSupp) > 1) {
                    $message = "Des cours ne peuvent pas être annulé. Un mail a été envoyé au professeur pour qu'il annule les cours et supprime votre compte.";
                }

            }else{

                // aucune cours

                //mail
                $to = $user->getEmail();
                $subject = "Suppression de compte";
                $lessonsDelete = [];
                $lessonsNoDelete = [];
                $student = $user; 
                $tmp = 'email_delete.html.twig';
                // mail à l'élève
                $mailer->envoiEmailDelete($to , $subject, $lessonsDelete, $lessonsNoDelete, $student, $tmp);
                // mail au prof
                $mailer->envoiEmailDelete('' , $subject, $lessonsDelete, $lessonsNoDelete, $student, 'email_delete_teacher.html.twig');

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->remove($user);
                $entityManager->flush();

                // Exit
                $this->container->get('security.token_storage')->setToken(null);
                $message = 'Votre compte a été supprimé ainsi que toutes les données vous concernant.';
                $this->addFlash('success', $message);
                return $this->redirectToRoute('home');


            }


            $this->addFlash('success', $message);
            return $this->redirectToRoute('home', [], Response::HTTP_SEE_OTHER);

  
            
        }

        return $this->redirectToRoute('user_index', [], Response::HTTP_SEE_OTHER);
    }
}
