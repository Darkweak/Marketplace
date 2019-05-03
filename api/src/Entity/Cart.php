<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\IdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"category_read"}}},
 *     itemOperations={
 *         "get",
 *         "put"
 *     },
 *     collectionOperations={
 *         "get"={"normalization_context"={"groups"={"category_read_list"}}},
 *         "post"
 *     }
 * )
 * @ORM\Entity
 */
class Cart
{
    use IdTrait;

    /**
     * @ORM\OneToMany(targetEntity=Cart::class, mappedBy="cart")
     */
    private $cartItems;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }

    public function getCartItems(): Collection
    {
        return $this->cartItems;
    }

    public function setCartItems(Collection $cartItems): self
    {
        $this->cartItems = $cartItems;
        return $this;
    }

    public function addCartItem(CartItem $cartItem): self
    {
        if (!$this->cartItems->contains($cartItem)){
            $this->cartItems->add($cartItem);
        }
        return $this;
    }

    public function removeCartItem(CartItem $cartItem): self
    {
        $this->cartItems->removeElement($cartItem);
        return $this;
    }
}
