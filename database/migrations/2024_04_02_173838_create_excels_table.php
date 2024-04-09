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
        Schema::create('excels', function (Blueprint $collection) {
            $collection->id();
            $collection->timestamps();
            $collection->string('name');
            $collection->unsignedInteger('user0')->nullable();
            $collection->unsignedInteger('user1')->nullable();
            $collection->unsignedInteger('user2')->nullable();
            // $collection->string('file_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('excels');
    }
};
