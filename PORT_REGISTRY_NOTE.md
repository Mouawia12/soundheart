# سجل المنافذ — SoundHeart

| الخدمة | المنفذ | ملاحظة |
|--------|--------|--------|
| Frontend (Vite / React) | **3020** | `frontend-react-soundheart` — strictPort |
| Backend (Laravel API) | **8020** | `backend-soundheart` — `php artisan serve` |
| MySQL (XAMPP) | 3306 | مشترك مع بقية المشاريع، قاعدة البيانات `soundheart` |

## منافذ مشاريع أخرى (تفادي التعارض)
- memar: FE 3015 / BE 8010
- card-pay: BE 8082

> الواجهة تصل للـ API في التطوير عبر Vite proxy (`/api` → `http://127.0.0.1:8020`)، فلا حاجة لـ CORS محلياً.
> ⚠️ استخدم `http://localhost:3020` (وليس 127.0.0.1) — Vite يستمع على `localhost` (::1).
