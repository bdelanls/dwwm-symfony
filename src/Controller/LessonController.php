<?php

namespace App\Controller;

use DateTime;
use DateTimeZone;
use App\Entity\User;
use ReflectionClass;
use App\Entity\Lesson;
use App\Service\Mailer;
use App\Form\LessonType;
use App\Entity\LessonDay;
use App\Form\LessonDayType;
use App\Form\LessonReserveType;
use App\Service\CalendarService;
use App\Service\FunctionService;
use App\Repository\UserRepository;
use Symfony\Component\Mime\Address;
use App\Repository\LessonRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/backstage/lesson')]
class LessonController extends AbstractController
{
    
    #[Route('/', name: 'lesson_index', methods: ['GET']), IsGranted('ROLE_STUDENT')]
    public function index(LessonRepository $lessonRepository, UserRepository $userRepository): Response
    {
        $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
        
        $curentUser = $this->getUser();
        $role = $curentUser->getRoles();

        if (in_array("ROLE_STUDENT", $role)){
            $lessons = $lessonRepository->findByNextDayUser($time, $curentUser->getId());
        }else if (in_array("ROLE_TEACHER", $role) || in_array("ROLE_ADMIN", $role)){
            $lessons = $lessonRepository->findByNextDay($time);
        }else{
            return $this->render('user/show.html.twig', [
                'user' => $curentUser,
            ]);
        }


        
        $users = $userRepository->findAll();

        return $this->render('lesson/index.html.twig', [
            'lessons' => $lessons,
            'users' => $users,
        ]);
    }




    /**
     * Agenda du mois
     */
    #[Route('/agenda/{month}/{year}', name: 'lesson_agenda_index', methods: ['GET']), IsGranted('ROLE_STUDENT')]
    public function index_month(int $month=null, int $year=null, LessonRepository $lessonRepository): Response
    {
        $calendar = new CalendarService($month, $year);
        $mois = $calendar->toString();

        $month = $calendar->month;
        $year = $calendar->year;

        $jours = cal_days_in_month(CAL_GREGORIAN, $calendar->month, $calendar->year);

        // repository
        $dateDebut = date("$year-$month-01");
        $dateFin = date("$year-$month-$jours".' 23:59:59.9');
        $lessons = $lessonRepository->findByMonth($dateDebut, $dateFin);

        setlocale(LC_TIME, "fr_FR");
        $firstDay = strftime('%w', strtotime($dateDebut));
        $daysOfWeek = $calendar->days;

        $curentUser = $this->getUser();        

        return $this->render('lesson/index_agenda.html.twig', [
            'lessons' => $lessons,
            'mois' => $mois,
            'month' => $month,
            'year' => $year,
            'jours' => $jours,
            'firstDay' => $firstDay,
            'daysOfWeek' => $daysOfWeek,
            'curentUser' => $curentUser,
        ]);
    }

    /**
     * Ajouter des heures de cours dans une journée
     */
    #[Route('/new_day/{date}', name: 'lesson_new_day', methods: ['GET','POST']), IsGranted('ROLE_TEACHER')]
    public function new_day($date, Request $request, FunctionService $functionService, LessonRepository $lessonRepository): Response
    {      
        $lessons = $lessonRepository->findByDay($date.'%');
        
        $lessonDay = new LessonDay();
        $form = $this->createForm(LessonDayType::class, $lessonDay);
        $form->handleRequest($request);

        $lessonDay->setDate($date);

        // init les heures ouvertes aux cours
        $arrLessons = [];
        for ($i=8; $i<=20; $i++){
            // $lessonDay->{'setH'.$i}(0);
            $arrLessons['h'.$i] = 0;
        }
        for ($i=0; $i < count($lessons); $i++){
            $heure = $lessons[$i]->getHour();
            // $lessonDay->{'setH'.$heure}($heure);
            $arrLessons['h'.$heure] = 1;
        }
        

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();

            $tabLessonDay = $functionService->dismount($lessonDay);
            
            for ($i = 8; $i <= 20; $i++){
                if ($tabLessonDay['h'.$i] == "true" ){    

                    $lesson = new Lesson();

                    $time = new DateTime($lessonDay->getDate(), new DateTimeZone('Europe/Paris'));

                    $lesson->setDate($time);
                    $lesson->setHour($i);

                    $entityManager->persist($lesson);
                    $entityManager->flush();
                }
            }


             return $this->redirectToRoute('lesson_agenda_index', 
                [
                    'month' => date_format($time, 'm'), 
                    'year' => date_format($time, 'Y')
                ], 
                Response::HTTP_SEE_OTHER);

        }

