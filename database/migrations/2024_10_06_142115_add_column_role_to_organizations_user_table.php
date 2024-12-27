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
        Schema::table('organizations_users', function (Blueprint $table) {
            $table->enum('role', [
                'member',
                'admin',
                'owner'
            ])->default('member');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organizations_users', function (Blueprint $table) {
            //
        });
    }
};
