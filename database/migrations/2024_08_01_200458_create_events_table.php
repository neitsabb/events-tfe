<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Events\Shared\Enums\EventStatusEnum;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')
                ->primary();
            $table->string('name');
            $table->string('slug')
                ->unique()
                ->nullable();
            $table->string('image')
                ->nullable();
            $table->text('description')
                ->nullable();
            $table->dateTime('start_date')
                ->nullable();
            $table->dateTime('end_date')
                ->nullable();
            $table->text('location')
                ->nullable();
            $table->float('latitude', 10)
                ->nullable();
            $table->float('longitude', 10)
                ->nullable();
            $table->enum('status', EventStatusEnum::toArray())
                ->default(EventStatusEnum::NOT_CONFIGURED);
            $table->foreignId('user_id')
                ->constrained()
                ->onDeleteCascade();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
