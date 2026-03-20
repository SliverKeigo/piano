import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePlayback } from '../hooks/usePlayback'
import type { ParsedNote } from '../types'

const mockNotes: ParsedNote[] = [
  { note: 'C4', duration: 0.5 },
  { note: 'D4', duration: 0.5 },
  { note: 'E4', duration: 0.5 },
]

describe('usePlayback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('初始状態为 idle', () => {
    const onPlayNote = vi.fn()
    const { result } = renderHook(() => usePlayback(onPlayNote))
    expect(result.current.state.status).toBe('idle')
    expect(result.current.state.mode).toBe('autoplay')
    expect(result.current.state.currentIndex).toBe(0)
  })

  it('loadNotes 加载音符', () => {
    const onPlayNote = vi.fn()
    const { result } = renderHook(() => usePlayback(onPlayNote))
    act(() => result.current.loadNotes(mockNotes))
    expect(result.current.state.notes).toEqual(mockNotes)
  })

  it('切换模式重置进度', () => {
    const onPlayNote = vi.fn()
    const { result } = renderHook(() => usePlayback(onPlayNote))
    act(() => result.current.loadNotes(mockNotes))
    act(() => result.current.toggleMode())
    expect(result.current.state.mode).toBe('guide')
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.status).toBe('idle')
  })

  it('setSpeed 更新速度', () => {
    const onPlayNote = vi.fn()
    const { result } = renderHook(() => usePlayback(onPlayNote))
    act(() => result.current.setSpeed(2))
    expect(result.current.state.speed).toBe(2)
  })

  it('stop 重置到开头', () => {
    const onPlayNote = vi.fn()
    const { result } = renderHook(() => usePlayback(onPlayNote))
    act(() => result.current.loadNotes(mockNotes))
    act(() => result.current.play())
    act(() => result.current.stop())
    expect(result.current.state.status).toBe('idle')
    expect(result.current.state.currentIndex).toBe(0)
  })

  describe('引导模式', () => {
    it('checkGuideNote 正确音符前进', () => {
      const onPlayNote = vi.fn()
      const { result } = renderHook(() => usePlayback(onPlayNote))
      act(() => {
        result.current.loadNotes(mockNotes)
        result.current.toggleMode() // 切换到 guide
        result.current.play()
      })
      act(() => result.current.checkGuideNote('C4'))
      expect(result.current.state.currentIndex).toBe(1)
    })

    it('checkGuideNote 错误音符不前进', () => {
      const onPlayNote = vi.fn()
      const { result } = renderHook(() => usePlayback(onPlayNote))
      act(() => {
        result.current.loadNotes(mockNotes)
        result.current.toggleMode()
        result.current.play()
      })
      act(() => result.current.checkGuideNote('D4'))
      expect(result.current.state.currentIndex).toBe(0)
    })
  })
})
