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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('product_id');
            $table->decimal('unit_price', 10, 2);
            $table->float('discount', 8, 2)->nullable();
            $table->decimal('total', 10, 2);
            $table->date('sale_date');
            $table->string('payment_form', 2);
            $table->unsignedInteger('number_installments')->nullable();
            $table->decimal('installment_value', 10, 2)->nullable();
            $table->string('observation', 255)->nullable();
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
