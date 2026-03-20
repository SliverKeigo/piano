import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// mock audioEngine
vi.mock('../utils/audioEngine', () => ({
  createAudioEngine: () => ({
    playNote: vi.fn(),
    stopNote: vi.fn(),
    playNoteForDuration: vi.fn(),
    ensureStarted: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('集成测试', () => {
  it('输入简谱 → 加载 → 显示播放控制', async () => {
    const user = userEvent.setup()
    render(<App />)

    const textarea = screen.getByPlaceholderText(/输入简谱/)
    await user.type(textarea, '1 2 3')
    await user.click(screen.getByRole('button', { name: /加载/ }))

    // 播放按钮应该可用
    const playButton = screen.getByRole('button', { name: /播放/ })
    expect(playButton).not.toBeDisabled()
  })

  it('选择预设歌曲 → 加载', async () => {
    const user = userEvent.setup()
    render(<App />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '小星星')
    await user.click(screen.getByRole('button', { name: /加载/ }))

    const playButton = screen.getByRole('button', { name: /播放/ })
    expect(playButton).not.toBeDisabled()
  })

  it('键盘按键触发琴键视觉反馈', () => {
    render(<App />)
    fireEvent.keyDown(window, { key: 'a' })
    const key = screen.getByTestId('piano-key-C3')
    expect(key.className).toContain('bg-[#E0E0E0]')
  })
})
