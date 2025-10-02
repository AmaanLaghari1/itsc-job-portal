import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 small">
      <div>
        <a href="https://usindh.edu.pk/itsc" target="_blank" rel="noopener noreferrer">
          ITSC
        </a>
        <span className="ms-1 small">&copy; 2025 University of Sindh.</span>
      </div>
      <div className="ms-auto">
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
