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

  // Separate white and black keys
  const whiteNotes = ALL_NOTES.filter(note => !isBlackKey(note))
  const blackNotes = ALL_NOTES.filter(note => isBlackKey(note))

  // Build a map from note to its preceding white key index for black key positioning
  // For each black key, find how many white keys come before it
  const getBlackKeyPosition = (blackNote: string): number => {
    // Find the index of this black note in ALL_NOTES
    const noteIndex = ALL_NOTES.indexOf(blackNote)
    // Count white keys before this note
    let whiteCount = 0
    for (let i = 0; i < noteIndex; i++) {
      if (!isBlackKey(ALL_NOTES[i])) {
        whiteCount++
      }
    }
    return whiteCount
  }

  // White key width: w-12 = 48px, Black key width: w-8 = 32px
  // Black key left = whiteKeyIndex * 48 - 32/2 + 48/2 = whiteKeyIndex * 48 + 8
  // More precisely: positioned so black key center aligns with the gap between two white keys
  // left = whiteCount * 48 - 16  (center of black key at boundary of previous white key)

  return (
    <div className="relative inline-flex">
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

      {/* Black keys - absolutely positioned */}
      {blackNotes.map(note => {
        const whiteKeyIndex = getBlackKeyPosition(note)
        // left = whiteKeyIndex * 48px (white key width) - 16px (half of black key width)
        const leftPx = whiteKeyIndex * 48 - 16
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
            style={{ position: 'absolute', left: `${leftPx}px`, top: 0 }}
          />
        )
      })}
    </div>
  )
}
