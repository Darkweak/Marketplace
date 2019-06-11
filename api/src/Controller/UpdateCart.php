<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Category;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UpdateCart
{
    private const STATUS_ADD = 'add';
    private const STATUS_REMOVE = 'remove';

    private $manager;
    private $token;

    public function __construct(EntityManagerInterface $manager, TokenStorageInterface $token)
    {
        $this->manager = $manager;
        $this->token = $token;
    }


    public function __invoke(Request $request)
    {
        try {
            $content = \json_decode($request->getContent());
            $product = $content->name;
            $type = $content->type;
            $category = $content->category->name;
            $quantity = $content->quantity;
        } catch (\Exception $e) {
            throw new BadRequestHttpException($e);
        }

        $category = $this->manager->getRepository(Category::class)->findOneBy([
            'name' => $category,
        ]);

        if (!$category && !($category instanceof Category)) {
            throw new BadRequestHttpException();
        }

        $product = $this->manager->getRepository(Product::class)->findOneBy([
            'name' => $product,
            'category' => $category
        ]);

        if (!$product && !($product instanceof Product)) {
            throw new BadRequestHttpException();
        }

        $cart = $this->token->getToken()->getUser()->getCart();

        if (!$cart && !($cart instanceof Cart)) {
            throw new BadRequestHttpException();
        }

        $cartItem = $this->manager->getRepository(CartItem::class)->findOneBy([
            'cart' => $cart,
            'product' => $product
        ]);

        if ((!$cartItem || !($cartItem instanceof CartItem)) && self::STATUS_ADD === $type) {

            $cartItem = new CartItem();
            $cartItem
                ->setCart($cart)
                ->setProduct($product)
                ->setQuantity($quantity);
            $this->manager->persist($cartItem);

        } elseif ($cartItem instanceof CartItem) {

            if (self::STATUS_ADD === $type) {

                $cartItem->setQuantity($cartItem->getQuantity() + $quantity);

            } elseif(self::STATUS_REMOVE === $type) {

                if ($cartItem->getQuantity() <= $quantity) {

                    $this->manager->remove($cartItem);

                } else {

                    $cartItem->setQuantity($cartItem->getQuantity() - $quantity);

                }
            } else {
                throw new BadRequestHttpException();
            }
        }

        $this->manager->flush();

        return new JsonResponse();
    }
}
