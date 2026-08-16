<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@soundheart.org'],
            ['name' => 'SoundHeart Admin', 'password' => Hash::make('soundheart123'), 'role' => 'admin'],
        );

        $this->command->info("Admin ready: {$user->email} / soundheart123 (change after first login)");
    }
}
