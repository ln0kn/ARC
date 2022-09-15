<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rappel extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    
    public function dossier (){
        return $this->belongsTo(Dossier::class);
    }
}
