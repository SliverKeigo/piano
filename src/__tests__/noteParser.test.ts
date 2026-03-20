import { describe, it, expect } from 'vitest'
import { parseNotation } from '../utils/noteParser'
import type { ParsedNote } from '../types'

describe('noteParser', () => {
  describe('数字简谱解析', () => {
    it('解析基本数字简谱（默认 C4 八度）', () => {
      const result = parseNotation('1 2 3')
      expect(result).toEqual([
        { note: 'C4', duration: 0.5 },
        { note: 'D4', duration: 0.5 },
        { note: 'E4', duration: 0.5 },
      ])
    })

    it('解析所有 7 个音', () => {
      const result = parseNotation('1 2 3 4 5 6 7')
      expect(result.map(n => n.note)).toEqual([
        'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
      ])
    })

    it('解析高八度标记 (1.)', () => {
      const result = parseNotation('1.')
      expect(result).toEqual([{ note: 'C5', duration: 0.5 }])
    })

    it('解析低八度标记 (.1)', () => {
      const result = parseNotation('.1')
      expect(result).toEqual([{ note: 'C3', duration: 0.5 }])
    })
  })

  describe('字母音名解析', () => {
    it('解析字母音名', () => {
      const result = parseNotation('C D E')
      expect(result).toEqual([
        { note: 'C4', duration: 0.5 },
        { note: 'D4', duration: 0.5 },
        { note: 'E4', duration: 0.5 },
      ])
    })

    it('解析带升号的音名', () => {
      const result = parseNotation('C# F#')
      expect(result).toEqual([
        { note: 'C#4', duration: 0.5 },
        { note: 'F#4', duration: 0.5 },
      ])
    })

    it('解析带降号的音名（转换为升号）', () => {
      const result = parseNotation('Db')
      expect(result).toEqual([{ note: 'C#4', duration: 0.5 }])
    })

    it('解析带八度数字的音名', () => {
      const result = parseNotation('C3 G3 C4')
      expect(result).toEqual([
        { note: 'C3', duration: 0.5 },
        { note: 'G3', duration: 0.5 },
        { note: 'C4', duration: 0.5 },
      ])
    })
  })

  describe('休止符', () => {
    it('解析 0 为休止符', () => {
      const result = parseNotation('1 0 3')
      expect(result[1]).toEqual({ note: null, duration: 0.5 })
    })

    it('解析独立的 - 为休止符', () => {
      const result = parseNotation('1 - 3')
      expect(result[1]).toEqual({ note: null, duration: 0.5 })
    })
  })

  describe('时值标记', () => {
    it('解析 _ 连接的八分音符', () => {
      const result = parseNotation('3_4')
      expect(result).toEqual([
        { note: 'E4', duration: 0.25 },
        { note: 'F4', duration: 0.25 },
      ])
    })

    it('解析 -- 二分音符', () => {
      const result = parseNotation('5--')
      expect(result).toEqual([{ note: 'G4', duration: 1.0 }])
    })

    it('解析 --- 全音符', () => {
      const result = parseNotation('1---')
      expect(result).toEqual([{ note: 'C4', duration: 2.0 }])
    })
  })

  describe('小节线', () => {
    it('忽略小节线 |', () => {
      const result = parseNotation('1 2 | 3 4')
      expect(result).toHaveLength(4)
      expect(result.map(n => n.note)).toEqual(['C4', 'D4', 'E4', 'F4'])
    })
  })

  describe('边界情况', () => {
    it('空字符串返回空数组', () => {
      expect(parseNotation('')).toEqual([])
    })

    it('纯空白返回空数组', () => {
      expect(parseNotation('   ')).toEqual([])
    })

    it('忽略无法识别的 token', () => {
      const result = parseNotation('1 xyz 3')
      expect(result).toHaveLength(2)
    })
  })
})
