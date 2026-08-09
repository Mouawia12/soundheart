<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = $this->pages() + $this->servicePages() + $this->pillarPages();

        foreach ($pages as $key => $page) {
            Page::updateOrCreate(
                ['key' => $key],
                ['name' => $page['name'], 'data' => $page['data']],
            );
        }

        $this->command->info('Seeded '.count($pages).' editable pages.');
    }

    private function loadJson(string $file): array
    {
        $path = database_path('data/'.$file);

        return is_file($path) ? (json_decode(file_get_contents($path), true) ?: []) : [];
    }

    /** Local SEO service landing pages (key: service-<slug>). */
    private function servicePages(): array
    {
        $out = [];
        foreach ($this->loadJson('services.json') as $s) {
            $out['service-'.$s['slug']] = ['name' => 'Service · '.$s['h1'], 'data' => [
                'hero' => [
                    'eyebrow' => $s['kicker'] ?? '',
                    'title' => $s['h1'] ?? '',
                    'lead' => $s['sub'] ?? '',
                ],
                'sections' => [
                    $this->rich('body', 'Page content', $s['bodyHtml'] ?? ''),
                ],
                'cta' => $this->cta(
                    $s['cta']['title'] ?? 'Ready to begin?',
                    $s['cta']['text'] ?? '',
                    'Book a consultation',
                ),
            ]];
        }

        return $out;
    }

    /** Guide / pillar pages (key: pillar-<slug>). */
    private function pillarPages(): array
    {
        $out = [];
        foreach ($this->loadJson('pillars.json') as $p) {
            $out[$p['slug']] = ['name' => 'Guide · '.$p['h1'], 'data' => [
                'hero' => [
                    'eyebrow' => $p['kicker'] ?? '',
                    'title' => $p['h1'] ?? '',
                    'lead' => $p['lead'] ?? '',
                ],
                'images' => [$this->img('hero', 'Guide photo')],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>'.($p['intro'] ?? '').'</p>'),
                ],
                'cta' => $this->cta(
                    $p['cta']['title'] ?? 'Ready to begin?',
                    $p['cta']['text'] ?? '',
                    'Book a session',
                ),
            ]];
        }

        return $out;
    }

    private function img(string $key, string $label): array
    {
        return ['key' => $key, 'label' => $label, 'url' => null];
    }

    /** Rich (HTML) editable content block. */
    private function rich(string $key, string $label, string $html): array
    {
        return ['key' => $key, 'label' => $label, 'text' => $html, 'rich' => true];
    }

    /** Single-line plain-text editable field. */
    private function plain(string $key, string $label, string $text): array
    {
        return ['key' => $key, 'label' => $label, 'text' => $text, 'rich' => false];
    }

    private function aboutBioHtml(): string
    {
        $paras = [
            'For more than twenty years, I have walked alongside individuals, couples, and families through trauma, life transitions, and the beautiful complexity of being human. I know that reaching out for support can feel vulnerable, so my first priority is always the same, to create a space where you feel safe, respected, and truly heard.',
            'Alaska has been home for several years now, and I treasure the connection and community here in the Valley. As a wife and mother of five, I know the joys and the real challenges of family life from the inside. When I am not in session, you will most likely find me grounded in time on our small farm or traveling with my family, both of which keep me close to what matters most.',
            "My training includes dual master's degrees in Counseling Psychology and Marriage and Family Therapy from the University of Akron, and a Master of Counseling from Alaska Pacific University. Over the years I have worked across community mental health, child welfare, corrections, and psychiatric emergency settings, supporting people in acute crisis and in slower, more reflective growth alike.",
            'In our work together, I offer a calm, collaborative space where we can slow things down and make sense of what you are carrying, at your pace and in a way that feels right for you. My approach is trauma-informed, practical, and tailored to your goals, blending real insight with real-world strategies for meaningful, lasting change.',
            'I am committed to an inclusive, neurodiversity-affirming space where everyone, including autistic and otherwise neurodivergent clients, feels welcomed, respected, and valued. I meet each person with curiosity and respect for their own way of thinking, feeling, and moving through the world.',
            'Above all, I hope to be a steady, supportive presence, a place where you feel understood and empowered to move forward in a way that aligns with your values and your goals. Whether we meet in person here in the Mat-Su Valley or work together another way, I would be honored to walk with you.',
        ];

        return implode('', array_map(fn ($p) => '<p>'.$p.'</p>', $paras));
    }

    private function cta(string $title, string $text, string $button): array
    {
        return ['title' => $title, 'text' => $text, 'buttonLabel' => $button];
    }

    private function pages(): array
    {
        return [
            'home' => ['name' => 'Home', 'data' => [
                'hero' => [
                    'eyebrow' => 'Relationship, Trauma & Family Counseling, based in the Mat-Su Valley',
                    'title' => 'What brings you here today?',
                    'lead' => 'Choose where you are, and we will show you the way in, with the right guidance, resources, and support.',
                ],
                'images' => [
                    $this->img('nature', 'Alaska nature band photo'),
                    $this->img('office', 'The Space — office photo'),
                    $this->img('video', 'Meet Nawal — video poster'),
                ],
                'sections' => [],
            ]],
            'about' => ['name' => 'About (Meet Nawal)', 'data' => [
                'hero' => [
                    'eyebrow' => 'About SoundHeart',
                    'title' => 'Meet Nawal',
                    'lead' => 'A calm, steady presence for the hardest seasons, based in the Mat-Su Valley, with clients who come from across the lower 48 and beyond.',
                ],
                'images' => [$this->img('portrait', 'Nawal portrait')],
                'sections' => [
                    $this->plain('name', 'Name & title line', 'Nawal Ibrahim Alhawsawi, LPC, LMFT'),
                    $this->plain('role', 'Role line', 'Founder and Clinical Director, SoundHeart Counseling'),
                    $this->plain('credentials', 'Credential badges (comma-separated)', 'Licensed LPC, Licensed LMFT, Dual board certified, 20+ years experience'),
                    $this->rich('bio', 'Biography', $this->aboutBioHtml()),
                    $this->plain('approach_title', 'Approach card — heading', 'The NeuroRelational Belonging approach'),
                    $this->rich('approach_text', 'Approach card — text', '<p>Everything at SoundHeart flows from one idea. Connection is not something you find, it is something you practice. The NeuroRelational Belonging model helps calm the nervous system so that people bound together, in a marriage, a family, or after divorce, can feel safe with each other again and find their way back.</p>'),
                    $this->plain('approach_link', 'Approach card — link text', 'Read the complete guide to the NeuroRelational Belonging model →'),
                    $this->rich('body', 'Extra content (optional, shows below the bio)', ''),
                ],
                'cta' => $this->cta(
                    'Ready to take the first step?',
                    'Whatever brought you here, booking a consultation is where we begin. Choose a date, and we will guide you from there.',
                    'Book a consultation',
                ),
            ]],
            'therapy' => ['name' => 'Therapy', 'data' => [
                'hero' => [
                    'eyebrow' => 'Therapy',
                    'title' => 'Individual, couples, and family therapy',
                    'lead' => 'Focused, trauma-informed therapy in person in the Mat-Su Valley, grounded in the NeuroRelational Belonging model.',
                ],
                'images' => [
                    $this->img('hero', 'Therapy space photo'),
                    $this->img('session', 'Session / supportive moment photo'),
                ],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>Reaching out is the hardest step. From there, we slow things down and make sense of what you are carrying, at your pace. Our in-person therapy is provided here in the Mat-Su Valley, where we are licensed. For people elsewhere, we also offer services based on our NeuroRelational Belonging model, depending on location.</p>'),
                    $this->rich('body', 'Extra content (optional, shows below the cards)', ''),
                ],
                'cta' => $this->cta(
                    'Ready to begin?',
                    'Reaching out is the first step. Book a consultation and we will guide you to the right path from there.',
                    'Book a session',
                ),
            ]],
            'retreats' => ['name' => 'Retreats', 'data' => [
                'hero' => [
                    'eyebrow' => 'Retreats',
                    'title' => 'Immersive in-person retreats',
                    'lead' => 'Focused, guided time to work through what a weekly hour cannot reach, in a calm setting in the Mat-Su Valley.',
                ],
                'images' => [
                    $this->img('hero', 'Retreat setting photo'),
                    $this->img('moment', 'Calm retreat moment photo'),
                ],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>A retreat gives your relationship concentrated, guided time over several days, instead of spreading help across many short weekly sessions. Couples leave having practiced real change, not just talked about it. Retreats are held in person in the Mat-Su Valley.</p>'),
                    $this->rich('body', 'Extra content (optional, shows below the cards)', ''),
                ],
                'cta' => $this->cta(
                    'Interested in a retreat?',
                    'Book a consultation to talk it through, and we will help you choose the right format.',
                    'Enquire & book →',
                ),
            ]],
            'training' => ['name' => 'Training', 'data' => [
                'hero' => [
                    'eyebrow' => 'Training',
                    'title' => 'NeuroRelational Belonging training and certification',
                    'lead' => 'Professional training for clinicians and helpers who want to bring the NeuroRelational Belonging model into their own work.',
                ],
                'images' => [
                    $this->img('hero', 'Training session photo'),
                    $this->img('workshop', 'Workshop photo'),
                ],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>The NeuroRelational Belonging model holds that connection is a set of patterns the nervous system learns and can relearn, and that healing happens through repeated experiences of safety and belonging. Our training helps professionals understand and apply that framework with the people they serve.</p>'),
                    $this->rich('body', 'Extra content (optional, shows below the cards)', ''),
                ],
                'cta' => $this->cta(
                    'Want to hear when training opens?',
                    'Join our newsletter for first word on upcoming training and retreats, or reach out with questions.',
                    'Contact us →',
                ),
            ]],
            'resources' => ['name' => 'Resources', 'data' => [
                'hero' => [
                    'eyebrow' => 'Resources',
                    'title' => 'Guides, articles, audio, and video',
                    'lead' => 'A growing library of tools and stories, built around the NeuroRelational Belonging model.',
                ],
                'images' => [$this->img('hero', 'Reading / reflection photo')],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>Everything here is built around the NeuroRelational Belonging model, gathered into one place so you can find the right guide, article, or recording for wherever you are right now.</p>'),
                    $this->rich('body', 'Extra content (optional, shows below the library)', ''),
                ],
                'cta' => $this->cta(
                    'Prefer to talk it through?',
                    'Book a consultation, or send us a note with what is on your mind.',
                    'Book a consultation →',
                ),
            ]],
            'contact' => ['name' => 'Contact', 'data' => [
                'hero' => [
                    'eyebrow' => 'Contact',
                    'title' => "Let's take the first step together",
                    'lead' => "Have a question, or want to tell us a little about what's going on? Send a note and we'll help you find the right path.",
                ],
                'images' => [$this->img('hero', 'Warm, welcoming photo')],
                'sections' => [
                    $this->plain('form_heading', 'Form — heading', 'Send us a message'),
                    $this->plain('form_subjects', 'Form — subject options (comma-separated)', 'Marriage or relationship, Therapy for me, Family or parenting, Co-parenting after divorce, Retreats, Something else'),
                    $this->rich('form_note', 'Form — fine print (under the button)', '<p>By sending this, you agree to be contacted about your enquiry. Please do not include sensitive clinical details in this form.</p>'),
                    $this->plain('success_title', 'After sending — heading', 'Thank you.'),
                    $this->rich('success_text', 'After sending — message', "<p>We'll be in touch soon. If it's urgent, call us.</p>"),
                    $this->plain('aside_title', 'Sidebar card — heading', 'Ready to begin?'),
                    $this->rich('aside_text', 'Sidebar card — text', "<p>If you already know you'd like to start, the fastest way in is to book a consultation.</p>"),
                    $this->plain('aside_button', 'Sidebar card — button label', 'Book a consultation →'),
                ],
            ]],
            'the-model' => ['name' => 'The Model (guide)', 'data' => [
                'hero' => [
                    'eyebrow' => 'Complete guide',
                    'title' => 'The NeuroRelational Belonging Model: The Complete Guide',
                    'lead' => 'Our signature approach, and the thread that connects all of our work. Connection is not a trait. It is a practice.',
                ],
                'images' => [$this->img('hero', 'Guide photo')],
                'sections' => [
                    $this->rich('intro', 'Intro paragraph', '<p>At SoundHeart, everything we do runs through one idea. You do not become what you believe. You become what you repeatedly practice, and what you practice, in the end, is belonging. This guide gathers the writing that explains our approach and how it shapes our work with couples, families, and individuals.</p>'),
                    $this->rich('body', 'Extra content (optional, shows below the intro)', ''),
                ],
            ]],
        ];
    }
}
