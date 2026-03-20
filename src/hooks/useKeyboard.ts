import { useState, useEffect, useCallback } from 'react'
import { keyToNote } from '../utils/keyboardMapper'

export function useKeyboard(
  onNoteOn: (note: string) => void,
  onNoteOff: (note: string) => void
) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return
    const note = keyToNote(e.key)
    if (!note) return
    e.preventDefault()
    setActiveKeys(prev => new Set(prev).add(note))
    onNoteOn(note)
  }, [onNoteOn])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const note = keyToNote(e.key)
    if (!note) return
    e.preventDefault()
    setActiveKeys(prev => {
      const next = new Set(prev)
      next.delete(note)
      return next
    })
    onNoteOff(note)
  }, [onNoteOff])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return activeKeys
}
