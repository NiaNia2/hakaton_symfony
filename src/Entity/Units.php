<?php

namespace App\Entity;

use App\Repository\UnitsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UnitsRepository::class)]
class Units
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column]
    private ?int $vita = null;

    #[ORM\Column]
    private ?int $initiative = null;

    #[ORM\Column]
    private ?int $att = null;

    #[ORM\Column]
    private ?int $mana = null;

    /**
     * @var Collection<int, Teams>
     */
    #[ORM\OneToMany(targetEntity: Teams::class, mappedBy: 'unitOne')]
    private Collection $teamOne;

    /**
     * @var Collection<int, Teams>
     */
    #[ORM\OneToMany(targetEntity: Teams::class, mappedBy: 'unitTwo')]
    private Collection $teamTwo;

    /**
     * @var Collection<int, Teams>
     */
    #[ORM\OneToMany(targetEntity: Teams::class, mappedBy: 'unitThree')]
    private Collection $teamThree;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $color = null;

    public function __construct()
    {
        $this->teamOne = new ArrayCollection();
        $this->teamTwo = new ArrayCollection();
        $this->teamThree = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getVita(): ?int
    {
        return $this->vita;
    }

    public function setVita(int $vita): static
    {
        $this->vita = $vita;

        return $this;
    }

    public function getInitiative(): ?int
    {
        return $this->initiative;
    }

    public function setInitiative(int $initiative): static
    {
        $this->initiative = $initiative;

        return $this;
    }

    public function getAtt(): ?int
    {
        return $this->att;
    }

    public function setAtt(int $att): static
    {
        $this->att = $att;

        return $this;
    }

    public function getMana(): ?int
    {
        return $this->mana;
    }

    public function setMana(int $mana): static
    {
        $this->mana = $mana;

        return $this;
    }

    /**
     * @return Collection<int, Teams>
     */
    public function getTeamsOne(): Collection
    {
        return $this->teamOne;
    }

    public function addTeamOne(Teams $teamOne): static
    {
        if (!$this->teamOne->contains($teamOne)) {
            $this->teamOne->add($teamOne);
            $teamOne->setUnitOne($this);
        }

        return $this;
    }

    public function removeTeamOne(Teams $teamOne): static
    {
        if ($this->teamOne->removeElement($teamOne)) {
            // set the owning side to null (unless already changed)
            if ($teamOne->getUnitOne() === $this) {
                $teamOne->setUnitOne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Teams>
     */
    public function getTeamsTwo(): Collection
    {
        return $this->teamTwo;
    }

    public function addTeamTwo(Teams $teamTwo): static
    {
        if (!$this->teamTwo->contains($teamTwo)) {
            $this->teamTwo->add($teamTwo);
            $teamTwo->setUnitOne($this);
        }

        return $this;
    }

    public function removeTeamTwo(Teams $teamTwo): static
    {
        if ($this->teamTwo->removeElement($teamTwo)) {
            // set the owning side to null (unless already changed)
            if ($teamTwo->getUnitTwo() === $this) {
                $teamTwo->setUnitTwo(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Teams>
     */
    public function getTeamThree(): Collection
    {
        return $this->teamThree;
    }

    public function addTeamThree(Teams $teamThree): static
    {
        if (!$this->teamThree->contains($teamThree)) {
            $this->teamThree->add($teamThree);
            $teamThree->setUnitThree($this);
        }

        return $this;
    }

    public function removeTeamThree(Teams $teamThree): static
    {
        if ($this->teamThree->removeElement($teamThree)) {
            // set the owning side to null (unless already changed)
            if ($teamThree->getUnitThree() === $this) {
                $teamThree->setUnitThree(null);
            }
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }
}
