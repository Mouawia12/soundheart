<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoClientSeeder extends Seeder
{
    /**
     * A ready-to-use demo client for trying the portal + messaging.
     * Same credentials locally and on the server so the experience matches.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'client@soundheart.org'],
            ['name' => 'Demo Client', 'password' => Hash::make('client123'), 'role' => 'client'],
        );

        $this->command->info("Demo client ready: {$user->email} / client123");
    }
}
