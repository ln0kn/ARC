<?php

namespace App\Http\Controllers;
use App\Rappel;
use Illuminate\Http\Request;
use Auth;

class RappelController extends Controller
{
    public function getRappel(){
        $rappel = Rappel::orderBy('id','desc')->with('dossier')->where('alertUser',Auth::user() -> id) -> get();
        $tab = [];
        $k = 0 ;
        foreach($rappel as $val){
            if(substr($val['date'],4,11) == date('M d Y')){
                $tab[$k] = $val;
                $k++;
            }
        }
        return $tab;
    }
}
