import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SongInput } from '../components/SongInput'

describe('SongInput', () => {
  it('渲染 textarea 和加载按钮', () => {
    render(<SongInput onLoad={vi.fn()} />)
    expect(screen.getByPlaceholderText(/输入简谱/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /加载/ })).toBeInTheDocument()
  })

  it('渲染预设歌曲下拉选择器', () => {
    render(<SongInput onLoad={vi.fn()} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('选择预设歌曲填充到 textarea', async () => {
    const user = userEvent.setup()
    render(<SongInput onLoad={vi.fn()} />)
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '小星星')
    const textarea = screen.getByPlaceholderText(/输入简谱/) as HTMLTextAreaElement
    expect(textarea.value).toContain('1 1 5 5')
  })

  it('点击加载按钮触发 onLoad 回调', async () => {
    const user = userEvent.setup()
    const onLoad = vi.fn()
    render(<SongInput onLoad={onLoad} />)
    const textarea = screen.getByPlaceholderText(/输入简谱/)
    await user.type(textarea, '1 2 3')
    await user.click(screen.getByRole('button', { name: /加载/ }))
    expect(onLoad).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ note: 'C4' }),
    ]))
  })

  it('空输入点击加载不触发回调', async () => {
    const user = userEvent.setup()
    const onLoad = vi.fn()
    render(<SongInput onLoad={onLoad} />)
    await user.click(screen.getByRole('button', { name: /加载/ }))
    expect(onLoad).not.toHaveBeenCalled()
  })
})
