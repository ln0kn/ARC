<?php

namespace App\Http\Controllers;
use App\Rdv;
use Validator;
use Illuminate\Http\Request;
use Auth;
class RdvController extends Controller
{
    
    public function addRdv(Request $request){
        $valide = Validator::make($request->all(), [
            'rdv.intitule' => 'required|min:5',
            'rdv.startDate' => 'required|date|after:endDate',
            'rdv.endDate' => 'required|date',
            'rdv.user.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        
        $rdv  = new Rdv ();
        $rdv -> intitule     = $request['rdv']['intitule'];
        $rdv -> startDate    = $request['rdv']['startDate'];
        $rdv -> endDate      = $request['rdv']['endDate'];
        $rdv -> createdBy     = Auth :: user()-> id;
        $rdv -> forWho       = $request['rdv']['user']['id'];
        $rdv -> save() ;
        $rdv -> user;
        return $rdv;
    }
    
    public function editRdv(Request $request){
        $valide = Validator::make($request->all(), [
            'rdv.intitule' => 'required|min:5',
            'rdv.startDate' => 'required|date|after:endDate',
            'rdv.endDate' => 'required|date',
            'rdv.user.id' => 'required|integer',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        
        $rdv  = Rdv::find ($request['rdv']['id']);
        $rdv -> intitule     = $request['rdv']['intitule'];
        $rdv -> startDate    = $request['rdv']['startDate'];
        $rdv -> endDate      = $request['rdv']['endDate'];
        $rdv -> createdBy     = Auth :: user()-> id;
        $rdv -> forWho       = $request['rdv']['user']['id'];
        $rdv -> save() ;
        $rdv -> user;
        return $rdv;
    }
    
    public function getRdv (){
        return Rdv::orderBy('id','desc')->with('user')->get();
    }
}
