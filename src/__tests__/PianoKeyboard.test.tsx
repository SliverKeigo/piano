import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PianoKeyboard } from '../components/PianoKeyboard'

// mock audioEngine
vi.mock('../utils/audioEngine', () => ({
  createAudioEngine: () => ({
    playNote: vi.fn(),
    stopNote: vi.fn(),
    playNoteForDuration: vi.fn(),
    ensureStarted: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('PianoKeyboard', () => {
  it('渲染 25 个琴键', () => {
    render(<PianoKeyboard />)
    const allKeys = screen.getAllByTestId(/^piano-key-/)
    expect(allKeys).toHaveLength(25)
  })

  it('渲染 15 个白键', () => {
    render(<PianoKeyboard />)
    const notes = ['C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5']
    notes.forEach(note => {
      expect(screen.getByTestId(`piano-key-${note}`)).toBeInTheDocument()
    })
  })

  it('渲染 10 个黑键', () => {
    render(<PianoKeyboard />)
    const sharps = ['C#3','D#3','F#3','G#3','A#3','C#4','D#4','F#4','G#4','A#4']
    sharps.forEach(note => {
      expect(screen.getByTestId(`piano-key-${note}`)).toBeInTheDocument()
    })
  })

  it('点击琴键触发音符', () => {
    const onNoteOn = vi.fn()
    render(<PianoKeyboard onNoteOn={onNoteOn} />)
    fireEvent.mouseDown(screen.getByTestId('piano-key-C4'))
    expect(onNoteOn).toHaveBeenCalledWith('C4')
  })

  it('键盘按键触发对应琴键', () => {
    const onNoteOn = vi.fn()
    render(<PianoKeyboard onNoteOn={onNoteOn} />)
    fireEvent.keyDown(window, { key: 'a' })
    expect(onNoteOn).toHaveBeenCalledWith('C3')
  })

  it('activeNotes 高亮对应琴键', () => {
    render(<PianoKeyboard activeNotes={new Set(['C4'])} />)
    const key = screen.getByTestId('piano-key-C4')
    expect(key).toHaveClass('active')
  })

  it('highlightedNote 高亮引导音符', () => {
    render(<PianoKeyboard highlightedNote="D4" />)
    const key = screen.getByTestId('piano-key-D4')
    expect(key).toHaveClass('highlighted')
  })
})
