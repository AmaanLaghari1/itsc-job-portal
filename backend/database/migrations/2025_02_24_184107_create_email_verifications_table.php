<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('email_verifications', function (Blueprint $table) {
            $table->id('ID');
            $table->string('EMAIL')->unique();
            $table->string('TOKEN');
            $table->json('DATA'); // Store user registration data temporarily
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_verifications');
    }
};
