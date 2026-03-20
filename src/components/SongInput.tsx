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
      <div className="flex gap-3">
        <select
          onChange={handlePresetChange}
          defaultValue=""
          className="flex-1 px-3 py-2.5 border border-neutral-200 rounded-lg bg-white text-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent cursor-pointer transition-shadow"
        >
          <option value="" disabled>选择预设歌曲...</option>
          {PRESET_SONGS.map(song => (
            <option key={song.title} value={song.title}>{song.title}</option>
          ))}
        </select>

        <button
          onClick={handleLoad}
          disabled={!text.trim()}
          className="px-5 py-2.5 bg-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 active:bg-neutral-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          加载
        </button>
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入简谱，如：1 1 5 5 6 6 5-- | 4 4 3 3 2 2 1--"
        rows={2}
        className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-white text-neutral-700 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent placeholder:text-neutral-300 transition-shadow"
      />
    </div>
  )
}
