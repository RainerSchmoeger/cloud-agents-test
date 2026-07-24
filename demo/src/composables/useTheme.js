import { ref, watch } from 'vue'

const STORAGE_KEY = 'poem-theme'
const theme = ref('auto')

function applyTheme(value) {
  const root = document.documentElement
  if (value === 'auto') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', value)
  }
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && ['light', 'dark', 'auto'].includes(saved)) {
    theme.value = saved
  }
  applyTheme(theme.value)
}

watch(theme, (value) => {
  localStorage.setItem(STORAGE_KEY, value)
  applyTheme(value)
})

export function useTheme() {
  return { theme, initTheme }
}
