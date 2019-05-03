<?php

declare(strict_types=1);

namespace App\Subscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTGenerationSubscriber
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        $payload = $event->getData();
        $payload['id'] = $user->getId();
        $payload['exp'] = time() + (60 * 60 * 24 * 30 * 6); // six months token lifetime

        $event->setData($payload);
    }
}
