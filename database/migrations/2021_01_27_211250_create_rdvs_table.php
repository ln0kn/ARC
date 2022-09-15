<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRdvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rdvs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('intitule');
            $table->string('startDate');
            $table->string('endDate');
            $table->unsignedBigInteger('createdBy');
            $table->foreign('createdBy')->references('id')->on('users');
            $table->unsignedBigInteger('forWho');
            $table->foreign('forWho')->references('id')->on('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rdvs');
    }
}
