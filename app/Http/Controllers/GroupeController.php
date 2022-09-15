<?php

namespace App\Http\Controllers;
use App\Groupe;
use App\Permission;
use Illuminate\Http\Request;
use Validator;
use Auth;
class GroupeController extends Controller
{
//    public function __construct()
//    {
//        $this->authorizeResource(Group::class, 'groupe');
////        $this->authorizeResource(Post::class, 'post');
//    }
//    
    public function addGroupe(Request $request){
        // get current logged in user
        $user = Auth::user();
        
      //        $this->authorize('addGroupe', Groupe::class);
        if ($user->can('addGroupe', Groupe::class)) {
            $valide = Validator::make($request->all(), [
              'groupe.designation' => 'required|unique:groupes,designation',
              'permissions.*' => 'required',
            ]);
            if ($valide->fails()) {
              return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
              ]);
            }

            $groupe  = new Groupe ();
            $groupe -> designation = $request['groupe']['designation'];
            $groupe -> save();

            foreach($request['permissions'] as $page => $value){
                foreach($value as $droit => $item){
                    $groupeD = new Permission ();
                    $groupeD -> page      = $page;
                    $groupeD -> statut    = ($item)? $item : false ;
                    $groupeD -> groupe_id = $groupe -> id;
                    $groupeD -> droit  = $droit;
                    $groupeD -> save ();
                }
            }

            $groupe -> permission ;
            return $groupe;
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    
    public function editGroupe(Request $request){
        // get current logged in user
        $user = Auth::user();
        
      //        $this->authorize('addGroupe', Groupe::class);
        if ($user->can('editGroupe', Groupe::class)) {
            // dd(' ');
            $valide = Validator::make($request->all(), [
              'groupe.id' => 'required|integer',
              'groupe.designation' => 'required|unique:groupes,designation,'.$request['groupe']['id'].',id',
              'permissions.*' => 'required',
            ]);
            if ($valide->fails()) {
              return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
              ]);
            }

            $groupe  = Groupe ::find ($request['groupe']['id']);
            $groupe -> designation = $request['groupe']['designation'];
            $groupe -> save();

            $groupe -> permission() -> delete() ;

            foreach($request['permissions'] as $page => $value){
                foreach($value as $droit => $item){
                    $groupeD = new Permission ();
                    $groupeD -> page      = $page;
                    $groupeD -> statut    = $item ;
                    $groupeD -> groupe_id = $groupe -> id;
                    $groupeD -> droit  = $droit;
                    $groupeD -> save ();
                }
            }
            $groupe -> permission ;
            return $groupe;
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    
    public function deleteGroupe(Request $request){
        $user = Auth::user();
        
        if ($user->can('deleteGroupe', Groupe::class)) {
            //die($user);
            $valide = Validator::make($request->all(), [
              'id' => 'required|integer',
            ]);
            if ($valide->fails()) {
              return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
              ]);
            }

            $groupe  = Groupe ::find ($request['id']);
            $groupe -> permission() -> delete() ;
            $groupe -> delete();

            return $groupe;
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    
    public function getGroupe(Request $request ,  Groupe $groupe){
        $this->authorize('getGroupe', $groupe);
        return Groupe::orderBy('id','desc') -> with('permission')->get();
    }
}
