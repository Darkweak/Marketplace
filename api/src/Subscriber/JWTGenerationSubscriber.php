<?php

declare(strict_types=1);

namespace App\Subscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class JWTGenerationSubscriber
{
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        $payload = $event->getData();
        $payload['cart'] = $this->serializer->serialize($user->getCart(), JsonEncoder::FORMAT, ['groups' => 'user_read']);
        $payload['exp'] = time() + (60 * 60 * 24 * 30 * 6); // six months token lifetime

        $event->setData($payload);
    }
}
