<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
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
 *         "normalization_context"={"groups"={"category_read"}},
 *         "pagination_enabled"=false
 *     },
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
 * @ApiFilter(SearchFilter::class, properties={"name": "exact"})
 * @ORM\Entity
 */
class Category
{
    use IdTrait;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank
     * @Groups({"category_read", "category_read_list", "product_read_list", "user_read"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="category")
     * @Groups({"category_read"})
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
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

    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function setProducts(Collection $products): self
    {
        $this->products = $products;
        return $this;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
        }
        return $this;
    }

    public function removeProduct(Product $product): self
    {
        $this->products->removeElement($product);
        return $this;
    }
}
