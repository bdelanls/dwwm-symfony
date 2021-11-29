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
            ->htmlTemplate('lesson/'.$tmp)
            ->context([
                'date' => $date,
                'student' => $student,
            ]);

        $this->mailer->send($email);


    }


}