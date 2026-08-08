# SoundHeart — مرجع التصميم (مستخرج من soundheart-counseling-5.html)

> المصدر الوحيد للحقيقة عند تحويل التصميم إلى React. أي تحويل لازم يطابق هذا طبق الأصل.

## الهوية / المعالجة
- الاسم التجاري: **SoundHeart Counseling**
- المعالِجة: **Nawal Ibrahim Alhawsawi (Nawal Alhawsawi)**
- الموقع: Mat-Su Valley, Alaska + telehealth (lower 48 & beyond)
- الهاتف: **907-310-1404** (`tel:19073101404`)
- الحجز: **SimplePractice** (زر خروج فقط، لا تضمين)
- البودكاست: **Wired to Belong** (Apple · Spotify · RSS) — قادم
- النشرة: MailerLite/Substack
- أزمة: 988 / 911 (SoundHeart ليست خدمة طوارئ)

## نظام الألوان (CSS variables)
```
--navy:       #1F3D2E   /* الأخضر الأساسي (عناوين + أقسام داكنة) */
--navy-deep:  #15301F   /* أخضر أعمق (تدرّج hero) */
--gold:       #B8964F   /* ذهبي أساسي (أزرار، لكنات، حدود) */
--gold-bright:#C9A961   /* ذهبي فاتح (hover، نصوص على داكن) */
--ivory:      #FAF6EE   /* خلفية الصفحة */
--stone:      #EAE1CD   /* حدود، خلفيات ثانوية */
--ink:        #33383F   /* لون النص الأساسي */
--white:      #ffffff
--maxw:       1120px    /* أقصى عرض للحاوية .wrap (padding 0 28px) */
```
تدرّج الـ hero: `linear-gradient(160deg,#15301F 0%,#1F3D2E 45%,#2E5A44 130%)`

## الخطوط
- العناوين (h1–h4): **Spectral** (serif) — weight 500، line-height 1.15، لون navy، italic للتأكيد
- النصوص: **Mulish** (sans) — weight 300/400/500/600/700، body 17px، line-height 1.65
- eyebrow: Mulish، uppercase، letter-spacing .22em، .72rem، bold، لون gold
- ⚠️ حالياً محمّلة من Google Fonts — **يجب استضافتها محلياً** عبر next/font/local

## أنماط متكررة (Design tokens)
- الأزرار: `.btn` radius **2px**، padding .85em 1.5em، bold .95rem
  - primary: خلفية gold / نص navy → hover gold-bright + رفع 1px
  - ghost: شفاف + حد navy → hover تعبئة navy
  - ghost-light: للخلفيات الداكنة، حد gold-bright
- البطاقات: خلفية white، حد stone، radius 6px، hover رفع 3px + ظل
  - `.door` فيها شريط علوي ذهبي 4px (`::before`)
- الأقسام: padding 96px 0
- نقاط القوائم: دائرة ذهبية 8px بدل bullet
- أنيميشن: `.reveal` (fade+rise عند التمرير via IntersectionObserver) + `.heartbeat` (رسم خط النبض بـ stroke-dashoffset)
- الأزرار العائمة: WhatsApp + calendar (ذهبية، أسفل يمين، ثابتة)

## القائمة (Nav)
About · The Model · Therapy · Retreats · Training · Resources · Shop · Contact · **[Book a consultation]**
(الروابط الأصلية: about.html, pillar-neurorelational.html, therapy.html, retreats.html, training.html, resources.html, shop.html, contact.html, soundheart-book-consultation.html)

## أقسام الصفحة الرئيسية (بالترتيب)
1. **NAV** — sticky، شعار (heart mark) + روابط + زر ذهبي
2. **HERO** (أخضر) — خط نبض ذهبي متحرك + eyebrow + h1 "What brings you here today?" + lead + جملة italic "Connection is not something you find. It is something you practice." + شبكة 6 بطاقات مداخل + دعوة + زر
   - المداخل الست: Save my marriage / Therapy for me / Family struggles / Co-parenting after divorce / Addiction & recovery / I am just learning
3. **BOOKING STEPS** (أخضر) — 3 خطوات: Choose a date → Complete secure payment → Complete forms + "Call 907-310-1404"
4. **TWO DOORS** — "Two ways in. The same work." — بابان: Counseling in Mat-Su / Retreats, training & the model
5. **SERVICES** (stone) — "Focused help for relationships and families" — 3 بطاقات: Relationship crisis / Co-parenting / Healing families
6. **MODEL** (أخضر) — "The NeuroRelational model" — 3 مبادئ مرقّمة (01/02/03) + اقتباس توقيع لـ Nawal
7. **RETREATS** — "Go deeper than a session" — 3 بطاقات: Couples / Individual / Professional training
8. **RETREAT BANNER** — "Give your relationship a weekend, not just an hour" + Explore retreats
9. **NATURE BAND** — صورة Alaska full-width (placeholder) + "In person Mat-Su · Telehealth lower 48"
10. **LIBRARY** (stone) — "Four books, one throughline" — 4 كتب: The Marriage Rehab / The Relationship Brain / The Rehabilitated Self / NeuroRelational Belonging + نموذج نشرة
11. **BLOG** — "From the SoundHeart blog" — مقال مميز (WSJ estrangement) + 3 مقالات + podcast teaser
12. **TESTIMONIALS** — "What clients say" — 3 placeholders (add real quotes)
13. **FAQ** — "Frequently asked" — 11 سؤال/جواب (accordion)
14. **THE SPACE** — "A warm, quiet place" + صورة office (placeholder)
15. **AREAS** — "Based in Mat-Su Valley, working everywhere"
16. **GETTING STARTED** — "What to expect at your first session" + روابط أدلة
17. **MEDIA & RESOURCES** — Meet Nawal video placeholder + Podcast player placeholder + Self-assessment placeholder
18. **CONTACT** — "Book a consultation" (SimplePractice) + confidential space + crisis 988/911
19. **FOOTER** — heart mark + توقيع "A sound heart is not one that never breaks. It is one that learns to mend." + روابط: About/Model/Therapy/Retreats/Training/Resources/Areas/FAQ/Contact/Privacy/Terms + NAP

## اقتباسات التوقيع
- Hero: "Connection is not something you find. It is something you practice."
- Model: "You do not become what you believe. You become what you repeatedly practice, and what you practice, in the end, is belonging." — Nawal
- Footer: "A sound heart is not one that never breaks. It is one that learns to mend."

## أصول تحتاج استبدال (placeholders في التصميم)
- شعار SoundHeart (base64 JPEG مدمج حالياً)
- صورة Alaska nature (nature band)
- صورة المكتب (the space)
- فيديو Meet Nawal (YouTube/Vimeo)
- تضمين البودكاست
- أداة التقييم الذاتي
- اقتباسات الشهادات الحقيقية + الإسناد
