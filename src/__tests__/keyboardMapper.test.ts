import { describe, it, expect } from 'vitest'
import { keyToNote, noteToKey, ALL_NOTES, isBlackKey } from '../utils/keyboardMapper'

describe('keyboardMapper', () => {
  describe('keyToNote', () => {
    it('将低八度白键映射到正确音符', () => {
      expect(keyToNote('z')).toBe('C3')
      expect(keyToNote('x')).toBe('D3')
      expect(keyToNote('c')).toBe('E3')
      expect(keyToNote('v')).toBe('F3')
      expect(keyToNote('b')).toBe('G3')
      expect(keyToNote('n')).toBe('A3')
      expect(keyToNote('m')).toBe('B3')
    })

    it('将低八度黑键映射到正确音符', () => {
      expect(keyToNote('s')).toBe('C#3')
      expect(keyToNote('d')).toBe('D#3')
      expect(keyToNote('g')).toBe('F#3')
      expect(keyToNote('h')).toBe('G#3')
      expect(keyToNote('j')).toBe('A#3')
    })

    it('将高八度白键映射到正确音符', () => {
      expect(keyToNote('q')).toBe('C4')
      expect(keyToNote('w')).toBe('D4')
      expect(keyToNote('e')).toBe('E4')
      expect(keyToNote('r')).toBe('F4')
      expect(keyToNote('t')).toBe('G4')
      expect(keyToNote('y')).toBe('A4')
      expect(keyToNote('u')).toBe('B4')
      expect(keyToNote('i')).toBe('C5')
    })

    it('将高八度黑键映射到正确音符', () => {
      expect(keyToNote('2')).toBe('C#4')
      expect(keyToNote('3')).toBe('D#4')
      expect(keyToNote('5')).toBe('F#4')
      expect(keyToNote('6')).toBe('G#4')
      expect(keyToNote('7')).toBe('A#4')
    })

    it('大小写不敏感', () => {
      expect(keyToNote('Z')).toBe('C3')
      expect(keyToNote('Q')).toBe('C4')
    })

    it('未映射的键返回 null', () => {
      expect(keyToNote('a')).toBeNull()
      expect(keyToNote('l')).toBeNull()
      expect(keyToNote(' ')).toBeNull()
    })
  })

  describe('noteToKey', () => {
    it('将音符反向映射到按键', () => {
      expect(noteToKey('C3')).toBe('z')
      expect(noteToKey('C4')).toBe('q')
      expect(noteToKey('C#3')).toBe('s')
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
