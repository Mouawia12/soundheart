import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'

/** Request browser-notification permission once (no-op if already decided). */
export function ensureNotifyPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    void Notification.requestPermission()
  }
}

/**
 * Polls an unread count and fires a browser notification whenever it increases
 * (after the first fetch). Returns the current unread count for a badge.
 */
export function useUnread(key: string, fn: () => Promise<{ unread: number }>, notifyLabel: string) {
  const { data } = useQuery({ queryKey: [key], queryFn: fn, refetchInterval: 12_000 })
  const count = data?.unread ?? 0
  const prev = useRef<number | null>(null)

  useEffect(() => {
    if (prev.current !== null && count > prev.current) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notifyLabel, { body: 'You have a new message.' })
      }
    }
    prev.current = count
  }, [count, notifyLabel])

  return count
}
