<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dossier extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    
    public function pieces(){
        return $this->hasMany(Piece::class);
    }
    public function rappel (){
        return $this->hasOne(Rappel::class);
    }
    public function categorie (){
        return $this->belongsTo(Categorie::class);
    }
    
    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = strtolower($value);
    }
}
