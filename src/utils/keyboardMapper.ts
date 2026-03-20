const KEY_TO_NOTE_MAP: Record<string, string> = {
  // 低八度 C3-B3
  'a': 'C3',  'w': 'C#3',
  's': 'D3',  'e': 'D#3',
  'd': 'E3',
  'f': 'F3',  't': 'F#3',
  'g': 'G3',  'y': 'G#3',
  'h': 'A3',  'u': 'A#3',
  'j': 'B3',
  // 高八度 C4-C5
  'k': 'C4',  'o': 'C#4',
  'l': 'D4',  'p': 'D#4',
  ';': 'E4',
  "'": 'F4',  ']': 'F#4',
  'z': 'G4',  '1': 'G#4',
  'x': 'A4',  '2': 'A#4',
  'c': 'B4',
  'v': 'C5',
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
