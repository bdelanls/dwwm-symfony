<?php

namespace App\Repository;

use App\Entity\Lesson;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Lesson|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lesson|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lesson[]    findAll()
 * @method Lesson[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LessonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lesson::class);
    }




    public function findByMonth($debut, $fin)
    {
        return $this->createQueryBuilder('l')
            ->where('l.date >= :debut and l.date <= :fin')
            ->setParameter('debut', $debut)
            ->setParameter('fin', $fin)
            ->orderBy('l.date', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByDay($day)
    {
        return $this->createQueryBuilder('l')
            ->where('l.date like :day')
            ->setParameter('day', $day)
            ->orderBy('l.date', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByNextDay($day)
    {
        return $this->createQueryBuilder('l')
            ->where('l.date >= :day')
            ->andWhere('l.user is not null')
            ->setParameter('day', $day)
            ->orderBy('l.date', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByNextDayUser($day, $user)
    {
        return $this->createQueryBuilder('l')
            ->where('l.date >= :day')
            ->andWhere('l.user = :user')
            ->setParameter('day', $day)
            ->setParameter('user', $user)
            ->orderBy('l.date', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }



    // /**
    //  * @return Lesson[] Returns an array of Lesson objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Lesson
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
