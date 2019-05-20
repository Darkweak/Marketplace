<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Traits\IdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"product_read_list"}},
 *         "pagination_enabled"=false,
 *         "order"={"id": "DESC"}
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"access_control"="is_granted('ROLE_ADMIN')"}
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"name": "partial", "category.name":"exact"})
 * @ApiFilter(BooleanFilter::class, properties={"promotion"})
 * @ORM\Entity
 */
class Product
{
    use IdTrait;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Groups({"product_read_list", "category_read", "user_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank
     * @Groups({"product_read_list", "category_read", "user_read"})
     */
    private $price;

    /**
     * @ORM\Column(type="boolean", options={"default"=false})
     * @Groups({"product_read_list", "category_read", "user_read"})
     */
    private $promotion = false;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"product_read_list", "category_read", "user_read"})
     */
    private $pricePromotion;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     * @Groups({"product_read_list", "category_read", "user_read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @Groups({"product_read_list", "user_read"})
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Image::class, inversedBy="products")
     * @Groups({"product_read_list", "user_read"})
     */
    private $image;

    /**
     * @ORM\OneToMany(targetEntity=CartItem::class, mappedBy="product")
     */
    private $cartItems;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function isPromotion(): bool
    {
        return $this->promotion;
    }

    public function setPromotion(bool $promotion): self
    {
        $this->promotion = $promotion;
        return $this;
    }

    public function getPricePromotion(): ?float
    {
        return $this->pricePromotion;
    }

    public function setPricePromotion(?float $pricePromotion): self
    {
        $this->pricePromotion = $pricePromotion;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function setCategory(Category $category): self
    {
        $this->category = $category;
        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): self
    {
        $this->image = $image;
        return $this;
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
