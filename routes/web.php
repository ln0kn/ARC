<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('/addGroupe' , 'GroupeController@addGroupe');
Route::put('/editGroupe' , 'GroupeController@editGroupe');
Route::delete('/deleteGroupe' , 'GroupeController@deleteGroupe');
//Route::get('/getGroupe' , 'GroupeController@view');
Route::get('/getGroupe' , 'GroupeController@getGroupe');


Route::post('/addCategory' , 'CategorieController@addCategory');
Route::put('/editCategory' , 'CategorieController@editCategory');
Route::delete('/deleteCategorie' , 'CategorieController@deleteCategorie');
Route::get('/getCategorie' , 'CategorieController@getCategorie');


Route::get('/getUser',   'AuthController@getUser');
Route::post('/addUser', 'AuthController@register');
Route::put('/editUser', 'AuthController@editUser');
Route::delete('/deleteUser', 'AuthController@deleteUser');


Route::get('/getCorbeille',   'DossierController@getCorbeille');
Route::get('/getDossier',   'DossierController@getDossier');
Route::get('/displayDossier',   'DossierController@displayDossier');
Route::post('/addDossier', 'DossierController@addDossier');
Route::post('/editDossier', 'DossierController@editDossier');
Route::post('/restaureDossier', 'DossierController@restaureDossier');
Route::delete('/deleteDossier', 'DossierController@deleteDossier');



Route::get('/getRdv',   'RdvController@getRdv');
Route::post('/addRdv', 'RdvController@addRdv');
Route::put('/editRdv', 'RdvController@editRdv');
Route::delete('/deleteRdv', 'RdvController@deleteRdv');

//Route::get('/login',   'AuthController@log');
Route::post('/auth/login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
        

Route::get('/getRappel',   'RappelController@getRappel');


/**message routes 
 * 
*/
Route::get('/getMsgUser', 'MessageController@getMsgUser');
Route::get('/getUserContact', 'MessageController@getUserContact');
Route::post('/addMsgUser', 'MessageController@addMsgUser');

/** kel utilisateur est connecte */
Route::get('/getUserConnect', 'AuthController@me');

Route::post('/addHost', 'HostController@addHost');
Route::get('/getHost', 'HostController@getHost');
Route::put('/editHost', 'HostController@editHost');
Route::delete('/deleteHost', 'HostController@deleteHost');


//License 
Route::post('/addLicense', 'LicenseController@addLicense');
Route::get('/getLicense', 'LicenseController@getLicense');



Route::get('/{any}', 'ApplicationController')->where('any', '.*');
