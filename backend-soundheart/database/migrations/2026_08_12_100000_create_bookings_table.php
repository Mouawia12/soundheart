<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->json('guests')->nullable();          // extra guest emails
            $table->dateTime('starts_at');               // stored UTC
            $table->dateTime('ends_at');                 // stored UTC
            $table->string('timezone')->default('UTC');  // practice tz at booking time
            $table->string('type')->default('online');   // online | in_person
            $table->string('status')->default('confirmed'); // confirmed | cancelled
            // Forward-compat for Phase B (Stripe + Google Meet):
            $table->unsignedInteger('amount')->nullable();
            $table->string('currency', 8)->nullable();
            $table->string('payment_status')->default('not_required'); // not_required|unpaid|paid
            $table->string('stripe_session_id')->nullable();
            $table->string('meet_url')->nullable();
            $table->string('calendar_event_id')->nullable();
            $table->timestamps();

            $table->index('starts_at');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
