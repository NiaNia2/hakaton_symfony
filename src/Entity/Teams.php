<?php

namespace App\Entity;

use App\Repository\TeamsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamsRepository::class)]
class Teams
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'teams', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'teamOne')]
    private ?Units $unitOne = null;

    #[ORM\ManyToOne(inversedBy: 'teamTwo')]
    private ?Units $unitTwo = null;

    #[ORM\ManyToOne(inversedBy: 'teamThree')]
    private ?Units $unitThree = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getUnitOne(): ?Units
    {
        return $this->unitOne;
    }

    public function setUnitOne(?Units $unitOne): static
    {
        $this->unitOne = $unitOne;

        return $this;
    }

    public function getUnitTwo(): ?Units
    {
        return $this->unitTwo;
    }

    public function setUnitTwo(?Units $unitTwo): static
    {
        $this->unitTwo = $unitTwo;

        return $this;
    }

    public function getUnitThree(): ?Units
    {
        return $this->unitThree;
    }

    public function setUnitThree(?Units $unitThree): static
    {
        $this->unitThree = $unitThree;

        return $this;
    }
}
