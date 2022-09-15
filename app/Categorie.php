<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    
    public function setDesignationAttribute($value)
    {
        $this->attributes['designation'] = strtolower($value);
    }
    
    public function groupe(){
        return $this->belongsToMany(Groupe::class,'category_groupes');
    }
    
    public function dossier(){
        return $this->hasMany(Dossier::class);
    }
    
}
