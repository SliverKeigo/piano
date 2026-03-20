import { useState, useCallback } from 'react'
import { PianoKeyboard } from './components/PianoKeyboard'
import { SongInput } from './components/SongInput'
import { PlaybackControl } from './components/PlaybackControl'
import { usePiano } from './hooks/usePiano'
import { usePlayback } from './hooks/usePlayback'
import type { ParsedNote } from './types'

function App() {
  const { activeNotes, noteOn, noteOff, playNoteForDuration } = usePiano()
  const playback = usePlayback(playNoteForDuration)
  const [errorNote, setErrorNote] = useState<string | null>(null)

  const handleNoteOn = useCallback((note: string) => {
    if (playback.state.mode === 'guide' && playback.state.status === 'playing') {
      const correct = playback.checkGuideNote(note)
      if (!correct) {
        setErrorNote(note)
        setTimeout(() => setErrorNote(null), 300)
      }
    }
    noteOn(note)
  }, [noteOn, playback])

  const handleLoad = useCallback((notes: ParsedNote[]) => {
    playback.loadNotes(notes)
  }, [playback])

  const highlightedNote = playback.state.status !== 'idle'
    ? playback.state.notes[playback.state.currentIndex]?.note ?? null
    : null

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center gap-8 py-12">
      <h1 className="text-3xl font-light text-[#666666]">Piano Keyboard</h1>

      <SongInput onLoad={handleLoad} />

      <PlaybackControl
        state={playback.state}
        onPlay={playback.play}
        onPause={playback.pause}
        onStop={playback.stop}
        onToggleMode={playback.toggleMode}
        onSpeedChange={playback.setSpeed}
      />

      <PianoKeyboard
        onNoteOn={handleNoteOn}
        onNoteOff={noteOff}
        activeNotes={activeNotes}
        highlightedNote={highlightedNote}
        errorNote={errorNote}
      />
    </div>
  )
}

export default App
