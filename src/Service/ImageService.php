<?php 
namespace App\Service;

use Intervention\Image\ImageManager;


class ImageService
{
    private $directoryOrigin;
    private $directoryWide;
    private $directoryThumbnail;

    public function __construct()
    {
        $this->directoryOrigin = "img/article/origin/";
        $this->directoryWide = "img/article/wide/";
        $this->directoryThumbnail = "img/article/thumbnail/";
    }

    
    public function resize($image){

        $imgWide = new ImageManager();
        $imgThumbnail = new ImageManager();

        // le nom de l'image sans l'extension
        $image = substr($image, 0, strpos($image, '.'));


        $imageOrigin = $this->directoryOrigin . $image . '.jpg';

        $imageWide = $this->directoryWide . $image . '.webp';
        $imageThumbnail = $this->directoryThumbnail . $image . '.webp';

        $imgWide
            ->make($imageOrigin)
            ->fit(800, 480)
            ->encode('webp', 80)
            ->save($imageWide);

        $imgThumbnail
            ->make($imageOrigin)
            ->fit(365, 220)
            ->encode('webp', 80)
            ->save($imageThumbnail);    

    }

}
