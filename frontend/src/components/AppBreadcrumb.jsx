import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '../routes'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const navigate = useNavigate()

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <div className="d-flex align-items-center">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline-primary me-3"
      >
        ← Back
      </button>

      <CBreadcrumb className="my-0 text-decoration-none">
        <CBreadcrumbItem
          href={import.meta.env.VITE_BASE_URL}
          className="text-decoration-none"
        >
          Home
        </CBreadcrumbItem>

        {breadcrumbs.map((breadcrumb, index) => (
          <CBreadcrumbItem
            key={index}
            {...(breadcrumb.active
              ? { active: true }
              : { href: breadcrumb.pathname })}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        ))}
      </CBreadcrumb>
    </div>
  )
}

export default React.memo(AppBreadcrumb)
