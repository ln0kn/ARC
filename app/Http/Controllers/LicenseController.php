<?php

namespace App\Http\Controllers;
use Validator;
use App\License;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Crypt;
class LicenseController extends Controller
{
    public function addLicense(Request $request){
        $valide = Validator::make($request->all(), [
            'license.code' => 'required|min:5|unique:licenses,secretCode',
        ]);
        if ($valide->fails()) {
            return response()->json([
                'fail' =>true,
                'errors' => $valide->errors()
            ]);
        }
        
        // // Store a string into the variable which
        // // need to be Encrypted
        // $simple_string = env('APP_NAME');
        
        // // Store cipher method
        // $ciphering = "BF-CBC";
        
        // // Use OpenSSl encryption method
        // $iv_length = openssl_cipher_iv_length($ciphering);
        // $options = 0;
        // //dd($iv_length);
        // // Use random_bytes() function which gives
        // // randomly 16 digit values
        // $encryption_iv = random_bytes($iv_length);
        
        // // Alternatively, we can use any 16 digit
        // // characters or numeric for iv
        // $encryption_key = openssl_digest(php_uname(), 'MD5', TRUE);
        
        // // Encryption of string process starts
        // $encryption = openssl_encrypt($simple_string, $ciphering,
        //         $encryption_key, $options, $encryption_iv);
        
        // // Decryption of string process starts
        // // Used random_bytes() which gives randomly
        // // 16 digit values
        // $decryption_iv = random_bytes($iv_length);
        
        // // Store the decryption key
        // $decryption_key = openssl_digest(php_uname(), 'MD5', TRUE);
        
        // // Descrypt the string
        // $decryption = openssl_decrypt ($request['license']['code'], $ciphering,
        //             $decryption_key, $options, $encryption_iv);

        //             $enc = Crypt::encrypt('0');
        //             $denc = Crypt::decryptString($enc);
        //             dd($enc,$denc);
        //             dd($request['license']['code']);
        //         // dd($request['license']['code'],$decryption == $simple_string);
        //             dd($decryption);

        // $license = new License();
        // if($decryption == $simple_string){
        //     $license->secretCode = $request['license']['code'];
        //     $results = License::latest('id')->first();
        //     if (empty($results)) {
        //         $current = Carbon::now();
        //         $cur = Carbon::now();
        //         $ex = $cur->addDays(30);

        //         $license->dateDebut = $current;
        //         $license->dateFin = $ex;
        //     } else {
        //         $current = new Carbon($results['dateFin']);
        //         $cur = new Carbon($results['dateFin']);
        //         $ex = $cur->addDays(30);

        //         $license->dateDebut = $current;
        //         $license->dateFin = $ex;
        //     }
        //     $license ->  save() ;
        // }
        // else{
        //     return response()->json(['fail' =>true,'errors' =>[['License incorrecte. Veuillez contactez l\'administrateur']]]);
        // }
        
        
        // return $license;

        // $encrypted = Crypt::encryptString('Hello DevDojo');
        // print_r($encrypted);
        // $decrypt= Crypt::decryptString($encrypted);
        // print_r($decrypt);
        // if($decrypt == 'Hello DevDojo')
        //     print_r('ok');
        // else {
        //     print_r('no');
        // }
        // return 

        /* Luhn algorithm number checker - (c) 2005-2008 shaman - www.planzero.org *
 * This code has been released into the public domain, however please      *
 * give credit to the original author where possible.                      */

//  $number = '1738292928284637';

//     // Strip any non-digits (useful for credit card numbers with spaces and hyphens)
//     $number=preg_replace('/\D/', '', $number);
  
//     // Set the string length and parity
//     $number_length=strlen($number);
//     $parity=$number_length % 2;
  
//     // Loop through each digit and do the maths
//     $total=0;
//     for ($i=0; $i<$number_length; $i++) {
//       $digit=$number[$i];
//       // Multiply alternate digits by two
//       if ($i % 2 == $parity) {
//         $digit*=2;
//         // If the sum is two digits, add them together (in effect)
//         if ($digit > 9) {
//           $digit-=9;
//         }
//       }
//       // Total up the digits
//       $total+=$digit;
//     }
  
//     // If the total mod 10 equals 0, the number is valid
//     dd (($total % 10 == 0) ? TRUE : FALSE);
//     //return ($total % 10 == 0) ? TRUE : FALSE;
//     return $total ;







$encrypter = new Encrypter('1234567812345678', 'AES-128-CBC');

$encrypted = $encrypter->encrypt('Hello world');
dump($encrypted);
// prints something similar to "eyJpdiI6ImdMd2dWcW5jMXBrUDBranRJZXQ5MEE9PSIsInZhbHVlIjoiNnhTODBSclB3ZVp3SFRRUWFWTHpReFQwYWQ1aXVmTmhXOXV5WHM2TzR1WT0iLCJtYWMiOiIwODQyZDhiMzZlNDQwZTZjYTRiYmI2MGE0MTgzNzk5NGNkZTU1Yzc5NDIyYzdjYmYwNzk2ZTA5MGNjYjc4MGYzIn0="

$decrypted = $encoder->decrypt($encrypted);
dump($decrypted);
// prints "Hello world" again














       


        
        
    }

    function random_bytes($bytes) {
        $secure = true;
        $buf = openssl_random_pseudo_bytes($bytes, $secure);
        if ($buf !== false && $secure && strlen($buf) === $bytes) {
          return $buf;
        }
      }
      
      function get_hash($iv, $value, $key) {
          return hash_hmac('sha256', $iv.$value, $key);
      }
      
      function get_random_input($len) {
          return substr(md5(rand()), 0, $len);
      }
      
      function do_laravel_encrypt($value, $key, $cipher) {
          $iv = random_bytes(16);
          $value = openssl_encrypt(serialize($value), $cipher, $key, 0, $iv);
          $mac = get_hash($iv = base64_encode($iv), $value, $key);
          $json = json_encode(compact('iv', 'value', 'mac'));
          return base64_encode($json);
      }
      
      function go() {
          
      }
    public function getLicense(){
        return License::all();
    }
}
