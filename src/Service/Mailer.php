<?php 
namespace App\Service;

use Symfony\Component\Mime\Address;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class Mailer 
{

    private $mailer;
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }


    public function envoiEmail(string $to, string $subject, object $date, object $student, string $tmp) {

        if ($to == ''){
            $to = "guy@taracoustik.fr";
        }


        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@bdelanls.fr', 'no-reply'))
            ->to($to)
            ->subject($subject)
            ->htmlTemplate('email/'.$tmp)
            ->context([
                'date' => $date,
                'student' => $student,
            ]);

        $this->mailer->send($email);


    }


    public function envoiEmailDelete(string $to, string $subject, array $lessonsDelete, array $lessonsNoDelete, object $student, string $tmp) {

        if ($to == ''){
            $to = "guy@taracoustik.fr";
        }


        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@bdelanls.fr', 'no-reply'))
            ->to($to)
            ->subject($subject)
            ->htmlTemplate('email/'.$tmp)
            ->context([
                'lessonsDelete' => $lessonsDelete,
                'lessonsNoDelete' => $lessonsNoDelete,
                'student' => $student,
            ]);

        $this->mailer->send($email);


    }


}