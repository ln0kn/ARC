<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePiecesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pieces', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nomPiece');
            $table->integer('sizePiece');
            $table->unsignedBigInteger('dossier_id');
            $table->foreign('dossier_id')->references('id')->on('dossiers');
            $table->unsignedBigInteger('addBy');
            $table->foreign('addBy')->references('id')->on('users');
            $table->unsignedBigInteger('deletedBy')->nullable();
            $table->foreign('deletedBy')->references('id')->on('users');
            $table->timestamps();
            //$table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('pieces');
    }
}
