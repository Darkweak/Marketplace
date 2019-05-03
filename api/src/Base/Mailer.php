<?php

namespace App\Base;

use App\Entity\User;
use Twig\Environment;

class Mailer
{
    private $environment;
    private $mailer;

    public function __construct(Environment $environment, \Swift_Mailer $mailer)
    {
        $this->environment = $environment;
        $this->mailer = $mailer;
    }

    public function send(User $user, string $template, string $title, array $params = []): void
    {
        $message = (new \Swift_Message($title))
            ->setFrom('no-reply@marketplace.com')
            ->setTo($user->getEmail())
            ->setBody(
                $this->environment->render(
                    $template,
                    $params
                )
            )->setContentType("text/html");
        $this->mailer->send($message);
    }
}
