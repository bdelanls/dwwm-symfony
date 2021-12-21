<?php

namespace App\Security;

use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class EmailVerifier
{
    private $verifyEmailHelper;
    private $mailer;
    private $entityManager;

    public function __construct(VerifyEmailHelperInterface $helper, MailerInterface $mailer, EntityManagerInterface $manager)
    {
        $this->verifyEmailHelper = $helper;
        $this->mailer = $mailer;
        $this->entityManager = $manager;
    }

    public function sendEmailConfirmation(string $verifyEmailRouteName, UserInterface $user, TemplatedEmail $email): void
    {
        $signatureComponents = $this->verifyEmailHelper->generateSignature(
            $verifyEmailRouteName,
            $user->getId(),
            $user->getEmail(),
            ['id' => $user->getId()]
        );

        $context = $email->getContext();
        $context['signedUrl'] = $signatureComponents->getSignedUrl();
        $context['expiresAtMessageKey'] = $signatureComponents->getExpirationMessageKey();
        $context['expiresAtMessageData'] = $signatureComponents->getExpirationMessageData();

        $email->context($context);

        $this->mailer->send($email);

        // Envoi d'un mail au professeur
        $emailToTeacher = (new Email())
            ->from('no-reply@bdelanls.fr')
            ->to('project@bdelanls.fr')
            ->subject('Un nouvel utilisateur vient de s\'inscrire')
            ->text('Un nouvel utilisateur vient de s\'inscrire')
            ->html('<div style="font-family: Arial;">
                    <p>Bonjour,</p>
                    <p>'. $user->getFirstname() . ' ' . $user->getLastname() . ' vient de s\'inscrire sur le site dwwm.bdelanls.fr</p>
                    </div>')
            ;

        $this->mailer->send($emailToTeacher);
        
    }

    /**
     * @throws VerifyEmailExceptionInterface
     */
    public function handleEmailConfirmation(Request $request, UserInterface $user): void
    {
        $this->verifyEmailHelper->validateEmailConfirmation($request->getUri(), $user->getId(), $user->getEmail());

        $user->setIsVerified(true);
        $user->setRoles(["ROLE_STUDENT"]);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
