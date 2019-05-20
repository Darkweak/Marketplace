<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\ApplyResetPassword;
use App\Controller\ChangePasswordCurrentUser;
use App\Controller\RequestResetPassword;
use App\Controller\RetrieveCurrentUser;
use App\Repository\UserRepository;
use App\Traits\IdTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={"normalization_context"={"groups"={"user_read"}}, "access_control"="is_granted('ROLE_USER')"},
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
 *         "get"={"access_control"="is_granted('ROLE_ADMIN')"},
 *         "post"={"access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
 *         "get_current_user"={
 *             "method"="GET",
 *             "path"="/me",
 *             "controller"=RetrieveCurrentUser::class
 *         },
 *         "change_current_user_password"={
 *             "method"="POST",
 *             "path"="/change-password",
 *             "controller"=ChangePasswordCurrentUser::class
 *         },
 *         "request_reset_user_password"={
 *             "method"="POST",
 *             "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *             "path"="/reset-password/request",
 *             "controller"=RequestResetPassword::class
 *         },
 *         "apply_reset_user_password"={
 *             "method"="POST",
 *             "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *             "path"="/reset-password/apply",
 *             "controller"=ApplyResetPassword::class
 *         }
 *     }
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="users")
 */
class User implements UserInterface
{
    use IdTrait;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank
     * @Groups({"user_read"})
     */
    private $username;

    /**
     * @ORM\Column(unique=true)
     * @Assert\NotBlank
     * @Assert\Email
     * @Groups({"user_read"})
     */
    private $email;

    /**
     * @ORM\Column
     * @Assert\NotBlank
     */
    private $password;

    /**
     * @ORM\Column(nullable=true)
     */
    private $token;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $roles = [];

    /**
     * @ORM\OneToOne(targetEntity=Cart::class, cascade={"persist", "remove"})
     * @Groups({"user_read"})
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

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;
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
