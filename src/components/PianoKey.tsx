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
  const stateClass = isError
    ? 'error'
    : isHighlighted
      ? 'highlighted'
      : isActive
        ? 'active'
        : ''

  const baseClass = isBlack ? 'piano-key-black' : 'piano-key-white'

  const sizeClass = isBlack
    ? 'w-[30px] h-32 z-10 rounded-b-lg'
    : 'w-[52px] h-52 rounded-b-lg'

  return (
    <div
      data-testid={`piano-key-${note}`}
      className={`${baseClass} ${stateClass} ${sizeClass} cursor-pointer select-none flex flex-col justify-end items-center pb-2`}
      style={style}
      onMouseDown={() => onNoteOn(note)}
      onMouseUp={() => onNoteOff(note)}
      onMouseLeave={() => onNoteOff(note)}
    >
      {keyLabel && (
        <span className={`text-[10px] font-medium uppercase tracking-wide ${
          isBlack ? 'text-neutral-400' : 'text-neutral-400'
        }`}>
          {keyLabel}
        </span>
      )}
    </div>
  )
}
