<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\IdTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"category_read"}}},
 *     itemOperations={
 *         "get",
 *         "put",
 *         "delete"
 *     },
 *     collectionOperations={
 *         "get"={"normalization_context"={"groups"={"category_read_list"}}},
 *         "post"
 *     }
 * )
 * @ORM\Entity
 */
class CartItem
{
    use IdTrait;

    /**
     * @ORM\ManyToOne(targetEntity=Cart::class, inversedBy="cartItems")
     */
    private $cart;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="cartItems")
     */
    private $product;

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
