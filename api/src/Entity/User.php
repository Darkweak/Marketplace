<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\UserRepository;
use App\Traits\IdTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"category_read"}}},
 *     itemOperations={
 *         "get"={
 *             "access_control"="object == user"
 *         },
 *         "put"={
 *             "access_control"="object == user"
 *         },
 *         "delete"={
 *             "access_control"="object == user"
 *         }
 *     },
 *     collectionOperations={
 *         "get",
 *         "post"
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"name": "exact"})
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="users")
 */
class User implements UserInterface
{
    use IdTrait;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank
     */
    private $username;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     * @Assert\Email
     */
    private $email;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     */
    private $password;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $roles = [];

    /**
     * @ORM\OneToOne(targetEntity=Cart::class, cascade={"persist", "remove"})
     */
    private $cart;

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getRoles(): array
    {
        return array_merge($this->roles, ['ROLE_USER']);
    }

    public function setRoles(?array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function addRole(string $role): self
    {
        if (!\in_array($role, $this->roles)) {
            \array_push($this->roles, $role);
        }
        return $this;
    }

    public function removeRole(string $role): self
    {
        if (false !== $key = array_search($role, $this->roles)) {
            array_splice($this->roles, $key, 1);
        }
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

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
    }
}
