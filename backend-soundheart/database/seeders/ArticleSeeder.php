<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/articles.json');
        if (! is_file($path)) {
            $this->command->error("Missing {$path}");

            return;
        }

        $items = json_decode(file_get_contents($path), true);
        $author = 'Nawal Ibrahim Alhawsawi, MA, MS, LPC, LMFT, NCC';

        // Categories in first-seen (document) order.
        $catOrder = [];
        foreach ($items as $it) {
            $name = $it['category'] ?: 'Uncategorized';
            if (! isset($catOrder[$name])) {
                $catOrder[$name] = count($catOrder);
            }
        }

        $catIds = [];
        foreach ($catOrder as $name => $order) {
            $cat = Category::updateOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'sort_order' => $order],
            );
            $catIds[$name] = $cat->id;
        }

        $i = 0;
        foreach ($items as $it) {
            $name = $it['category'] ?: 'Uncategorized';
            Article::updateOrCreate(
                ['slug' => $it['slug']],
                [
                    'category_id' => $catIds[$name] ?? null,
                    'title' => $it['title'],
                    'excerpt' => $it['excerpt'] ?? null,
                    'body' => $it['body_html'] ?? null,
                    'meta_description' => $it['meta_description'] ?? null,
                    'focus_keywords' => $it['focus_keywords'] ?? null,
                    'read_time' => $it['read_time'] ?? null,
                    'author' => $author,
                    'faqs' => $it['faqs'] ?? [],
                    'status' => 'published',
                    'featured' => $it['slug'] === 'reconnecting-after-no-contact',
                    'published_at' => Carbon::now()->subDays($i),
                ],
            );
            $i++;
        }

        $this->command->info('Seeded '.count($items).' articles across '.count($catIds).' categories.');
    }
}
