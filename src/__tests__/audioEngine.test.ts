import { describe, it, expect, vi, beforeEach } from 'vitest'

// mock Tone.js
vi.mock('tone', () => {
  const mockSampler = {
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
    triggerAttackRelease: vi.fn(),
    toDestination: vi.fn().mockReturnThis(),
    loaded: true,
  }
  return {
    Sampler: vi.fn(() => mockSampler),
    start: vi.fn(),
    getContext: vi.fn(() => ({ state: 'running' })),
  }
})

import { createAudioEngine, type AudioEngine } from '../utils/audioEngine'
import { Sampler } from 'tone'

describe('audioEngine', () => {
  let engine: AudioEngine

  beforeEach(() => {
    vi.clearAllMocks()
    engine = createAudioEngine()
  })

  it('创建 Tone.js Sampler 实例', () => {
    expect(Sampler).toHaveBeenCalled()
  })

  it('playNote 调用 triggerAttack', () => {
    engine.playNote('C4')
    const sampler = (Sampler as any).mock.results[0].value
    expect(sampler.triggerAttack).toHaveBeenCalledWith('C4')
  })

  it('stopNote 调用 triggerRelease', () => {
    engine.stopNote('C4')
    const sampler = (Sampler as any).mock.results[0].value
    expect(sampler.triggerRelease).toHaveBeenCalledWith('C4')
  })

  it('playNoteForDuration 调用 triggerAttackRelease', () => {
    engine.playNoteForDuration('C4', 0.5)
    const sampler = (Sampler as any).mock.results[0].value
    expect(sampler.triggerAttackRelease).toHaveBeenCalledWith('C4', 0.5)
  })

  it('休止符（null）不触发任何音频', () => {
    engine.playNote(null)
    const sampler = (Sampler as any).mock.results[0].value
    expect(sampler.triggerAttack).not.toHaveBeenCalled()
  })
})
