<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Dossier;
use App\Host;
use App\Piece;
use App\Rappel;
use Validator;
use File;
use Auth;
//use Storage;
use Illuminate\Support\Facades\Storage;
class DossierController extends Controller
{
    
    public function addDossier (Request $request){
        $valide = Validator::make($request->all(), [
            'designation' => 'required|min:5|unique:dossiers,nom',
            'files' => 'required',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        //identifiant dU Dossier
        $timestamp = strtotime(now());
        $day = date('d', $timestamp);
        $month = date('m', $timestamp);
        $year = date('y', $timestamp);
        $results = Dossier::latest('id')->first();
        $results = 'Fld-'.$day.'-'.$month.'-'.$year.'_n°'.(($results)?$results['id']+1:1);
        if($request['files']){
            $dossier = new Dossier ();
            $dossier -> nom = $request['designation'];
            $dossier -> numeroDossier = $results;
            $dossier -> categorie_id = $request['categorie'];
            $dossier -> createdBy  = Auth::user()->id;
            $dossier -> save ();
            foreach($request['files'] as $val){
                $file_name = $val->getClientOriginalName();
                $fic = new Piece ();
                $fic -> sizePiece = $val->getSize();
                $fic -> nomPiece = $file_name;
                $fic -> dossier_id = $dossier -> id;
                $fic -> addBy = Auth::user()->id;
                $fic -> save() ;
                $paths[]   = $val ->storeAs('Pieces/'.$results, $file_name);
            }
            
            if($request['dateRappel'] || $request['motifRappel'] ){
                if(strlen($request['dateRappel'])> 2 && strlen($request['motifRappel']) > 2 ){
                    $rappel = new Rappel();
                    $rappel -> motif = $request['motifRappel'] ;
                    $rappel -> date = $request['dateRappel'];
                    $rappel -> dossier_id = $dossier -> id;
                    $rappel -> alertUser = Auth::user()->id;
                    $rappel -> save() ;
                }
            }
        }
        else{
            return response()->json(['fail' =>true,'errors' =>[['Impossible de creer un dossier vide ']]]);
        }
    }
    
    public function editDossier (Request $request){
        $valide = Validator::make($request->all(), [
            'id' => 'required|integer',
            'motifRappel' => 'nullable|min:5',
            //'dateRappel' => 'nullable|min:5', la date doit etre superrieur a la date du jour
            'designation' => 'required|min:5|unique:dossiers,nom,'.$request['id'].',id',

        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }



        $jointes = Dossier::find($request['id']);
        $dossier = $jointes['numeroDossier'];
        $ident = $jointes['id'];
        $jointes -> nom = $request['designation'];
        $jointes -> categorie_id = $request['categorie'];
        //$jointes -> save ();
        if(strlen($request['dateRappel'])> 2 && strlen($request['motifRappel']) > 2){
                if($jointes -> rappel)
                   $jointes -> rappel() -> delete ();
                
                    $rappel = new Rappel();
                    $rappel -> motif = $request['motifRappel'] ;
                    $rappel -> date = $request['dateRappel'];
                    $rappel -> dossier_id = $request['id'];
                    $rappel -> alertUser = Auth::user()->id;
                    $rappel -> save() ;
            }
        $jointes -> pieces;
        if($request['files'] || $request['pieces'] ){
            var_dump('1');
            if($request['pieces']){
                foreach($jointes['pieces'] as $piece){
                    var_dump('2');
                    if(in_array($piece['nomPiece'],$request['pieces'])){
                        
                    }else{//permet de upprimer les pieces de la base de donnee  quand l user les supprime dans l interface
                        $pst = Piece::find($piece['id']);
                        $nP = $pst['nomPiece'];
                        $pst -> delete();
                        Storage::delete('Pieces/'.$dossier.'/'.$nP);
                    }
                }
            }
            //ajouter de nouvelles pieces jointes
            if($request['files']){
                foreach($request['files'] as $val){
                    $file_name = $val->getClientOriginalName();
                    $fic = new Piece ();
                    $fic -> sizePiece = $val->getSize();
                    $fic -> nomPiece = $file_name;
                    $fic -> dossier_id = $ident;
                    $fic -> addBy = Auth::user()->id;
                    $fic -> save() ;
                    $paths[]   = $val ->storeAs('Pieces/'.$dossier.'/', $file_name);
                }
            }
            
        }
        else{
            return response()->json(['fail' =>true,'errors' =>[['Impossible de creer un dossier vide ']]]);
        }
        
    }
    
    public function getDossier(){
        $i = 0;
        $cate = Auth::user()->groupe->categorie;
        $tab = [];
        foreach ($cate as $key => $value) {
            //$value -> pieces;
            foreach ($value-> dossier as $k => $val ) {
                $val -> pieces;
                $val -> rappel;
                $val -> categorie;
                $tab[$i]= $val;
                $i++;
            }
        }
        return $tab;
        return Dossier::with('pieces')->get();
        
    }
    
    public function displayDossier(){
        $dossier = Piece::where('nomPiece',$_GET['id'])->get();
        $doc = Dossier::find($dossier[0]['dossier_id']);
        $host = Host::where('user_id',$doc['createdBy'])->get();
        
        // dd(base_path());
        // dd($host);
        $file = base_path().'/storage/app/Pieces/'.$doc['numeroDossier'].'/'.$_GET['id'];
        return response(file_get_contents($file),200) ->header('Content-Type',Storage::mimeType('Pieces/'.$doc['numeroDossier'].'/'.$_GET['id']));
    }
    
    public function deleteDossier(Request $request){
        $valide = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        $dossier =  Dossier::find($request['id']);
        $dossier -> deletedBy = Auth::user() -> id;
        $dossier -> save ();
        $dossier -> rappel() -> delete();
        $dossier -> pieces() -> delete();
        $dossier -> delete();
        return $dossier;
    }
    
    public function restaureDossier(Request $request){
        $valide = Validator::make($request->all(), [
            'dossier.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        
        $dossier = Dossier::onlyTrashed() -> where ('id',$request['dossier']['id']) -> restore();
        $dossier = Rappel::onlyTrashed() -> where ('dossier_id',$request['dossier']['id']) -> restore ();
        $dossier = Piece::onlyTrashed() -> where ('dossier_id',$request['dossier']['id']) -> restore ();
        
        return $request['dossier']['id'];
    }
    
    public function getCorbeille(){
        $dossier = Dossier::onlyTrashed()->orderBy('id','desc')->where(function ($query) {
                        $query->where('deletedBy',Auth::user()->id)->orWhere('createdBy',Auth::user()->id);
                    })-> with(['pieces','categorie'])->get();
        return $dossier;
    }
}
