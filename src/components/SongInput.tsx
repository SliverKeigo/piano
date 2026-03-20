import { useState } from 'react'
import { parseNotation } from '../utils/noteParser'
import { PRESET_SONGS } from '../data/presetSongs'
import type { ParsedNote } from '../types'

interface SongInputProps {
  onLoad: (notes: ParsedNote[]) => void
}

export function SongInput({ onLoad }: SongInputProps) {
  const [text, setText] = useState('')

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const song = PRESET_SONGS.find(s => s.title === e.target.value)
    if (song) {
      setText(song.notation)
    }
  }

  const handleLoad = () => {
    if (!text.trim()) return
    const notes = parseNotation(text)
    if (notes.length > 0) {
      onLoad(notes)
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-3">
      <select
        onChange={handlePresetChange}
        defaultValue=""
        className="w-full p-2 border border-gray-300 rounded bg-white text-[#666666]"
      >
        <option value="" disabled>选择预设歌曲...</option>
        {PRESET_SONGS.map(song => (
          <option key={song.title} value={song.title}>{song.title}</option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入简谱，如：1 1 5 5 6 6 5-- | 4 4 3 3 2 2 1--"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded bg-white text-[#666666] resize-none focus:outline-none focus:border-gray-400"
      />

      <button
        onClick={handleLoad}
        className="px-6 py-2 bg-[#4A4A4A] text-white rounded hover:bg-[#333333] transition-colors"
      >
        加载
      </button>
    </div>
  )
}
