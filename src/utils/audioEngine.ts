import * as Tone from 'tone'

export interface AudioEngine {
  playNote: (note: string | null) => void
  stopNote: (note: string | null) => void
  playNoteForDuration: (note: string | null, duration: number) => void
  ensureStarted: () => Promise<void>
}

export function createAudioEngine(): AudioEngine {
  const sampler = new Tone.Sampler({
    urls: {
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
    },
    release: 1,
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  }).toDestination()

  return {
    playNote(note) {
      if (!note) return
      sampler.triggerAttack(note)
    },

    stopNote(note) {
      if (!note) return
      sampler.triggerRelease(note)
    },

    playNoteForDuration(note, duration) {
      if (!note) return
      sampler.triggerAttackRelease(note, duration)
    },

    async ensureStarted() {
      if (Tone.getContext().state !== 'running') {
        await Tone.start()
      }
    },
  }
}
