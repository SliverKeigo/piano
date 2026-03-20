import { describe, it, expect } from 'vitest'
import { keyToNote, noteToKey, ALL_NOTES, isBlackKey } from '../utils/keyboardMapper'

describe('keyboardMapper', () => {
  describe('keyToNote', () => {
    it('将低八度白键映射到正确音符', () => {
      expect(keyToNote('a')).toBe('C3')
      expect(keyToNote('s')).toBe('D3')
      expect(keyToNote('d')).toBe('E3')
      expect(keyToNote('f')).toBe('F3')
      expect(keyToNote('g')).toBe('G3')
      expect(keyToNote('h')).toBe('A3')
      expect(keyToNote('j')).toBe('B3')
    })

    it('将低八度黑键映射到正确音符', () => {
      expect(keyToNote('w')).toBe('C#3')
      expect(keyToNote('e')).toBe('D#3')
      expect(keyToNote('t')).toBe('F#3')
      expect(keyToNote('y')).toBe('G#3')
      expect(keyToNote('u')).toBe('A#3')
    })

    it('将高八度白键映射到正确音符', () => {
      expect(keyToNote('k')).toBe('C4')
      expect(keyToNote('l')).toBe('D4')
      expect(keyToNote(';')).toBe('E4')
      expect(keyToNote("'")).toBe('F4')
      expect(keyToNote('z')).toBe('G4')
      expect(keyToNote('x')).toBe('A4')
      expect(keyToNote('c')).toBe('B4')
      expect(keyToNote('v')).toBe('C5')
    })

    it('将高八度黑键映射到正确音符', () => {
      expect(keyToNote('o')).toBe('C#4')
      expect(keyToNote('p')).toBe('D#4')
      expect(keyToNote(']')).toBe('F#4')
      expect(keyToNote('1')).toBe('G#4')
      expect(keyToNote('2')).toBe('A#4')
    })

    it('大小写不敏感', () => {
      expect(keyToNote('A')).toBe('C3')
      expect(keyToNote('K')).toBe('C4')
    })

    it('未映射的键返回 null', () => {
      expect(keyToNote('q')).toBeNull()
      expect(keyToNote('m')).toBeNull()
      expect(keyToNote(' ')).toBeNull()
    })
  })

  describe('noteToKey', () => {
    it('将音符反向映射到按键', () => {
      expect(noteToKey('C3')).toBe('a')
      expect(noteToKey('C4')).toBe('k')
      expect(noteToKey('C#3')).toBe('w')
    })

    it('超出范围的音符返回 null', () => {
      expect(noteToKey('C2')).toBeNull()
      expect(noteToKey('D5')).toBeNull()
    })
  })

  describe('ALL_NOTES', () => {
    it('包含 25 个音符（C3-C5）', () => {
      expect(ALL_NOTES).toHaveLength(25)
      expect(ALL_NOTES[0]).toBe('C3')
      expect(ALL_NOTES[ALL_NOTES.length - 1]).toBe('C5')
    })
  })

  describe('isBlackKey', () => {
    it('正确识别黑键', () => {
      expect(isBlackKey('C#3')).toBe(true)
      expect(isBlackKey('D#3')).toBe(true)
      expect(isBlackKey('F#4')).toBe(true)
    })

    it('正确识别白键', () => {
      expect(isBlackKey('C3')).toBe(false)
      expect(isBlackKey('D4')).toBe(false)
      expect(isBlackKey('E3')).toBe(false)
    })
  })
})
