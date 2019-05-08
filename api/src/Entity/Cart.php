<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\IdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"cart_read"}}},
 *     itemOperations={
 *         "get",
 *         "put"
 *     },
 *     collectionOperations={
 *         "get"={"access_control"="is_granted('ROLE_ADMIN')", "normalization_context"={"groups"={"cart_read_list"}}},
 *         "post"
 *     }
 * )
 * @ORM\Entity
 */
class Cart
{
    use IdTrait;

    /**
     * @ORM\OneToMany(targetEntity=CartItem::class, mappedBy="cart")
     * @Groups({"user_read"})
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
