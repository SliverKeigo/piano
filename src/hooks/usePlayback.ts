import { useState, useCallback, useRef, useEffect } from 'react'
import type { ParsedNote, PlaybackState } from '../types'

const INITIAL_STATE: PlaybackState = {
  mode: 'autoplay',
  status: 'idle',
  currentIndex: 0,
  speed: 1,
  notes: [],
}

export function usePlayback(onPlayNote: (note: string | null, duration: number) => void) {
  const [state, setState] = useState<PlaybackState>(INITIAL_STATE)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const loadNotes = useCallback((notes: ParsedNote[]) => {
    clearTimer()
    setState(prev => ({ ...prev, notes, currentIndex: 0, status: 'idle' }))
  }, [clearTimer])

  const scheduleNext = useCallback(() => {
    const s = stateRef.current
    if (s.status !== 'playing' || s.mode !== 'autoplay') return
    if (s.currentIndex >= s.notes.length) {
      setState(prev => ({ ...prev, status: 'idle', currentIndex: 0 }))
      return
    }

    const currentNote = s.notes[s.currentIndex]
    onPlayNote(currentNote.note, currentNote.duration / s.speed)

    timerRef.current = setTimeout(() => {
      setState(prev => {
        const nextIndex = prev.currentIndex + 1
        if (nextIndex >= prev.notes.length) {
          return { ...prev, status: 'idle', currentIndex: 0 }
        }
        return { ...prev, currentIndex: nextIndex }
      })
    }, (currentNote.duration / s.speed) * 1000)
  }, [onPlayNote])

  useEffect(() => {
    if (state.status === 'playing' && state.mode === 'autoplay') {
      scheduleNext()
    }
    return clearTimer
  }, [state.status, state.currentIndex, state.mode, scheduleNext, clearTimer])

  const play = useCallback(() => {
    setState(prev => ({ ...prev, status: 'playing' }))
  }, [])

  const pause = useCallback(() => {
    clearTimer()
    setState(prev => ({ ...prev, status: 'paused' }))
  }, [clearTimer])

  const stop = useCallback(() => {
    clearTimer()
    setState(prev => ({ ...prev, status: 'idle', currentIndex: 0 }))
  }, [clearTimer])

  const toggleMode = useCallback(() => {
    clearTimer()
    setState(prev => ({
      ...prev,
      mode: prev.mode === 'autoplay' ? 'guide' : 'autoplay',
      status: 'idle',
      currentIndex: 0,
    }))
  }, [clearTimer])

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }))
  }, [])

  const checkGuideNote = useCallback((note: string): boolean => {
    const s = stateRef.current
    if (s.mode !== 'guide' || s.status !== 'playing') return false
    if (s.currentIndex >= s.notes.length) return false

    const expected = s.notes[s.currentIndex]
    if (expected.note === note) {
      onPlayNote(note, expected.duration)
      setState(prev => {
        const nextIndex = prev.currentIndex + 1
        if (nextIndex >= prev.notes.length) {
          return { ...prev, status: 'idle', currentIndex: 0 }
        }
        return { ...prev, currentIndex: nextIndex }
      })
      return true
    }
    return false
  }, [onPlayNote])

  return {
    state,
    loadNotes,
    play,
    pause,
    stop,
    toggleMode,
    setSpeed,
    checkGuideNote,
  }
}
