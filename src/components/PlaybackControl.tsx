import type { PlaybackState } from '../types'

interface PlaybackControlProps {
  state: PlaybackState
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onToggleMode: () => void
  onSpeedChange: (speed: number) => void
}

const SPEEDS = [0.5, 1, 1.5, 2]

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  )
}

export function PlaybackControl({
  state,
  onPlay,
  onPause,
  onStop,
  onToggleMode,
  onSpeedChange,
}: PlaybackControlProps) {
  const hasNotes = state.notes.length > 0
  const progress = hasNotes
    ? ((state.currentIndex) / state.notes.length) * 100
    : 0

  return (
    <div className="w-full max-w-2xl space-y-3">
      {/* 模式切换 */}
      <div role="tablist" className="flex rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
        <button
          role="tab"
          onClick={state.mode !== 'autoplay' ? onToggleMode : undefined}
          aria-selected={state.mode === 'autoplay'}
          className={`flex-1 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
            state.mode === 'autoplay'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          自动播放
        </button>
        <button
          role="tab"
          onClick={state.mode !== 'guide' ? onToggleMode : undefined}
          aria-selected={state.mode === 'guide'}
          className={`flex-1 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
            state.mode === 'guide'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          引导练习
        </button>
      </div>

      {/* 播放控制 */}
      <div className="flex items-center gap-2">
        {state.status === 'playing' ? (
          <button
            onClick={onPause}
            aria-label="暂停"
            className="w-10 h-10 flex items-center justify-center bg-neutral-800 text-white rounded-full hover:bg-neutral-700 active:bg-neutral-900 transition-colors cursor-pointer shadow-sm"
          >
            <PauseIcon />
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={!hasNotes}
            aria-label="播放"
            className="w-10 h-10 flex items-center justify-center bg-neutral-800 text-white rounded-full hover:bg-neutral-700 active:bg-neutral-900 transition-colors cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlayIcon />
          </button>
        )}

        <button
          onClick={onStop}
          aria-label="停止"
          className="w-10 h-10 flex items-center justify-center border border-neutral-200 text-neutral-500 rounded-full hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-pointer"
        >
          <StopIcon />
        </button>

        {/* 进度条 */}
        {hasNotes && (
          <div className="flex-1 flex items-center gap-3 mx-2">
            <div className="progress-track flex-1 h-1.5">
              <div
                className="progress-fill h-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-neutral-400 font-medium tabular-nums min-w-[3rem] text-right">
              {state.currentIndex + 1} / {state.notes.length}
            </span>
          </div>
        )}

        {/* 速度选择 */}
        <div className="flex gap-1 ml-auto">
          {SPEEDS.map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer ${
                state.speed === s
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
