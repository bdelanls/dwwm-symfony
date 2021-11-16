<?php

namespace App\Controller;

use DateTimeZone;
use App\Entity\Article;
use App\Form\ArticleType;
use App\Form\ArticleEditType;
use App\Service\ImageService;
use App\Service\UploadImageService;
use App\Repository\ArticleRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/')]
class ArticleController extends AbstractController
{
    #[Route('backstage/article', name: 'article_index', methods: ['GET']), IsGranted('ROLE_TEACHER')]
    public function index(ArticleRepository $articleRepository): Response
    {
        return $this->render('article/index.html.twig', [
            'articles' => $articleRepository->findAll(),
        ]);
    }

    #[Route('articles', name: 'articles_front', methods: ['GET'])]
    public function index_articles(ArticleRepository $articleRepository): Response
    {
        return $this->render('article/index_articles.html.twig', [
            'articles' => $articleRepository->findAllFront(true, 100),
        ]);
    }



    #[Route('backstage/article/new', name: 'article_new', methods: ['GET','POST']), IsGranted('ROLE_TEACHER')]
    public function new(Request $request, UploadImageService $uploaderImage, ImageService $imageService): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
            $article->setPublishedAt($time);
            $article->setUpdateAt($time);

            $user = $this->getUser();
            $article->setUser($user);

            // slug automatique

            $photoPath = $form->get('photo_path')->getData();
            
            if ($photoPath) {
                $filename = $uploaderImage->upload($photoPath);
                $article->setPhotoPath($filename);

                $imageService->resize($filename);

            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($article);
            $entityManager->flush();

            $this->addFlash('success', 'L\'article a bien été enregistré');
            return $this->redirectToRoute('article_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('article/new.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    // #[Route('article/{slug}', name: 'article_show', methods: ['GET'])]
    // public function show(Article $article): Response
    // {
    //     return $this->render('article/show.html.twig', [
    //         'article' => $article,
    //     ]);
    // }
    
    /**
     *  Article
     */
    #[Route('article/{slug}', name: 'article_show', methods: ['GET'])]
    public function show(string $slug, ArticleRepository $articleRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $donnees = $articleRepository->findAllFront(true, 100);

        for ($i=0; $i < count($donnees); $i++) {
            $donnee = $donnees[$i];
            if ($donnee->getSlug() == $slug) {
                $page = $i+1;
            }
        }
        

        $articles = $paginator->paginate(
            $donnees,
            $request->query->getInt('page', $page),
            1
        );



        return $this->render('article/show.html.twig', [
            'articles' => $articles,
        ]);
    }



    #[Route('backstage/article/{id}/edit', name: 'article_edit', methods: ['GET','POST'])]
    public function edit(Request $request, Article $article, UploadImageService $uploaderImage, ImageService $imageService): Response
    {
        $form = $this->createForm(ArticleEditType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
            $article->setUpdateAt($time);

            $photoPath = $form->get('photo_path')->getData();

            if ($photoPath) {
                $filename = $uploaderImage->upload($photoPath);
                $article->setPhotoPath($filename);

                $imageService->resize($filename);
            }


            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', 'L\'article a été mis à jour');
            return $this->redirectToRoute('article_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('article/edit.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    #[Route('backstage/article/{id}', name: 'article_delete', methods: ['POST'])]
    public function delete(Request $request, Article $article): Response
    {
        if ($this->isCsrfTokenValid('delete'.$article->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($article);
            $entityManager->flush();
        }

        return $this->redirectToRoute('article_index', [], Response::HTTP_SEE_OTHER);
    }
}
