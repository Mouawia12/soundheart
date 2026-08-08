# SoundHeart Counseling

موقع عيادة **SoundHeart Counseling** (Nawal Alhawsawi) — علاج العلاقات والأسرة والصدمات في Mat-Su Valley, Alaska، مع telehealth. موقع عام يعتمد على السيو + مدوّنة + لوحة تحكم لإدارة المحتوى.

المعمارية: **React (Vite) → Laravel REST API → MySQL**

## بنية المستودع
```
soundheart/
├── backend-soundheart/          # Laravel 13 API (Sanctum + spatie/permission)
├── frontend-react-soundheart/   # Vite + React 19 + TS + Tailwind + shadcn
├── design-source/               # التصميم المعتمد (المصدر الوحيد للحقيقة)
│   ├── soundheart-counseling-5.html
│   └── DESIGN-REFERENCE.md       # الألوان/الخطوط/النصوص/الأقسام مستخرجة
├── PLAN.md                       # الخطة وسير عمل تحويل الواجهات
└── PORT_REGISTRY_NOTE.md         # المنافذ
```

## التقنيات
- **الواجهة الخلفية**: Laravel 13 / PHP 8.3، Sanctum (Bearer)، spatie/permission، مغلّف JSON موحّد `App\Support\ApiResponse` → `{success, message, data, errors?, meta?}`، مسارات تحت `/api/v1` (ملف لكل موديول في `routes/api/`).
- **الواجهة الأمامية**: Vite + React 19 + TypeScript، بنية features، React Query + Zustand + react-router، Tailwind + shadcn، خطوط مستضافة محلياً (Spectral + Mulish عبر `@fontsource`)، i18next (إنجليزي الآن، RTL لاحقاً).
- **قاعدة البيانات**: MySQL (XAMPP)، قاعدة `soundheart`.

## التشغيل المحلي

### 1) الواجهة الخلفية (منفذ 8020)
```bash
cd backend-soundheart
php artisan serve --host=127.0.0.1 --port=8020
```
> تأكد أن MySQL (XAMPP) شغّال وأن قاعدة `soundheart` موجودة. الإعدادات في `.env` (root بلا باسورد).

### 2) الواجهة الأمامية (منفذ 3020)
```bash
cd frontend-react-soundheart
npm install
npm run dev
```
افتح: **http://localhost:3020**  ·  فحص الـ API: **http://localhost:3020/api/v1/health**

## سير عمل تحويل واجهة جديدة (مهم)
كل تصميم جديد يُحوَّل إلى React **طبق الأصل تماماً**، وفق الحلقة:
1. **افهم** التصميم من `design-source/` (ماركب + CSS + النصوص).
2. **حوّل** إلى مكوّنات React باستخدام الـ design tokens (نفس الألوان/الخطوط/المسافات).
3. **عاين** — شغّل الواجهة وخُذ لقطة للصفحة المحوّلة.
4. **قارن** مع الأصل جنباً إلى جنب وأكّد المطابقة قبل الاعتماد.
5. عند أي فرق، صحّح وأعد المعاينة.

راجع [PLAN.md](PLAN.md) للتفاصيل الكاملة.

## ملاحظة أمان
لا تُرفع أي أسرار إلى المستودع — فقط `.env.example`. لا تُخزَّن أي بيانات صحية للزوار في قاعدة البيانات (نموذج التواصل يرسل بريداً ولا يحفظ شيئاً).
