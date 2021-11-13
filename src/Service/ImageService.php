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


        $imageOrigin = $this->directoryOrigin . $image;

        $imageWide = $this->directoryWide . $image;
        $imageThumbnail = $this->directoryThumbnail . $image;

        $imgWide
            ->make($imageOrigin)
            ->fit(800, 480)
            ->save($imageWide);

        $imgThumbnail
            ->make($imageOrigin)
            ->fit(365, 220)
            ->save($imageThumbnail);    

    }

}
