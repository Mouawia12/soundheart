# خطة المشروع — SoundHeart

> نسخة مُكيّفة على قناعات المطوّر (نمط memar/card-pay). تنحرف عن خطة كلود الأصلية في نقطتين مُتفق عليهما:
> **Vite + React SPA** بدل Next.js، و**لوحة React مخصصة** بدل Filament، مع **Tailwind + shadcn**.

## القرارات المعتمدة
- الواجهة: Vite + React 19 + TS، بنية `features/`، Tailwind + shadcn.
- الخلفية: Laravel 13 API، Sanctum، spatie/permission، مغلّف `ApiResponse`، `/api/v1`.
- الأدمن: لوحة React مخصصة (مسارات `/admin` محمية) تستهلك `Api\V1\Admin`.
- الستايل: إعادة بناء بـ Tailwind مع design tokens مطابقة للتصميم الأصلي.
- SEO: بما أن الواجهة SPA، تُضاف طبقة prerender لصفحات المحتوى لاحقاً (تخفيف).

## ⚠️ سير عمل تحويل الواجهات (قاعدة إلزامية)
كل واجهة/صفحة جديدة تُعطى للتحويل تمرّ بالحلقة التالية، ولا تُعتمد إلا بعد تأكيد المطابقة:
1. **افهم**: اقرأ ماركب + CSS + نصوص القسم من `design-source/`.
2. **حوّل**: مكوّنات React + Tailwind، بالاعتماد على الـ tokens (لا ألوان/قياسات عشوائية).
3. **عاين (preview)**: شغّل الواجهة، خُذ لقطة للقسم/الصفحة.
4. **قارن مع الأصل**: جنباً إلى جنب، وأكّد أنها **طبق الأصل**.
5. **صحّح وكرّر** عند أي فرق قبل الانتقال للتالي.
- خصائص منطقية (`margin-inline`, `text-align:start`) لا `left/right` — تحضيراً لـ RTL.
- كل نص UI ثابت خارج JSX (locales/en أو content module) — تحضيراً للترجمة.

---

## الحالة الحالية
- [x] **المرحلة 0** — جرد التصميم واستخراج النظام (`design-source/DESIGN-REFERENCE.md`).
- [x] **المرحلة 1** — أساس الخلفية: Laravel 13 + Sanctum + spatie + مغلّف `ApiResponse` + `/api/v1/health` + CORS + MySQL. **يعمل** (200).
- [x] **المرحلة 2** — أساس الواجهة: Vite+React+TS، Tailwind+shadcn + design tokens، خطوط محلية، `lib/api` (يفكّ المغلّف) + React Query + Zustand + router + layout (Header/Footer/FloatingContact طبق الأصل). **يعمل** والـ proxy للـ API يعمل.
- [ ] **المرحلة 3** — تحويل الصفحة الرئيسية كاملة (19 قسم) طبق الأصل + معاينة وتأكيد.
- [ ] **المرحلة 4** — نطاق المحتوى في الخلفية: هجرات/نماذج/موارد/تحكّمات لـ pages, articles, categories, podcast_episodes, settings. قراءة عامة.
- [ ] **المرحلة 5** — `POST /api/v1/contact`: يتحقق + يرسل بريداً، **لا يخزّن شيئاً**، honeypot + rate limit (5/دقيقة).
- [ ] **المرحلة 6** — بقية الصفحات (about, the-model, therapy, retreats, training, resources, shop, articles, faq, privacy, terms) بنفس حلقة التحويل.
- [ ] **المرحلة 7** — لوحة أدمن React مخصصة: مصادقة Sanctum، إدارة المقالات/الصفحات/الإعدادات (محتوى فقط، لا تحكم بالتخطيط).
- [ ] **المرحلة 8** — الربط الخارجي: SimplePractice (رابط خارجي، لا تضمين)، واتساب/هاتف، Spotify/YouTube/SoundCloud، Substack، Gumroad/Thinkific، GA4 بعد موافقة الكوكيز.
- [ ] **المرحلة 9** — السيو/الأساسيات: prerender، meta لكل صفحة، sitemap/robots، JSON-LD (MedicalBusiness/Article)، next-gen images.
- [ ] **المرحلة 10** — الجودة والنشر: Lighthouse، فحص الروابط، النشر، النسخ الاحتياطي، تسليم بيانات الأدمن.

## خارج النطاق (لا يُبنى)
- النسخة العربية RTL (مشروع منفصل — فقط نُبقي الكود مهيأً لها).
- أداة التقييم الذاتي، مكتبة الفيديو/الأدلة القابلة للتحميل (روابط "coming soon").
- أي متجر/حجز/دفع داخل الموقع (كلها خارجية).

## المخرجات النهائية
موقع يعمل بشهادة SSL · لوحة تحكم بكل المحتوى مستورد · الكود المصدري كاملاً بلا قفل · README + DEPLOYMENT · تسجيل شاشة قصير لطريقة الإدارة.
