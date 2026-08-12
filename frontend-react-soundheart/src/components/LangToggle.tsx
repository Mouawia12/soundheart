import { useTranslation } from 'react-i18next'

/** Icon-only globe button that switches between English and Arabic (LTR ⇄ RTL). */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const isAr = (i18n.resolvedLanguage ?? i18n.language ?? 'en').startsWith('ar')

  const toggle = () => i18n.changeLanguage(isAr ? 'en' : 'ar')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
      className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-current opacity-90 transition-opacity hover:opacity-100 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className="h-[18px] w-[18px] stroke-current">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
