<?php

namespace App\Http\Controllers;

use App\Categorie;
use App\CategoryGroupe;
use Illuminate\Http\Request;
use Validator ;

class CategorieController extends Controller
{
    
    public function addCategory(Request $request){
        $valide = Validator::make($request->all(), [
          'category.designation' => 'required|min:5|unique:categories,designation',
          'category.accessiblite.*.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        
        $groupe  = new Categorie ();
        $groupe -> designation = $request['category']['designation'];
        $groupe -> save();
        
        foreach($request['category']['accessibilite'] as $value){
            $catGroupe = new CategoryGroupe ();
            $catGroupe -> groupe_id = $value['id'];
            $catGroupe -> categorie_id  = $groupe -> id;
            $catGroupe -> save ();
        }
        $groupe -> groupe;
        
        return $groupe ;
    }
    
    
    public function editCategory(Request $request){
        $valide = Validator::make($request->all(), [
          'category.designation' => 'required|min:5|unique:categories,designation,'.$request['category']['id'].',id',
          'category.accessiblite.*.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        
        $groupe  = Categorie ::find($request['category']['id']);
        $groupe -> designation = $request['category']['designation'];
        $groupe -> save();
        $groupe -> groupe() -> detach();
        
        foreach($request['category']['accessibilite'] as $value){
            $catGroupe = new CategoryGroupe ();
            $catGroupe -> groupe_id = $value['id'];
            $catGroupe -> categorie_id  = $groupe -> id;
            $catGroupe -> save ();
        }
        $groupe -> groupe;
        
        return $groupe ;
    }
    
    
    public function deleteCategorie(Request $request){
        $valide = Validator::make($request->all(), [
          'id' => 'required|integer',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        
        $groupe  = Categorie ::find($request['id']);
        $groupe -> groupe() -> detach();
        $groupe -> delete ();
        
        return $groupe ;
    }
    
    public function getCategorie(){
        return Categorie::orderBy('id','desc') -> with('groupe')-> get ();
    }
   
}
