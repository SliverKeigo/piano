import type { Song } from '../types'
import { parseNotation } from '../utils/noteParser'

interface PresetSongDef {
  title: string
  notation: string
}

const SONG_DEFS: PresetSongDef[] = [
  {
    title: '小星星',
    notation: '1 1 5 5 6 6 5-- | 4 4 3 3 2 2 1-- | 5 5 4 4 3 3 2-- | 5 5 4 4 3 3 2-- | 1 1 5 5 6 6 5-- | 4 4 3 3 2 2 1--',
  },
  {
    title: '欢乐颂',
    notation: '3 3 4 5 5 4 3 2 | 1 1 2 3 3-- 2 2-- | 3 3 4 5 5 4 3 2 | 1 1 2 3 2-- 1 1--',
  },
  {
    title: '生日快乐',
    notation: '5_5 6 5 1. 7-- | 5_5 6 5 2. 1.-- | 5_5 5. 3. 1. 7 6 | 4._4. 3. 1. 2. 1.--',
  },
  {
    title: '两只老虎',
    notation: '1 2 3 1 | 1 2 3 1 | 3 4 5-- | 3 4 5-- | 5_6 5_4 3 1 | 5_6 5_4 3 1 | 1 .5 1-- | 1 .5 1--',
  },
  {
    title: '卡农（简化版）',
    notation: '5 3 4 5 3 4 | 5 .5 .6 .7 1 2 3 4 | 3 1 2 3 1 2 | 3 .3 .4 .5 .6 .7 1 2',
  },
]

export const PRESET_SONGS: Song[] = SONG_DEFS.map(def => ({
  title: def.title,
  notation: def.notation,
  notes: parseNotation(def.notation),
}))
