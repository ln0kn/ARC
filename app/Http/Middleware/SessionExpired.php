<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Session\Store;
use Auth;
use Session;
use Carbon\Carbon;

class SessionExpired
{
    protected $session;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Store a string into the variable which
        // need to be Encrypted
        $simple_string = "Laravel";
        
        // Store cipher method
        $ciphering = "BF-CBC";
        
        // Use OpenSSl encryption method
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        //dd($iv_length);
        // Use random_bytes() function which gives
        // randomly 16 digit values
        $encryption_iv = random_bytes($iv_length);
        
        // Alternatively, we can use any 16 digit
        // characters or numeric for iv
        $encryption_key = openssl_digest(php_uname(), 'MD5', TRUE);
        
        // Encryption of string process starts
        $encryption = openssl_encrypt($simple_string, $ciphering,
                $encryption_key, $options, $encryption_iv);
        
        // Decryption of string process starts
        // Used random_bytes() which gives randomly
        // 16 digit values
        $decryption_iv = random_bytes($iv_length);
        
        // Store the decryption key
        $decryption_key = openssl_digest(php_uname(), 'MD5', TRUE);
        
        // Descrypt the string
        $decryption = openssl_decrypt ($encryption, $ciphering,
                    $decryption_key, $options, $encryption_iv);
                    // dd([$encryption,substr($encryption,0,15),$decryption]);
                    dd($decryption == 'Laravel');
        
        // Display the decrypted string
        echo "Decrypted String: " . $decryption;



        dd(bin2hex("Hello World!"));
        dd(sha1(mt_rand(1, 90000) . 'SALT'));
        dd(bin2hex(openssl_random_pseudo_bytes(6)));
        // dd(shell_exec('udevadm info --query=all --name=/dev/sda | grep ID_SERIAL_SHORT'));
        // // If user is not logged in...
        // if (!Auth::check()) {
        //     //return redirect('/login');
        //     return redirect('/message');
            return $next($request);
        // }
        // // If user is not logged in...
        // //if (Auth::check()) {

        //     $user = Auth   ::guard()->user();
        //     $now  = Carbon :: now();
        //     $last_seen = Carbon::parse($user->last_seen_at);
        //     $absence = $now->diffInMinutes($last_seen);
        //     // If user has been inactivity longer than the allowed inactivity period
        //     if ($absence > config('session.lifetime')) {
        //         dd(12);
        //         auth()->logout();
        //         $request->session()->invalidate();
        //         return $next($request);
        //     }dd(1);
        //     // //dd($absence > config('session.lifetime'));
        //     $user->last_seen_at = $now->format('Y-m-d H:i:s');
        //     $user->save();
        //     //return redirect('/login');
        //     return $next($request);
        // //}

        // $user = Auth::guard()->user();
        // //dd($user);
        // $now = Carbon::now();
        // $last_seen = Carbon::parse($user->last_seen_at);
        // //dd($last_seen);
        // $absence = $now->diffInMinutes($last_seen);
        // //dd([$absence,config('session.lifetime')]);
        // // If user has been inactivity longer than the allowed inactivity period
        // if ($absence > config('session.lifetime')) {
        //     dd('h');
        //     auth()->logout();
        // // Auth::guard()->logout();
        //     $request->session()->invalidate();
        //     return $next($request);
        // }
        // //dd($absence > config('session.lifetime'));
        // // $user->last_seen_at = $now->format('Y-m-d H:i:s');
        // // $user->save();
        // // return $next($request);
    }
}
