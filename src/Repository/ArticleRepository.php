<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }



    public function findAllFront($visible, $nbResult = 100)
    {
        return $this->createQueryBuilder('a')
            ->where('a.is_active = :vis')
            ->orderBy('a.promote DESC, a.published_at',  'DESC')
            ->setMaxResults($nbResult)
            ->setParameter('vis', $visible)
            ->getQuery()
            ->getResult()
        ;
    }

    
    /**
     * Method getPaginateArticles
     * Returns all articles per page
     */
    public function getPaginateArticles($page, $limit)
    {
        return $this->createQueryBuilder('a')
            ->where('a.is_active = 1')
            ->orderBy('a.promote DESC, a.published_at',  'DESC')
            ->setFirstResult(($page * $limit) - $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getTotalArticles()
    {
        return $this->createQueryBuilder('a')
            ->select('COUNT(a)')
            ->where('a.is_active = 1')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }


    // /**
    //  * @return Article[] Returns an array of Article objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Article
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
