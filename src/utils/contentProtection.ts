/**
 * Мягкая защита от копирования и быстрого открытия DevTools.
 * Не является настоящей безопасностью — обходится через инструменты браузера.
 */
export function enableContentProtection() {
  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  const onDragStart = (event: DragEvent) => {
    const target = event.target
    if (target instanceof HTMLElement && target.closest('input, textarea')) {
      return
    }
    event.preventDefault()
  }

  const onSelectStart = (event: Event) => {
    const target = event.target
    if (target instanceof HTMLElement && target.closest('input, textarea')) {
      return
    }
    event.preventDefault()
  }

  const onCopyCut = (event: ClipboardEvent) => {
    const target = event.target
    if (target instanceof HTMLElement && target.closest('input, textarea')) {
      return
    }
    event.preventDefault()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    const meta = event.metaKey || event.ctrlKey

    // F12
    if (event.key === 'F12') {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Ctrl/Cmd + Shift + I / J / C
    if (meta && event.shiftKey && ['i', 'j', 'c'].includes(key)) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Ctrl/Cmd + U (view source), Ctrl/Cmd + S (save)
    if (meta && ['u', 's'].includes(key)) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Ctrl/Cmd + Option/Alt + I / J / C (Safari / Firefox macOS)
    if (meta && event.altKey && ['i', 'j', 'c'].includes(key)) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  document.addEventListener('contextmenu', onContextMenu)
  document.addEventListener('dragstart', onDragStart)
  document.addEventListener('selectstart', onSelectStart)
  document.addEventListener('copy', onCopyCut)
  document.addEventListener('cut', onCopyCut)
  document.addEventListener('keydown', onKeyDown, true)

  return () => {
    document.removeEventListener('contextmenu', onContextMenu)
    document.removeEventListener('dragstart', onDragStart)
    document.removeEventListener('selectstart', onSelectStart)
    document.removeEventListener('copy', onCopyCut)
    document.removeEventListener('cut', onCopyCut)
    document.removeEventListener('keydown', onKeyDown, true)
  }
}
