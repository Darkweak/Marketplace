<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class Activate
{
    private $registry;

    public function __construct(RegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    public function __invoke(Request $request)
    {
        $content = \json_decode($request->getContent());

        try {
            $token = $content->token;
        } catch (\Exception $e) {
            throw new BadRequestHttpException();
        }

        $user = $this->registry->getRepository(User::class)->findOneBy([
            'token' => $token
        ]);

        if (!($user && $user instanceof User)) {
            throw new BadRequestHttpException();
        }

        $user->setToken('');
        $this->registry->getManager()->flush();

        return new JsonResponse();
    }
}
