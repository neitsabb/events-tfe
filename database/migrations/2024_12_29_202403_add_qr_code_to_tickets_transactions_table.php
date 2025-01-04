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
        Schema::table('tickets_transactions', function (Blueprint $table) {
            Schema::table('tickets_transactions', function (Blueprint $table) {
                $table->string('qr_code')->nullable()->after('ticket_id');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets_transactions', function (Blueprint $table) {
            //
        });
    }
};