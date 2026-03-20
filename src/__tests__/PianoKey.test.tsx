import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PianoKey } from '../components/PianoKey'

describe('PianoKey', () => {
  it('渲染白键', () => {
    render(<PianoKey note="C4" isBlack={false} onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    const key = screen.getByTestId('piano-key-C4')
    expect(key).toBeInTheDocument()
    expect(key).toHaveClass('piano-key-white')
  })

  it('渲染黑键', () => {
    render(<PianoKey note="C#4" isBlack={true} onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    const key = screen.getByTestId('piano-key-C#4')
    expect(key).toBeInTheDocument()
  })

  it('显示按键标签', () => {
    render(<PianoKey note="C4" isBlack={false} keyLabel="K" onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('鼠标按下触发 onNoteOn', () => {
    const onNoteOn = vi.fn()
    render(<PianoKey note="C4" isBlack={false} onNoteOn={onNoteOn} onNoteOff={vi.fn()} />)
    fireEvent.mouseDown(screen.getByTestId('piano-key-C4'))
    expect(onNoteOn).toHaveBeenCalledWith('C4')
  })

  it('鼠标抬起触发 onNoteOff', () => {
    const onNoteOff = vi.fn()
    render(<PianoKey note="C4" isBlack={false} onNoteOn={vi.fn()} onNoteOff={onNoteOff} />)
    fireEvent.mouseUp(screen.getByTestId('piano-key-C4'))
    expect(onNoteOff).toHaveBeenCalledWith('C4')
  })

  it('isActive 时白键显示按下态样式', () => {
    render(<PianoKey note="C4" isBlack={false} isActive={true} onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    const key = screen.getByTestId('piano-key-C4')
    expect(key).toHaveClass('active')
  })

  it('isHighlighted 时显示引导高亮', () => {
    render(<PianoKey note="C4" isBlack={false} isHighlighted={true} onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    const key = screen.getByTestId('piano-key-C4')
    expect(key).toHaveClass('highlighted')
  })

  it('isError 时显示错误反馈', () => {
    render(<PianoKey note="C4" isBlack={false} isError={true} onNoteOn={vi.fn()} onNoteOff={vi.fn()} />)
    const key = screen.getByTestId('piano-key-C4')
    expect(key).toHaveClass('error')
  })
})
