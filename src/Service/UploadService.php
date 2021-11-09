<?php 

namespace App\Service;

use Symfony\Component\String\Slugger\SluggerInterface;

class UploadService
{
    private $slugger;
    private $imagedirectory;

    public function __construct(SluggerInterface $slugger)
    {
        $this->slugger = $slugger;
        $this->imagedirectory = "img/documents/";
    }

    public function upload($newFile, string $oldPath = ""): string
    {
        $originalFilename = pathinfo($newFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $finalFilename = "$safeFilename-" . uniqid() . "." . $newFile->guessExtension();
        $newFile->move($this->imagedirectory, $finalFilename);
        $this->delete($oldPath);
        
        return $finalFilename;
    }

    public function delete(string $oldPath): void
    {
        if($oldPath){
            unlink($this->imagedirectory . $oldPath);
        }
    }

}
