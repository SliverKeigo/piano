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

export function PlaybackControl({
  state,
  onPlay,
  onPause,
  onStop,
  onToggleMode,
  onSpeedChange,
}: PlaybackControlProps) {
  const hasNotes = state.notes.length > 0

  return (
    <div className="w-full max-w-2xl space-y-3">
      {/* 模式切换 */}
      <div role="tablist" className="flex rounded overflow-hidden border border-gray-300">
        <button
          role="tab"
          onClick={state.mode !== 'autoplay' ? onToggleMode : undefined}
          aria-selected={state.mode === 'autoplay'}
          className={`flex-1 py-2 text-sm transition-colors ${
            state.mode === 'autoplay'
              ? 'bg-[#4A4A4A] text-white'
              : 'bg-white text-[#666666] hover:bg-gray-100'
          }`}
        >
          自动播放
        </button>
        <button
          role="tab"
          onClick={state.mode !== 'guide' ? onToggleMode : undefined}
          aria-selected={state.mode === 'guide'}
          className={`flex-1 py-2 text-sm transition-colors ${
            state.mode === 'guide'
              ? 'bg-[#4A4A4A] text-white'
              : 'bg-white text-[#666666] hover:bg-gray-100'
          }`}
        >
          引导练习
        </button>
      </div>

      {/* 播放控制 */}
      <div className="flex items-center gap-3">
        {state.status === 'playing' ? (
          <button
            onClick={onPause}
            aria-label="暂停"
            className="px-4 py-2 bg-[#4A4A4A] text-white rounded hover:bg-[#333333] transition-colors"
          >
            暂停
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={!hasNotes}
            aria-label="播放"
            className="px-4 py-2 bg-[#4A4A4A] text-white rounded hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            播放
          </button>
        )}

        <button
          onClick={onStop}
          aria-label="停止"
          className="px-4 py-2 border border-gray-300 text-[#666666] rounded hover:bg-gray-100 transition-colors"
        >
          停止
        </button>

        {/* 进度 */}
        {hasNotes && (
          <span className="text-sm text-[#666666]">
            {state.currentIndex + 1} / {state.notes.length}
          </span>
        )}

        {/* 速度选择 */}
        <div className="flex gap-1 ml-auto">
          {SPEEDS.map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                state.speed === s
                  ? 'bg-[#4A4A4A] text-white'
                  : 'border border-gray-300 text-[#666666] hover:bg-gray-100'
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
