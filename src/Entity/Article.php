<?php

namespace App\Entity;

use App\Entity\User;
use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @ORM\Column(type="datetime")
     */
    private $published_at;

    /**
     * @ORM\Column(type="datetime")
     */
    private $update_at;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $is_active;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo_path;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo_title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $meta;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="articles")
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $meta_title;

    /**
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(unique=true, length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $promote;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->published_at;
    }

    public function setPublishedAt(\DateTimeInterface $published_at): self
    {
        $this->published_at = $published_at;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->update_at;
    }

    public function setUpdateAt(\DateTimeInterface $update_at): self
    {
        $this->update_at = $update_at;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(?bool $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }

    public function getPhotoPath(): ?string
    {
        return $this->photo_path;
    }

    public function setPhotoPath(?string $photo_path): self
    {
        $this->photo_path = $photo_path;

        return $this;
    }

    public function getPhotoTitle(): ?string
    {
        return $this->photo_title;
    }

    public function setPhotoTitle(?string $photo_title): self
    {
        $this->photo_title = $photo_title;

        return $this;
    }

    public function getMeta(): ?string
    {
        return $this->meta;
    }

    public function setMeta(?string $meta): self
    {
        $this->meta = $meta;

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

    public function getMetaTitle(): ?string
    {
        return $this->meta_title;
    }

    public function setMetaTitle(?string $meta_title): self
    {
        $this->meta_title = $meta_title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getPromote(): ?bool
    {
        return $this->promote;
    }

    public function setPromote(?bool $promote): self
    {
        $this->promote = $promote;

        return $this;
    }
}
