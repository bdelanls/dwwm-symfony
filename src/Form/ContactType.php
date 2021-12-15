<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('firstname', TextType::class, [
            'label' => "Prénom* :",
            'required' => true,
            'constraints' => [
                new NotBlank([
                    'message' => "ce champs ne doit pas être vide",
                ]),
            ],
        ])
        ->add('lastname', TextType::class, [
            'label' => "Nom* :",
            'required' => true,
            'constraints' => [
                new NotBlank([
                    'message' => "ce champs ne doit pas être vide",
                ]),
            ],
        ])
        ->add('email', EmailType::class, [
            'label' => "Email* :",
            'required' => true,
            'constraints' => [
                new NotBlank([
                    'message' => "ce champs ne doit pas être vide",
                ]),
                new Email([
                    'message' => "L'adresse de courriel doit être valide",
                ]),
            ],
        ])
        ->add('message', TextareaType::class, [
            'label' => "Votre message* :",
            'required' => true,
            'attr' => [
                'rows' => 5,
            ],
            'constraints' => [
                new NotBlank([
                    'message' => "le message ne doit pas être vide",
                ]),
                new Length([
                    'min' => 10,
                    'minMessage' => "le message doit contenir au minimum {{ limit }} caractères",
                    'max' => 1000,
                    'maxMessage' => "le message ne doit pas excéder {{ limit }} caractères",
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
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
