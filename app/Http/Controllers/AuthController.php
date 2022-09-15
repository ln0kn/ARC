<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Carbon\Carbon;
//use Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
     {
//        $this->middleware('auth:api', ['except' => ['login']]);
     }
    
     /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function login()
     {
         
         $credentials = request(['email', 'password']);
         $token = auth()->attempt($credentials);
         if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
         }
        Auth::user()->last_seen_at = Carbon::now()->format('Y-m-d H:i:s');
        Auth::user()->groupe ->permission;
        Auth::user()->save();
        //$user->last_seen_at = Carbon::now()->format('Y-m-d H:i:s');
        
         return Auth::user();
//         return $this->respondWithToken($token);
     }
    
     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function me()
     {
        return response()->json(auth()->user());
     }
     
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function logout()
     {
         auth()->logout();
         return response()->json(['message' => 'Successfully logged out']);
     }
     /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function refresh()
     {
        return $this->respondWithToken(auth()->refresh());
     }
     /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
     protected function respondWithToken($token)
     {
         return response()->json([
             'access_token' => $token,
             'token_type'   => 'bearer',
             'expires_in'   => auth()->factory()->getTTL() * 60,
             'userData'     => auth()->user(),
         ]);
     }
    
    public function register(Request $request){
        $valide = Validator::make($request->all(), [
            'user.nom' => 'required',
            'user.prenom' => 'required',
            'user.email' => 'required|email|unique:users,email',
            'user.groupe.id' => 'required|integer',
            'user.password' => 'required|confirmed',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        $user = new User([
            'nom' => $request['user']['nom'],
            'prenom' => $request['user']['prenom'],
            'groupe_id' => $request['user']['groupe']['id'],
            'email' => $request['user']['email'],
            'password' => $request['user']['password'],
        ]);
        $user -> save();
        $user -> groupe ;
        return $user;
    }
    
    public function deleteUser(Request $request){
        $valide = Validator::make($request->all(),[
            'groupe' => 'required|integer',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        $usr = User::find($request['groupe']);
        $usr -> delete ();
        
        return $usr;
    }
    
    
    public function editUser(Request $request){
        $valide = Validator::make($request->all(),[
            'user.id' => 'required|integer',
            'user.nom' => 'required',
            'user.prenom' => 'required',
            'user.email' => 'required|email|unique:users,email,'.$request['user']['id'].',id',
            'user.groupe.id' => 'required|integer',
            'user.password' => 'nullable|string|min:6|confirmed',
        ]);
        if ($valide->fails()) {
          return response()->json([
            'fail' =>true,
            'errors' => $valide->errors()
          ]);
        }
        $usr = User::find($request['user']['id']);
        $usr -> nom    = $request['user']['nom'];
        $usr -> prenom = $request['user']['prenom'];
        $usr -> email  = $request['user']['email'];
        $usr -> groupe_id  = $request['user']['groupe']['id'];
        
        if ($request['password']) 
            $usr -> password = $request['password'];
        
        $usr -> save ();
        
        $usr -> groupe ;
        return $usr;
    }
    
    public function getUser(){  
        return User::orderBy('id','desc') -> with ('groupe')->get();
    }

    public function log(){
        return view('');
    }
    
}
