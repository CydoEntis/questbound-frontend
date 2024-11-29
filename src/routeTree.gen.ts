/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as PartiesIdImport } from./routes/parties/$id/$id'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PartiesIdRoute = PartiesIdImport.update({
  id: '/parties/$id',
  path: '/parties/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/parties/$id': {
      id: '/parties/$id'
      path: '/parties/$id'
      fullPath: '/parties/$id'
      preLoaderRoute: typeof PartiesIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/parties/$id': typeof PartiesIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/parties/$id': typeof PartiesIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/parties/$id': typeof PartiesIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/dashboard' | '/login' | '/register' | '/parties/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/dashboard' | '/login' | '/register' | '/parties/$id'
  id: '__root__' | '/' | '/dashboard' | '/login' | '/register' | '/parties/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  PartiesIdRoute: typeof PartiesIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  PartiesIdRoute: PartiesIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/login",
        "/register",
        "/parties/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/parties/$id": {
      "filePath": "parties/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
