import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { footerNav, site } from '@/config/site'

/**
 * The unified site footer (new design): Contact · FAQ · Privacy · Terms ·
 * Disclaimer · Client Login, then NAP line, signature, and the crisis note.
 * Legal name / signature / crisis note come from the CMS site settings.
 */
export function FooterSite() {
  const { t } = useTranslation()
  return (
    <footer className="mt-[52px] bg-navy-deep px-[26px] pb-[30px] pt-[34px] text-[0.85rem] text-[#c9d3c8]">
      <div className="mx-auto max-w-[1000px] text-center">
        <nav className="mb-[14px] flex flex-wrap justify-center gap-4">
          {footerNav.map((l) => (
            <Link key={l.key} to={l.to} className="font-semibold text-gold-bright no-underline hover:underline">
              {t(`footer.${l.key}`)}
            </Link>
          ))}
          <Link to="/portal" className="font-semibold text-gold-bright no-underline hover:underline">
            {t('footer.clientLogin')}
          </Link>
        </nav>
        <p className="m-0">
          {site.legalName} · {t('footer.basedIn')} · {t('footer.workingWith')}
        </p>
        {site.signature && <p className="m-0 mt-[6px] italic text-[#9fb0a2]">{site.signature}</p>}
        {site.crisisNote && (
          <p className="mx-auto mt-[14px] max-w-[62ch] text-[0.8rem] opacity-85">{site.crisisNote}</p>
        )}
      </div>
    </footer>
  )
}

// The new design uses one footer everywhere; keep these names as aliases so the
// existing layouts don't need to change their imports.
export const FooterMinimal = FooterSite
export const FooterBlog = FooterSite
