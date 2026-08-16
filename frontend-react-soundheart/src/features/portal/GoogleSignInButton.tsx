import { useEffect, useRef } from 'react'
import { googleClientId } from './portalApi'

/**
 * Renders the official Google Sign-In button via Google Identity Services.
 * Dormant (renders nothing) until VITE_GOOGLE_CLIENT_ID is set at build time.
 */
export default function GoogleSignInButton({ onCredential }: { onCredential: (credential: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!googleClientId) return
    const SCRIPT_ID = 'google-gsi'

    const render = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const g = (window as any).google
      if (!g?.accounts?.id || !ref.current) return
      g.accounts.id.initialize({
        client_id: googleClientId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (resp: any) => resp?.credential && onCredential(resp.credential),
      })
      g.accounts.id.renderButton(ref.current, { theme: 'outline', size: 'large', text: 'continue_with', width: 320 })
    }

    if (document.getElementById(SCRIPT_ID)) {
      render()
      return
    }
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.src = 'https://accounts.google.com/gsi/client'
    s.async = true
    s.defer = true
    s.onload = render
    document.head.appendChild(s)
  }, [onCredential])

  if (!googleClientId) return null

  return (
    <div className="mb-3">
      <div ref={ref} className="flex justify-center" />
      <div className="my-3 flex items-center gap-3 text-[0.78rem] text-[#8a929c]">
        <span className="h-px flex-1 bg-stone" /> or <span className="h-px flex-1 bg-stone" />
      </div>
    </div>
  )
}
