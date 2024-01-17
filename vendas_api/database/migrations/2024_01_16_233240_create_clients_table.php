<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 191)->unique();
            $table->string('cpf', 11)->unique();
            $table->date('birth_date');
            $table->string('gender', 1);
            $table->string('phone', 11);
            $table->string('cep', 8);
            $table->string('address', 100);
            $table->string('address_number', 10);
            $table->string('address_complement', 100)->nullable();
            $table->string('neighborhood', 100);
            $table->string('city', 100);
            $table->string('state', 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
