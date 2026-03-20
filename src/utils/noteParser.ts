import type { ParsedNote } from '../types'

const NUMBER_TO_NOTE: Record<string, string> = {
  '1': 'C', '2': 'D', '3': 'E', '4': 'F',
  '5': 'G', '6': 'A', '7': 'B',
}

const FLAT_TO_SHARP: Record<string, string> = {
  'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#',
  'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B',
}

const DEFAULT_OCTAVE = 4
const DEFAULT_DURATION = 0.5

function parseToken(token: string): ParsedNote[] {
  // 八分音符：3_4
  if (token.includes('_')) {
    const parts = token.split('_')
    return parts.flatMap(p => {
      const notes = parseSingleToken(p)
      return notes.map(n => ({ ...n, duration: 0.25 }))
    })
  }

  // 全音符：1---
  if (token.endsWith('---')) {
    const base = token.slice(0, -3)
    const notes = parseSingleToken(base)
    return notes.map(n => ({ ...n, duration: 2.0 }))
  }

  // 二分音符：5--
  if (token.endsWith('--')) {
    const base = token.slice(0, -2)
    const notes = parseSingleToken(base)
    return notes.map(n => ({ ...n, duration: 1.0 }))
  }

  return parseSingleToken(token)
}

function parseSingleToken(token: string): ParsedNote[] {
  if (!token) return []

  // 休止符
  if (token === '0' || token === '-') {
    return [{ note: null, duration: DEFAULT_DURATION }]
  }

  // 高八度数字简谱：1.
  if (/^[1-7]\.$/.test(token)) {
    const noteName = NUMBER_TO_NOTE[token[0]]
    return [{ note: `${noteName}${DEFAULT_OCTAVE + 1}`, duration: DEFAULT_DURATION }]
  }

  // 低八度数字简谱：.1
  if (/^\.[1-7]$/.test(token)) {
    const noteName = NUMBER_TO_NOTE[token[1]]
    return [{ note: `${noteName}${DEFAULT_OCTAVE - 1}`, duration: DEFAULT_DURATION }]
  }

  // 普通数字简谱：1-7
  if (/^[1-7]$/.test(token)) {
    const noteName = NUMBER_TO_NOTE[token]
    return [{ note: `${noteName}${DEFAULT_OCTAVE}`, duration: DEFAULT_DURATION }]
  }

  // 字母音名带八度：C3, C#4, Db3
  const letterMatch = token.match(/^([A-Ga-g])(#|b)?(\d)?$/)
  if (letterMatch) {
    let noteName = letterMatch[1].toUpperCase()
    const accidental = letterMatch[2] || ''
    const octave = letterMatch[3] ? parseInt(letterMatch[3]) : DEFAULT_OCTAVE

    if (accidental === 'b') {
      const flat = `${noteName}b`
      noteName = FLAT_TO_SHARP[flat] || noteName
      return [{ note: `${noteName}${octave}`, duration: DEFAULT_DURATION }]
    }

    return [{ note: `${noteName}${accidental}${octave}`, duration: DEFAULT_DURATION }]
  }

  return []
}

export function parseNotation(input: string): ParsedNote[] {
  if (!input.trim()) return []

  const cleaned = input.replace(/\|/g, ' ')
  const tokens = cleaned.split(/\s+/).filter(Boolean)

  return tokens.flatMap(parseToken)
}
