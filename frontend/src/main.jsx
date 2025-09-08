import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store,  persistor } from './store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* ✅ Persist Redux state */}
      <Router basename=''>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
)
