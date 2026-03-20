export interface ParsedNote {
  note: string | null;  // "C4", "D#3", null=休止符
  duration: number;      // 秒
}

export interface Song {
  title: string;
  notation: string;
  notes: ParsedNote[];
}

export interface PlaybackState {
  mode: 'autoplay' | 'guide';
  status: 'idle' | 'playing' | 'paused';
  currentIndex: number;
  speed: number;
  notes: ParsedNote[];
}
