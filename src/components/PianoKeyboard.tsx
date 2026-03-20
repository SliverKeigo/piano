import { useCallback } from 'react'
import { PianoKey } from './PianoKey'
import { ALL_NOTES, isBlackKey, noteToKey } from '../utils/keyboardMapper'
import { useKeyboard } from '../hooks/useKeyboard'

interface PianoKeyboardProps {
  onNoteOn?: (note: string) => void
  onNoteOff?: (note: string) => void
  activeNotes?: Set<string>
  highlightedNote?: string | null
  errorNote?: string | null
}

const WHITE_KEY_WIDTH = 52
const BLACK_KEY_WIDTH = 30

export function PianoKeyboard({
  onNoteOn,
  onNoteOff,
  activeNotes = new Set(),
  highlightedNote = null,
  errorNote = null,
}: PianoKeyboardProps) {
  const handleNoteOn = useCallback((note: string) => {
    onNoteOn?.(note)
  }, [onNoteOn])

  const handleNoteOff = useCallback((note: string) => {
    onNoteOff?.(note)
  }, [onNoteOff])

  const keyboardActiveNotes = useKeyboard(handleNoteOn, handleNoteOff)
  const mergedActiveNotes = new Set([...activeNotes, ...keyboardActiveNotes])

  const whiteNotes = ALL_NOTES.filter(note => !isBlackKey(note))
  const blackNotes = ALL_NOTES.filter(note => isBlackKey(note))

  const getBlackKeyPosition = (blackNote: string): number => {
    const noteIndex = ALL_NOTES.indexOf(blackNote)
    let whiteCount = 0
    for (let i = 0; i < noteIndex; i++) {
      if (!isBlackKey(ALL_NOTES[i])) {
        whiteCount++
      }
    }
    return whiteCount
  }

  return (
    <div className="relative inline-flex rounded-b-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-gradient-to-b from-neutral-800 to-neutral-900 pt-3 px-1 pb-0">
      {/* White keys */}
      {whiteNotes.map(note => (
        <PianoKey
          key={note}
          note={note}
          isBlack={false}
          isActive={mergedActiveNotes.has(note)}
          isHighlighted={highlightedNote === note}
          isError={errorNote === note}
          keyLabel={noteToKey(note) ?? undefined}
          onNoteOn={handleNoteOn}
          onNoteOff={handleNoteOff}
        />
      ))}

      {/* Black keys */}
      {blackNotes.map(note => {
        const whiteKeyIndex = getBlackKeyPosition(note)
        const leftPx = whiteKeyIndex * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2 + 4
        return (
          <PianoKey
            key={note}
            note={note}
            isBlack={true}
            isActive={mergedActiveNotes.has(note)}
            isHighlighted={highlightedNote === note}
            isError={errorNote === note}
            keyLabel={noteToKey(note) ?? undefined}
            onNoteOn={handleNoteOn}
            onNoteOff={handleNoteOff}
            style={{ position: 'absolute', left: `${leftPx}px`, top: '12px' }}
          />
        )
      })}
    </div>
  )
}
