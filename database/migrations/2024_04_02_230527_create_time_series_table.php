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
            $collection->index('x');
            $collection->index('y');
            $collection->string('status')->default('unmarked');

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
