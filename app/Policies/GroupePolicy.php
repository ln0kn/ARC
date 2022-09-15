<?php

namespace App\Policies;

use App\Groupe;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class GroupePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any groupes.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    
    public function getGroupe(User $user)
    {
//        die("I'm being called...");
        foreach( $user->groupe ->permission as $value){
            if($value['page'] == 'parametre' && $value['droit'] == 'voir' && $value['statut']) 
                return true ;
        }
        return Response::deny('You do not own this post.');
       
        
    }

//    /**
//     * Determine whether the user can view the groupe.
//     *
//     * @param  \App\User  $user
//     * @param  \App\Groupe  $groupe
//     * @return mixed
//     */
//    public function view(User $user, Groupe $groupe)
//    {
//        return true;
//    }
//
//    /**
//     * Determine whether the user can create groupes.
//     *
//     * @param  \App\User  $user
//     * @return mixed
//     */
    public function addGroupe(User $user)
    {
//        die("I'm being called...");
        foreach( $user->groupe ->permission as $value){
            if($value['page'] == 'parametre' && $value['droit'] == 'ajouter' && $value['statut'])
                return true ;
        }
        return Response::deny('You cannot add a groupe');
    }

    /**
     * Determine whether the user can update the groupe.
     *
     * @param  \App\User  $user
     * @param  \App\Groupe  $groupe
     * @return mixed
     */
    public function editGroupe(User $user)
    {
        foreach( $user->groupe ->permission as $value){
            if($value['page'] == 'parametre' && $value['droit'] == 'editer' && $value['statut'])
                return true ;
        }
    }

    /**
     * Determine whether the user can delete the groupe.
     *
     * @param  \App\User  $user
     * @param  \App\Groupe  $groupe
     * @return mixed
     */
    public function deleteGroupe(User $user)
    {
        foreach( $user->groupe ->permission as $value){
//            die($value);
            if($value['page'] == 'parametre' && $value['droit'] == 'supprimer' && $value['statut'])
                return true ;
        }
    }

//    /**
//     * Determine whether the user can restore the groupe.
//     *
//     * @param  \App\User  $user
//     * @param  \App\Groupe  $groupe
//     * @return mixed
//     */
//    public function restore(User $user, Groupe $groupe)
//    {
//        //
//    }
//
//    /**
//     * Determine whether the user can permanently delete the groupe.
//     *
//     * @param  \App\User  $user
//     * @param  \App\Groupe  $groupe
//     * @return mixed
//     */
//    public function forceDelete(User $user, Groupe $groupe)
//    {
//        //
//    }
}
