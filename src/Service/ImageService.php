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

        $imageOrigin = $this->directoryOrigin . $image . '.jpg';

        $imageWide = $this->directoryWide . $image;
        $imageThumbnail = $this->directoryThumbnail . $image;

        // version jpg
        $imgWide
            ->make($imageOrigin )
            ->fit(800, 480)
            ->encode('jpg', 75)
            ->save($imageWide. '.jpg');

        $imgThumbnail
            ->make($imageOrigin)
            ->fit(365, 220)
            ->encode('jpg', 75)
            ->save($imageThumbnail. '.jpg'); 
            
        // version webp
        $imgWide
        ->make($imageOrigin)
        ->fit(800, 480)
        ->encode('webp', 75)
        ->save($imageWide . '.webp');

        $imgThumbnail
            ->make($imageOrigin)
            ->fit(365, 220)
            ->encode('webp', 75)
            ->save($imageThumbnail . '.webp');
            
        

    }

}
