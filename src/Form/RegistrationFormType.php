<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => "Prénom :",
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => "Ce champs ne doit pas être vide",
                    ]),
                ]
            ])
            ->add('lastname', TextType::class, [
                'label' => "Nom :",
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => "Ce champs ne doit pas être vide",
                    ]),
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => "Email :",
                'required' => true,
                // 'attr' => [
                //     'placeholder' => "Entrez votre adresse mail",
                // ],
                'constraints' => [
                    new NotBlank([
                        'message' => "Ce champs ne doit pas être vide",
                    ]),
                    new Email([
                        'message' => "L'adresse mail doit être valide",
                    ]),
                ],
            ])
            ->add('phone', TextType::class, [
                'label' => "Téléphone :",
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => "Ce champs ne doit pas être vide",
                    ]),
                ],
            ])
            ->add('agreeTerms', CheckboxType::class, [
                // 'mapped' => false,
                'required' => true,
                'label' => "J'accepte la politique de confidentialité.",
                'constraints' => [
                    new IsTrue([
                        'message' => 'Vous devez accepter la politique de confidentialité.',
                    ]),
                ],
            ])
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'label' => "Mot de passe :",
                'attr' => ['autocomplete' => 'new-password'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Entrez un mot de passe',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Le mot de passe doit contenir plus de {{ limit }} caractères',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])

            ->add('birthday', DateType::class , [
                'label' => "Anniversaire :",
                'required' => false,
                'widget' => 'single_text',
            ])

            ->add('level', ChoiceType::class, [
                'choices' => [
                    'Votre choix' => "",
                    'Débutant' => 'beginner',
                    'Intermédiaire' => 'intermediate',
                    'Avancé' => 'advanced'
                ],
                'expanded' => false,
                'multiple' => false,
                'label' => "Niveau de compétence :",
                'required' => false,
            ])

            ->add('years_playing', ChoiceType::class, [
                'choices' => [
                    'Votre choix' => "",
                    '0 à 1 an' => '0-1',
                    '2 à 5 ans' => '2-5',
                    '6 à 10 ans' => '6-10',
                    '11 à 20 ans' => '11-20',
                    'Plus de 20 ans' => '+20'
                ],
                'expanded' => false,
                'multiple' => false,
                'label' => "Nombre d'années à jouer :",
                'required' => false,
            ])

            ->add('other_instrument', TextType::class, [
                'label' => "Autre instrument pratiqué :",
                'required' => false,
            ])

            ->add('comment', TextareaType::class, [
                'label' => "Commentaire :",
                'required' => false,
                'attr' => [
                    'rows' => 5,
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
