<?php

namespace App\Controller;

use DateTimeZone;
use App\Entity\File;
use App\Entity\User;
use App\Form\FilesType;
use App\Service\UploadService;
use App\Repository\FileRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('backstage/')]
class FileController extends AbstractController
{
    
    #[Route('file', name: 'file_index', methods: ['GET']), IsGranted('ROLE_TEACHER')]
    public function index(FileRepository $fileRepository): Response
    {
        return $this->render('file/index.html.twig', [
            'files' => $fileRepository->findAll(),
        ]);
    }

    #[Route('documents', name: 'file_index_student', methods: ['GET']), IsGranted('ROLE_STUDENT')]
    public function indexStudent(FileRepository $fileRepository): Response
    {
        $userId = $this->getUser()->getId();
        return $this->render('file/index_student.html.twig', [
            'files' => $fileRepository->findAllByUser($userId),
        ]);
    }


    #[Route('file/new', name: 'file_new', methods: ['GET','POST']), IsGranted('ROLE_TEACHER')]
    public function new(Request $request, UploadService $uploader): Response
    {
        $file = new File();
        $form = $this->createForm(FilesType::class, $file);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $time = new \DateTime('now', new DateTimeZone('Europe/Paris'));
            $file->setPublishedAt($time);

            $filePath = $form->get('path')->getData();
            if ($filePath) {
                $filename = $uploader->upload($filePath);
                $file->setPath($filename);

            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($file);
            $entityManager->flush();

            $this->addFlash('success', 'Le document a bien été envoyé');
            return $this->redirectToRoute('file_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('file/new.html.twig', [
            'file' => $file,
            'form' => $form,
        ]);
    }

    #[Route('file/{id}', name: 'file_show', methods: ['GET']), IsGranted('ROLE_TEACHER')]
    public function show(File $file): Response
    {
        return $this->render('file/show.html.twig', [
            'file' => $file,
        ]);
    }

    #[Route('file/{id}/edit', name: 'file_edit', methods: ['GET','POST']), IsGranted('ROLE_TEACHER')]
    public function edit(Request $request, File $file): Response
    {
        $form = $this->createForm(FilesType::class, $file);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('file_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('file/edit.html.twig', [
            'file' => $file,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'file_delete', methods: ['POST']), IsGranted('ROLE_TEACHER')]
    public function delete(Request $request, File $file): Response
    {
        if ($this->isCsrfTokenValid('delete'.$file->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($file);
            $entityManager->flush();
        }

        return $this->redirectToRoute('file_index', [], Response::HTTP_SEE_OTHER);
    }
}
