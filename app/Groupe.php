<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    public function setDesignationAttribute($value)
    {
        $this->attributes['designation'] = strtolower($value);
    }
    
//    if ($user->can('getGroupe', $grooupe)) {
//    public function permission(){
//    return $this->hasMany(Permission::class);
//    }
//    }
    public function permission(){
        return $this->hasMany(Permission::class);
    }
    public function categorie(){
        return $this->belongsToMany(Categorie::class,'category_groupes');
    }
}
