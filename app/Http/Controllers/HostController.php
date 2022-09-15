<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Host;
class HostController extends Controller
{
    
    public function addHost(Request $request){
        $valide = Validator::make($request->all(), [
            'hote.designation' => 'required|min:5|unique:hosts,designation',
            'hote.utilisateur.id' => 'required|integer',
            'hote.adresse' => 'required|ip|unique:hosts,adresse',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }

        $host = new Host();
        $host -> designation = $request['hote']['designation'];
        $host -> adresse = $request['hote']['adresse'];
        $host -> user_id = $request['hote']['utilisateur']['id'];
        $host ->  save();
        $host ->  user ;
        
        return $host;
    }

    public function editHost(Request $request){
        $valide = Validator::make($request->all(), [
            'hote.designation' => 'required|min:5|unique:hosts,designation,'.$request['hote']['id'].',id',
            'hote.utilisateur.id' => 'required|integer',
            'hote.adresse' => 'required|ip|unique:hosts,adresse,'.$request['hote']['id'].',id',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }

        $host = Host::find($request['hote']['id']);
        $host -> designation = $request['hote']['designation'];
        $host -> adresse = $request['hote']['adresse'];
        $host -> user_id = $request['hote']['utilisateur']['id'];
        $host ->  save();
        $host ->  user ;
        
        return $host;
    }

    public function getHost(){
        return Host::with('user')->orderBy('id','desc')->get();
    }


    public function deleteHost(Request $request){
        dd($request['hote']);
        $valide = Validator::make($request->all(), [
            'hote.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        $dossier =  Host::find($request['hote']['id']);
        $dossier -> delete();
        return $dossier;
    }
}
