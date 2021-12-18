<?php

namespace App\Entity;

use App\Entity\User;
use App\Repository\LessonRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LessonRepository::class)
 */
class Lesson
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="smallint")
     */
    private $hour;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $booked_on;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $valid;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="lessons")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHour(): ?int
    {
        return $this->hour;
    }

    public function setHour(int $hour): self
    {
        $this->hour = $hour;

        return $this;
    }

    public function getBookedOn(): ?\DateTimeInterface
    {
        return $this->booked_on;
    }

    public function setBookedOn(?\DateTimeInterface $booked_on): self
    {
        $this->booked_on = $booked_on;

        return $this;
    }

    public function getValid(): ?bool
    {
        return $this->valid;
    }

    public function setValid(?bool $valid): self
    {
        $this->valid = $valid;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }
}
