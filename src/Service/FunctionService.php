<?php 
namespace App\Service;

use ReflectionClass;




class FunctionService
{

    
    /**
     * Method dismount
     * Transforme un objet en tableau
     */
    public function dismount($object) {
        $reflectionClass = new ReflectionClass(get_class($object));
        $array = array();
        foreach ($reflectionClass->getProperties() as $property) {
            $property->setAccessible(true);
            $array[$property->getName()] = $property->getValue($object);
            $property->setAccessible(false);
        }
        return $array;
    }


    


}