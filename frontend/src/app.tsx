import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const NotFound = React.lazy(() => import('./not-found'))
const Synonyms = React.lazy(() => import('./synonyms'))

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<React.Suspense fallback={<>...</>}>{<Synonyms />}</React.Suspense>} />
            <Route
              path="*"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NotFound />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
