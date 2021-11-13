<?php

namespace App\Form;

use App\Entity\Article;
use Symfony\Component\Form\AbstractType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ArticleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => "Titre de l'article :",
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => "ce champs ne doit pas être vide",
                    ]),
                ],
            ])
            ->add('body', CKEditorType::class, [
                'label' => "Corps de l'article :",
                'required' => false,
                'attr' => [
                    'rows' => 5,
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => "ce champs ne doit pas être vide",
                    ]),
                ],
            ])
            // ->add('published_at')
            // ->add('update_at')
            ->add('is_active', CheckboxType::class, [
                'label' => "Visible",
                'required' => false,
            ])
            ->add('photo_path', FileType::class, [
                'mapped' => false,
                'label' => "Photo :",
                'required' => false,
                'multiple' => false,
                'constraints' => [
                    new File([
                        'maxSize' => "10240K",
                        'mimeTypes' => ['image/jpg', 'image/jpeg'],
                        'mimeTypesMessage' => "Uploader une image au format JPG.",
                    ])
                ],
            ])
            ->add('photo_title', TextType::class, [
                'label' => "Titre de la photo :",
                'required' => false,
            ])
            ->add('meta', TextareaType::class, [
                'label' => "Meta description :",
                'required' => false,
                'attr' => [
                    'rows' => 5,
                    'placeholder' => "La limite maximale recommandée est de 160 caractères."
                ],
            ])
            ->add('meta_title', TextType::class, [
                'label' => "Meta titre :",
                'required' => false,
                'attr' => [
                    'placeholder' => "La limite maximale recommandée est de 60 caractères."
                ],
            ])
            // ->add('slug', TextType::class, [
            //     'label' => "Slug :",
            //     'required' => false,
            //     'constraints' => [
            //         new NotBlank([
            //             'message' => "ce champs ne doit pas être vide",
            //         ]),
            //     ],
            // ])
            // ->add('user')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}
