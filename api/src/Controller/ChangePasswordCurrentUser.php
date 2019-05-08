<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ChangePasswordCurrentUser
{
    private $manager;
    private $token;
    private $userPasswordEncoder;

    public function __construct(
        EntityManagerInterface $manager,
        TokenStorageInterface $token,
        UserPasswordEncoderInterface $userPasswordEncoder
    )
    {
        $this->manager = $manager;
        $this->token = $token;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * @throws BadRequestHttpException|AccessDeniedException
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = $this->token->getToken()->getUser();

        if (!$user instanceof User) {
            throw new AccessDeniedException();
        }

        try {
            $content = json_decode($request->getContent());
            $oldPassword = $content->oldpassword;

            if (!$this->userPasswordEncoder->isPasswordValid($user, $oldPassword)) {
                throw new BadRequestHttpException();
            }

            $newPassword = $content->newpassword;

            $user->setPassword($this->userPasswordEncoder->encodePassword($user, $newPassword));
            $this->manager->persist($user);
            $this->manager->flush();

            return new JsonResponse();
        } catch (\Exception $e) {
            throw new BadRequestHttpException();
        }
    }
}
