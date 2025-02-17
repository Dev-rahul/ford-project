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
        Schema::create('time_series', function (Blueprint $collection) {
            $collection->id();
            $collection->timestamps();
            $collection->unsignedInteger('x');
            $collection->index('y');
            $collection->string('status')->default('unmarked');
            $collection->unsignedInteger('user0')->nullable();
            $collection->unsignedInteger('user1')->nullable();
            $collection->unsignedInteger('user2')->nullable();
            $collection->unsignedBigInteger('excel_id');
            $collection->foreign('excel_id')->references('id')->on('excels');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_series');
    }
};
