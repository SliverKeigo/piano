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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col items-center px-4 py-12 md:py-16">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-800">
          Piano
        </h1>
        <p className="mt-1 text-sm text-neutral-400 font-light">
          使用键盘或鼠标弹奏 · 输入简谱自动演奏
        </p>
      </header>

      {/* Controls */}
      <div className="w-full max-w-2xl space-y-4 mb-10">
        <SongInput onLoad={handleLoad} />
        <PlaybackControl
          state={playback.state}
          onPlay={playback.play}
          onPause={playback.pause}
          onStop={playback.stop}
          onToggleMode={playback.toggleMode}
          onSpeedChange={playback.setSpeed}
        />
      </div>

      {/* Piano */}
      <div className="overflow-x-auto max-w-full pb-4">
        <PianoKeyboard
          onNoteOn={handleNoteOn}
          onNoteOff={noteOff}
          activeNotes={activeNotes}
          highlightedNote={highlightedNote}
          errorNote={errorNote}
        />
      </div>

      {/* Footer hint */}
      <p className="mt-8 text-xs text-neutral-300">
        A-J 低八度 · K-V 高八度
      </p>
    </div>
  )
}

export default App
