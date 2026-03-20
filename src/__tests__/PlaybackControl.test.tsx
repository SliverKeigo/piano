import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlaybackControl } from '../components/PlaybackControl'
import type { PlaybackState } from '../types'

const defaultState: PlaybackState = {
  mode: 'autoplay',
  status: 'idle',
  currentIndex: 0,
  speed: 1,
  notes: [{ note: 'C4', duration: 0.5 }, { note: 'D4', duration: 0.5 }],
}

describe('PlaybackControl', () => {
  it('显示模式切换按钮', () => {
    render(<PlaybackControl state={defaultState} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={vi.fn()} />)
    expect(screen.getByText(/自动播放/)).toBeInTheDocument()
  })

  it('切换模式', async () => {
    const user = userEvent.setup()
    const onToggleMode = vi.fn()
    render(<PlaybackControl state={defaultState} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={onToggleMode} onSpeedChange={vi.fn()} />)
    await user.click(screen.getByText(/引导练习/))
    expect(onToggleMode).toHaveBeenCalled()
  })

  it('显示播放按钮（idle 状态）', () => {
    render(<PlaybackControl state={defaultState} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /播放/ })).toBeInTheDocument()
  })

  it('播放中显示暂停按钮', () => {
    const playing = { ...defaultState, status: 'playing' as const }
    render(<PlaybackControl state={playing} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /暂停/ })).toBeInTheDocument()
  })

  it('显示进度', () => {
    const state = { ...defaultState, currentIndex: 1, status: 'playing' as const }
    render(<PlaybackControl state={state} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={vi.fn()} />)
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
  })

  it('没有音符时禁用播放按钮', () => {
    const empty = { ...defaultState, notes: [] }
    render(<PlaybackControl state={empty} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /播放/ })).toBeDisabled()
  })

  it('速度选择器改变速度', async () => {
    const user = userEvent.setup()
    const onSpeedChange = vi.fn()
    render(<PlaybackControl state={defaultState} onPlay={vi.fn()} onPause={vi.fn()} onStop={vi.fn()} onToggleMode={vi.fn()} onSpeedChange={onSpeedChange} />)
    await user.click(screen.getByText('2x'))
    expect(onSpeedChange).toHaveBeenCalledWith(2)
  })
})