        return $this->renderForm('lesson/new_day.html.twig', [
            'lesson' => $lessonDay,
            'form' => $form,
            'arrLesson' => $arrLessons,
        ]);
    }   


    /**
     *  Création d'un cours direct par l'agenda
     */
    #[Route('/hour', name: 'hour_new', methods: ['GET','POST']), IsGranted('ROLE_TEACHER')]
    public function newHour(Request $request): Response
    {
        $submittedToken = $request->request->get('token');
        
        if ($this->isCsrfTokenValid('new-hour', $submittedToken)) {
            $entityManager = $this->getDoctrine()->getManager();

            $lesson = new Lesson();

            $date = $request->request->get('date');
            $hour = $request->request->get('hour');

            $dateTime = DateTime::createFromFormat('Y-m-j', $date);

            $lesson->setDate($dateTime);
            $lesson->setHour($hour);

            
            $entityManager->persist($lesson);
            $entityManager->flush();

            return $this->redirectToRoute('lesson_agenda_index', 
                [
                    'month' => date_format($dateTime, 'm'), 
                    'year' => date_format($dateTime, 'Y')
                ], 
                Response::HTTP_SEE_OTHER);


        }

        return $this->redirectToRoute('lesson_agenda_index', [], Response::HTTP_SEE_OTHER);

    }





    #[Route('/{id}', name: 'lesson_show', methods: ['GET']), IsGranted('ROLE_TEACHER')]
    public function show(Lesson $lesson): Response
    {
        return $this->render('lesson/show.html.twig', [
            'lesson' => $lesson,
        ]);
    }

    /**
     * Reservation d'un cours
     */
    #[Route('/{id}/reservation', name: 'reserve_edit', methods: ['GET','POST']), IsGranted('ROLE_STUDENT')]
    public function reserve(Request $request, Lesson $lesson, Mailer $mailer): Response
    {
        $form = $this->createForm(LessonReserveType::class, $lesson);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
            $user = $this->getUser();

            $lesson->setBookedOn($time);
            $lesson->setUser($user);

            $this->getDoctrine()->getManager()->flush();

            // Envoi d'un mail
            $to = '';
            $subject = "Un cours vient d'être réservé";
            $date = $lesson->getDate();
            $student = $user;
            $tmp = 'email_reservation.html.twig';
            $mailer->envoiEmail($to , $subject, $date, $student, $tmp);
            

            $this->addFlash('success', 'La réservation a été enregistrée');
            return $this->redirectToRoute('lesson_agenda_index', [
                'month' => date_format($date, 'm'), 
                'year' => date_format($date, 'Y')
            ], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('lesson/reserve.html.twig', [
            'lesson' => $lesson,
            'form' => $form,
        ]);
    }


    /**
     * Validation d'un cours
     */
    #[Route('/{id}/edit', name: 'lesson_edit', methods: ['GET','POST']), IsGranted('ROLE_STUDENT')]
    public function edit(Request $request, Lesson $lesson, Mailer $mailer): Response
    {
        $form = $this->createForm(LessonType::class, $lesson);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $user = $this->getUser();

            // Envoi d'un mail si valid
            if ($lesson->getValid()){
            
                $to = $lesson->getUser()->getEmail();
                $subject = "Un cours vient d'être validé";
                $date = $lesson->getDate();
                $student = $lesson->getUser();    
                $tmp = 'email_validation.html.twig';
                $mailer->envoiEmail($to , $subject, $date, $student, $tmp);

                $this->addFlash('success', 'Le cours a été validé');
            }else{
                $this->addFlash('success', 'Le cours n\'est plus validé ! Vous devez prévenir ' . $lesson->getUser()->getFirstname() . ' ' . $lesson->getUser()->getLastname());
            }
            return $this->redirectToRoute('lesson_agenda_index', [
                'month' => date_format($lesson->getDate(), 'm'), 
                'year' => date_format($lesson->getDate(), 'Y')
            ], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('lesson/edit.html.twig', [
            'lesson' => $lesson,
            'form' => $form,
        ]);
    }

 
    /**
     * Annulation d'un cours
     */
    #[Route('/{id}/cancel', name: 'lesson_cancel', methods: ['POST']), IsGranted('ROLE_STUDENT')]
    public function cancel(Request $request, Lesson $lesson): Response
    {
        if ($this->isCsrfTokenValid('cancel'.$lesson->getId(), $request->request->get('_token'))) {

            $lesson->setBookedOn(null);
            $lesson->setValid(null);
            $lesson->setUser(null);

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'Le cours a été annulé');
        }

        return $this->redirectToRoute('lesson_index', [], Response::HTTP_SEE_OTHER);
    }



    #[Route('/{id}', name: 'lesson_delete', methods: ['POST']), IsGranted('ROLE_TEACHER')]
    public function delete(Request $request, Lesson $lesson): Response
    {
        if ($this->isCsrfTokenValid('delete'.$lesson->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($lesson);
            $entityManager->flush();
        }

        return $this->redirectToRoute('lesson_index', [], Response::HTTP_SEE_OTHER);
    }
}
