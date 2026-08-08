import { site } from '@/config/site'

/**
 * Floating WhatsApp + Book buttons — present on every page, every size.
 * Brand colours (navy/gold), not the default WhatsApp green.
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-[18px] right-[18px] z-[9999] flex flex-col gap-3 font-sans">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp for general inquiries"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-gold bg-navy shadow-[0_10px_26px_-8px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 max-[520px]:h-[52px] max-[520px]:w-[52px]"
      >
        <span className="pointer-events-none absolute right-[66px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-[11px] py-1.5 text-[0.78rem] font-bold text-ivory opacity-0 shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] transition-opacity group-hover:opacity-100">
          WhatsApp us · general inquiries only
        </span>
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-gold-bright max-[520px]:h-[26px] max-[520px]:w-[26px]">
          <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.6 1.9 6.6L4 29l7.1-1.9c1.9 1 4.1 1.6 6.4 1.6h.1c6.9 0 12.5-5.5 12.5-12.5C28.5 8.5 23 3 16 3zm0 22.6h-.1c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.7-1.6-3.7-1.6-5.7 0-5.8 4.7-10.5 10.6-10.5 2.8 0 5.5 1.1 7.5 3.1 2 2 3.1 4.7 3.1 7.5 0 5.8-4.7 10.5-10.6 10.5zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
        </svg>
      </a>

      <a
        href={site.simplePracticeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a consultation"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-[0_10px_26px_-8px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 max-[520px]:h-[52px] max-[520px]:w-[52px]"
      >
        <span className="pointer-events-none absolute right-[66px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-[11px] py-1.5 text-[0.78rem] font-bold text-ivory opacity-0 shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] transition-opacity group-hover:opacity-100">
          Book a consultation
        </span>
        <svg viewBox="0 0 24 24" className="h-7 w-7 max-[520px]:h-[26px] max-[520px]:w-[26px]">
          <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="#1F3D2E" strokeWidth={1.8} />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" fill="none" stroke="#1F3D2E" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      </a>
    </div>
  )
}
