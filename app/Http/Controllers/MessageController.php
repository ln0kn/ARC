<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
class MessageController extends Controller
{
    public function getMsgUser(){
        // dd($_GET['id']);
        /**[
         *  nom ,
         *  prenom, 
         *  mesg non lu ,
         * les messages] */
        Message::where('user_id',Auth::user()->id)->where('from_id',$_GET['id'])->update(['read_at' => true]);
        return Message::where('user_id',Auth::user()->id)->where('from_id',$_GET['id'])->orWhere('from_id',Auth::user()->id)->where('user_id',$_GET['id'])->orderBy('created_at','asc')->get();
        
    }

    /**
     * 
     */
    public function getUserContact(){
        
        return User::withCount(['unread' => function ($query){
            $query -> where ('read_at',null);
            $query -> where ('user_id',Auth::user()->id);
        }
        ]) -> where('id','<>',Auth::user()->id)->get();
    }

    public function addMsgUser(Request $request){
        $valide = Validator::make($request->all(), [
            'msg.text' => 'required|min:5',
            'msg.to_id' => 'required',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }

        $msg = new Message();
        $msg -> content = $request['msg']['text'];
        $msg -> read_at = NULL;
        $msg -> from_id = Auth::user()->id;
        $msg -> user_id = $request['msg']['to_id'];
        $msg -> save();

        broadcast(new NewMessage($msg));

        return $msg;
    }
}
