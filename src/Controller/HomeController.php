<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;
use App\Repository\ArticleRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * Accueil
     */ 
    #[Route('/', name: 'home')]
    public function index(ArticleRepository $articleRepository): Response
    {

        return $this->render('home/index.html.twig', [
            'class_body' => 'accueil',
            'articles' => $articleRepository->findAllFront(true, 3),
        ]);
    }

    
    /**
     * Contact
     */
    #[Route('/contact', name: 'contact')]
    public function contact(Request $request, MailerInterface $mailer): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $email = new TemplatedEmail();
            $email->to(new Address("contact@bdelanls.fr", "bdelanls"))
                ->from($contact->getEmail())
                ->subject("Message de contact du site Guy Taracoustik")
                ->htmlTemplate('home/email_contact.html.twig')
                ->context([
                    "message" => $contact->getMessage()
                ]);

            $mailer->send($email);
            $this->addFlash("success", "Votre message a bien été envoyé.");
            return $this->redirectToRoute('home', [], Response::HTTP_SEE_OTHER);


        }

        return $this->renderForm('home/contact.html.twig', [
            'class_body' => 'contact',
            'contact' => $contact,
            'form' => $form,
        ]);
    }


    /**
     * Biographie
     */ 
    #[Route('/biographie', name: 'biographie')]
    public function biographie(): Response
    {

        return $this->render('home/biographie.html.twig', [
            'class_body' => 'bio',
        ]);
    }

    /**
     * Cours
     */ 
    #[Route('/cours', name: 'cours')]
    public function cours(): Response
    {

        return $this->render('home/cours.html.twig', [
            'class_body' => 'cours',
        ]);
    }

    /**
     * Mentions légales
     */ 
    #[Route('/mentions-legales', name: 'mentions')]
    public function mentions(): Response
    {

        return $this->render('home/mentions.html.twig', [
            'class_body' => 'mentions',
        ]);
    }
    
    /**
     * Politique de confidentialité
     */ 
    #[Route('/politique-de-confidentialite', name: 'pol-conf')]
    public function polConf(): Response
    {

        return $this->render('home/pol-conf.html.twig', [
            'class_body' => 'mentions',
        ]);
    }


    /**
     * CGU / CGV
     */ 
    #[Route('/CGV-CGU', name: 'cgv-cgu')]
    public function cgvcgu(): Response
    {

        return $this->render('home/cgv-cgu.html.twig', [
            'class_body' => 'mentions',
        ]);
    }


}
