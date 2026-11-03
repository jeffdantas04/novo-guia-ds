import { useState, useCallback } from 'react'
import { Sidebar } from './components/Shell/Sidebar.jsx'
import { Toast } from './components/Toast.jsx'
import { Documentacao } from './views/Documentacao/index.jsx'
import { Contribuir } from './views/Contribuir/index.jsx'
import { useTheme } from './hooks/useTheme.js'
import { useFormState } from './hooks/useFormState.js'
import { useAdoConfig } from './hooks/useAdoConfig.js'
import { useFigmaConfig } from './hooks/useFigmaConfig.js'

function getView() {
  return window.location.hash === '#contribuir' ? 'contribuir' : 'documentacao'
}

export default function App() {
  const [view, setView] = useState(getView)
  const [toast, setToast] = useState(null)
  const { label: themeLabel, cycle: cycleTheme } = useTheme()
  const formState = useFormState()
  const adoConfigState = useAdoConfig()
  const figmaConfigState = useFigmaConfig()

  function handleView(v) {
    window.location.hash = v
    setView(v)
    window.scrollTo(0, 0)
  }

  function handleScroll(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleStep(i) {
    formState.goStep(i)
  }

  const showToast = useCallback((msg) => setToast(msg), [])

  return (
    <div className="app">
      <Sidebar
        view={view}
        step={formState.state.step}
        onView={handleView}
        onScroll={handleScroll}
        onStep={handleStep}
        themeLabel={themeLabel}
        onThemeCycle={cycleTheme}
      />
      <main className="main">
        {view === 'documentacao'
          ? <Documentacao />
          : <Contribuir formState={formState} adoConfigState={adoConfigState} figmaConfigState={figmaConfigState} onToast={showToast} />
        }
      </main>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </div>
  )
}
