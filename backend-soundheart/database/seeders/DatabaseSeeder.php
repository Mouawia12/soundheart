<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the full canonical dataset. Running `php artisan migrate:fresh --seed`
     * reproduces exactly what we have locally: admin user, categories + articles,
     * editable pages, and the site settings row.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            DemoClientSeeder::class,
            ArticleSeeder::class,
            PageSeeder::class,
        ]);

        // Ensure the site + booking settings rows exist with defaults.
        Setting::site();
        Setting::booking();
    }
}
