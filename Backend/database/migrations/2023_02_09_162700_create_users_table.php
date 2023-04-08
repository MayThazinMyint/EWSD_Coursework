<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::dropIfExists('users');
        Schema::create('users', function (Blueprint $table) {
            $table->integer('id')->unsign(false)->autoIncrement()->notnull();
            $table->string('user_name');
            $table->string('email')->unique();
            $table->string('user_phone');
            $table->string('user_dob');
            $table->string('address');
            $table->string('user_code');
            $table->dateTime('created_date');
            $table->dateTime('updated_date');
            $table->integer('department_id');
            $table->integer('user_role_id');
            $table->string('password');
            $table->tinyInteger('is_active');
            $table->rememberToken();
            $table->foreign('user_role_id')->references('user_role_id')->on('user_roles')->onDelete('cascade');
            $table->foreign('department_id')->references('department_id')->on('departments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
