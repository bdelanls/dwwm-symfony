<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\File as FileObject;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class FilesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => "Titre :",
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => "ce champs ne doit pas être vide",
                    ]),
                ],
            ])
            ->add('path', FileType::class, [
                'mapped' => false,
                'label' => "Document :",
                'required' => false,
                'multiple' => false,
                'constraints' => [
                    new File([
                        'maxSize' => "2048K",
                        'mimeTypes' => ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
                        'mimeTypesMessage' => "Uploader un document valide, PNG, JPG ou PDF.",
                    ])
                ],
            ])
            ->add('description', TextareaType::class, [
                'label' => "Description :",
                'required' => false,
                'attr' => [
                    'rows' => 5,
                ],
            ])
             ->add('user', EntityType::class, [
                'label' => "Partager le document avec :",
                'placeholder' => "-- choissez un utilisateur --",
                'class' => User::class,
                'choice_label' => "firstname",
                "required" => true,
                'expanded' => true,
                'multiple' => true,
             ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FileObject::class,
        ]);
    }
}
