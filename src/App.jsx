import { useState } from 'react'
import { guests } from './data/guests.js'
import { event } from './data/event.js'
import { normalizeCode } from './lib/code.js'
import { useGrid } from './lib/useGrid.js'
import CodeEntry from './components/CodeEntry.jsx'
import Invitation from './components/Invitation.jsx'
import { EmbossDefs } from './components/Ornaments.jsx'

function codeFromUrl() {
  const c = new URLSearchParams(window.location.search).get('c')
  return c ? normalizeCode(c) : null
}

export default function App() {
  const grid = useGrid()
  const [code, setCode] = useState(codeFromUrl)
  const guest = code ? guests[code] : null

  function enter(next) {
    if (!guests[next]) return false
    const url = new URL(window.location.href)
    url.searchParams.set('c', next)
    window.history.replaceState(null, '', url)
    setCode(next)
    return true
  }

  return (
    <>
      <EmbossDefs />
      <div className="field" aria-hidden="true" />
      {guest ? (
        <Invitation key={code} code={code} guest={guest} grid={grid} />
      ) : (
        <CodeEntry
          onSubmit={enter}
          initialError={code ? 'Esse código não está na nossa lista. Confira o link que você recebeu.' : null}
        />
      )}
      {event.placeholder && (
        <p className="sample-flag" role="note">
          Dados de exemplo · edite src/data/event.js
        </p>
      )}
    </>
  )
}
