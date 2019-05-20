<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\IdTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"category_read"}}},
 *     itemOperations={
 *         "get"={"access_control"="is_granted('ROLE_ADMIN')"}
 *     },
 *     collectionOperations={
 *         "get"={"access_control"="is_granted('ROLE_ADMIN')"}
 *     }
 * )
 * @ORM\Entity
 */
class CartItem
{
    use IdTrait;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"user_read"})
     */
    private $quantity;

    /**
     * @ORM\ManyToOne(targetEntity=Cart::class, inversedBy="cartItems")
     */
    private $cart;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="cartItems")
     * @Groups({"user_read"})
     */
    private $product;

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getCart(): Cart
    {
        return $this->cart;
    }

    public function setCart(Cart $cart): self
    {
        $this->cart = $cart;
        return $this;
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): self
    {
        $this->product = $product;
        return $this;
    }
}
