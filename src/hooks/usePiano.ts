import { useCallback, useRef, useState } from 'react'
import { createAudioEngine, type AudioEngine } from '../utils/audioEngine'

export function usePiano() {
  const engineRef = useRef<AudioEngine | null>(null)
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set())

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = createAudioEngine()
    }
    return engineRef.current
  }, [])

  const noteOn = useCallback(async (note: string) => {
    const engine = getEngine()
    await engine.ensureStarted()
    engine.playNote(note)
    setActiveNotes(prev => new Set(prev).add(note))
  }, [getEngine])

  const noteOff = useCallback((note: string) => {
    const engine = getEngine()
    engine.stopNote(note)
    setActiveNotes(prev => {
      const next = new Set(prev)
      next.delete(note)
      return next
    })
  }, [getEngine])

  const playNoteForDuration = useCallback(async (note: string | null, duration: number) => {
    if (!note) return
    const engine = getEngine()
    await engine.ensureStarted()
    engine.playNoteForDuration(note, duration)
    setActiveNotes(prev => new Set(prev).add(note))
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev)
        next.delete(note)
        return next
      })
    }, duration * 1000)
  }, [getEngine])

  return { activeNotes, noteOn, noteOff, playNoteForDuration }
}
