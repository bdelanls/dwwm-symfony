<?php

namespace App\Form;

use App\Entity\Lesson;
use App\Entity\LessonDay;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class LessonDayType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        // ->add('date', DateType::class, [
        //     'label' => "Date",
        //     'widget' => "single_text",
        // ])
        ->add('h8', CheckboxType::class, [
            'label' => "8 h",
            'required' => false,
        ])
        ->add('h9', CheckboxType::class, [
            'label' => "9 h",
            'required' => false,
        ])
        ->add('h10', CheckboxType::class, [
            'label' => "10 h",
            'required' => false,
        ])
        ->add('h11', CheckboxType::class, [
            'label' => "11 h",
            'required' => false,
        ])
        ->add('h12', CheckboxType::class, [
            'label' => "12 h",
            'required' => false,
        ])
        ->add('h13', CheckboxType::class, [
            'label' => "13 h",
            'required' => false,
        ])
        ->add('h14', CheckboxType::class, [
            'label' => "14 h",
            'required' => false,
        ])
        ->add('h15', CheckboxType::class, [
            'label' => "15 h",
            'required' => false,
        ])
        ->add('h16', CheckboxType::class, [
            'label' => "16 h",
            'required' => false,
        ])
        ->add('h17', CheckboxType::class, [
            'label' => "17 h",
            'required' => false,
        ])
        ->add('h18', CheckboxType::class, [
            'label' => "18 h",
            'required' => false,
        ])
        ->add('h19', CheckboxType::class, [
            'label' => "19 h",
            'required' => false,
        ])
        ->add('h20', CheckboxType::class, [
            'label' => "20 h",
            'required' => false,
        ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => LessonDay::class,
        ]);
    }
}
