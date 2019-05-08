<?php

namespace App\Controller;

use App\Base\Mailer;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ApplyResetPassword
{
    private $mailer;
    private $manager;
    private $userPasswordEncoder;

    public function __construct(
        EntityManagerInterface $manager,
        Mailer $mailer,
        UserPasswordEncoderInterface $userPasswordEncoder
    )
    {
        $this->manager = $manager;
        $this->mailer = $mailer;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * @throws BadRequestHttpException|AccessDeniedException
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent());
            $token = $content->token;
            $password = $content->newpassword;

            $user = $this->manager->getRepository(User::class)->findOneBy([
                'token' => $token
            ]);

            if ($user instanceof User) {
                $user->setPassword($this->userPasswordEncoder->encodePassword($user, $password));
                $user->setToken(null);

                $this->manager->persist($user);
                $this->manager->flush();
            }
        } catch (\Exception $e) {}

        return new JsonResponse();
    }
}
