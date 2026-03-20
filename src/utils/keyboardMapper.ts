const KEY_TO_NOTE_MAP: Record<string, string> = {
  // 低八度 C3-B3（下两行：Z行白键 + A行黑键）
  'z': 'C3',  's': 'C#3',
  'x': 'D3',  'd': 'D#3',
  'c': 'E3',
  'v': 'F3',  'g': 'F#3',
  'b': 'G3',  'h': 'G#3',
  'n': 'A3',  'j': 'A#3',
  'm': 'B3',
  // 高八度 C4-C5（上两行：Q行白键 + 数字行黑键）
  'q': 'C4',  '2': 'C#4',
  'w': 'D4',  '3': 'D#4',
  'e': 'E4',
  'r': 'F4',  '5': 'F#4',
  't': 'G4',  '6': 'G#4',
  'y': 'A4',  '7': 'A#4',
  'u': 'B4',
  'i': 'C5',
}

const NOTE_TO_KEY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_TO_NOTE_MAP).map(([k, v]) => [v, k])
)

export const ALL_NOTES: string[] = [
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3',
  'G3', 'G#3', 'A3', 'A#3', 'B3',
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4',
  'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5',
]

export function keyToNote(key: string): string | null {
  return KEY_TO_NOTE_MAP[key.toLowerCase()] ?? null
}

export function noteToKey(note: string): string | null {
  return NOTE_TO_KEY_MAP[note] ?? null
}

export function isBlackKey(note: string): boolean {
  return note.includes('#')
}
