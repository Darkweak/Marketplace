<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class RetrieveCurrentUser
{
    private $token;

    public function __construct(TokenStorageInterface $token)
    {
        $this->token = $token;
    }

    public function __invoke()
    {
        return $this->token->getToken()->getUser();
    }
}
