<?php

namespace App\Controller;

use App\Base\Mailer;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class RequestResetPassword
{
    private $mailer;
    private $manager;

    public function __construct(
        EntityManagerInterface $manager,
        Mailer $mailer
    )
    {
        $this->manager = $manager;
        $this->mailer = $mailer;
    }

    /**
     * @throws BadRequestHttpException|AccessDeniedException
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent());
            $username = $content->username;

            $user = $this->manager->getRepository(User::class)->findByEmailOrUsername($username);

            if ($user instanceof User) {
                $token = hash('sha512',$user->getUsername().$user->getEmail().(new \DateTime())->format('Y-m-d H:i:s'));
                $user->setToken($token);

                $this->mailer->send(
                    $user,
                    'reset',
                    'Réinitialisation de votre mot de passe',
                    [
                        'token' => $token
                    ]
                );

                $this->manager->persist($user);
                $this->manager->flush();
            }
        } catch (\Exception $e) {}

        return new JsonResponse();
    }
}
