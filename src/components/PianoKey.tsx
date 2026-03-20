import type { CSSProperties } from 'react'

interface PianoKeyProps {
  note: string
  isBlack: boolean
  isActive?: boolean
  isHighlighted?: boolean
  isError?: boolean
  keyLabel?: string
  onNoteOn: (note: string) => void
  onNoteOff: (note: string) => void
  style?: CSSProperties
}

export function PianoKey({
  note,
  isBlack,
  isActive = false,
  isHighlighted = false,
  isError = false,
  keyLabel,
  onNoteOn,
  onNoteOff,
  style,
}: PianoKeyProps) {
  const getClassName = () => {
    const base = isBlack
      ? 'w-8 h-32 z-10 -mx-4 rounded-b-md border border-gray-600'
      : 'w-12 h-48 rounded-b-md border border-gray-300'

    let color: string
    if (isError) {
      color = 'bg-[#333333]'
    } else if (isHighlighted) {
      color = 'bg-[#B0B0B0] animate-pulse'
    } else if (isActive) {
      color = isBlack ? 'bg-[#2A2A2A]' : 'bg-[#E0E0E0]'
    } else {
      color = isBlack ? 'bg-[#4A4A4A]' : 'bg-white'
    }

    return `${base} ${color} cursor-pointer select-none flex flex-col justify-end items-center pb-2 transition-colors duration-75`
  }

  return (
    <div
      data-testid={`piano-key-${note}`}
      className={getClassName()}
      style={style}
      onMouseDown={() => onNoteOn(note)}
      onMouseUp={() => onNoteOff(note)}
      onMouseLeave={() => onNoteOff(note)}
    >
      {keyLabel && (
        <span className={`text-xs ${isBlack ? 'text-gray-300' : 'text-[#666666]'}`}>
          {keyLabel}
        </span>
      )}
    </div>
  )
}
