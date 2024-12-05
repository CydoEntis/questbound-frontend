/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthenticatedIndexImport./routes/_authenticated/indexuthenticated/index'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'
import { Route as AuthResetPasswordImport } from './routes/_auth/reset-password'
import { Route as AuthRegisterImport } from './routes/_auth/register'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as AuthForgotPasswordImport } from './routes/_auth/forgot-password'
import { Route as AuthenticatedPartiesIndexImport } from './routes/_authenticated/parties/index'
import { Route as AuthenticatedPartiesIdImport } from './routes/_authenticated/parties/$id'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthResetPasswordRoute = AuthResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthenticatedPartiesIndexRoute = AuthenticatedPartiesIndexImport.update({
  id: '/parties/',
  path: '/parties/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedPartiesIdRoute = AuthenticatedPartiesIdImport.update({
  id: '/parties/$id',
  path: '/parties/$id',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/_auth/reset-password': {
      id: '/_auth/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof AuthResetPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/parties/$id': {
      id: '/_authenticated/parties/$id'
      path: '/parties/$id'
      fullPath: '/parties/$id'
      preLoaderRoute: typeof AuthenticatedPartiesIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/parties/': {
      id: '/_authenticated/parties/'
      path: '/parties'
      fullPath: '/parties'
      preLoaderRoute: typeof AuthenticatedPartiesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  AuthResetPasswordRoute: typeof AuthResetPasswordRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  AuthResetPasswordRoute: AuthResetPasswordRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedPartiesIdRoute: typeof AuthenticatedPartiesIdRoute
  AuthenticatedPartiesIndexRoute: typeof AuthenticatedPartiesIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedPartiesIdRoute: AuthenticatedPartiesIdRoute,
  AuthenticatedPartiesIndexRoute: AuthenticatedPartiesIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/': typeof AuthenticatedIndexRoute
  '/parties/$id': typeof AuthenticatedPartiesIdRoute
  '/parties': typeof AuthenticatedPartiesIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/': typeof AuthenticatedIndexRoute
  '/parties/$id': typeof AuthenticatedPartiesIdRoute
  '/parties': typeof AuthenticatedPartiesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/_auth/reset-password': typeof AuthResetPasswordRoute
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/parties/$id': typeof AuthenticatedPartiesIdRoute
  '/_authenticated/parties/': typeof AuthenticatedPartiesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/dashboard'
    | '/'
    | '/parties/$id'
    | '/parties'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/dashboard'
    | '/'
    | '/parties/$id'
    | '/parties'
  id:
    | '__root__'
    | '/_auth'
    | '/_authenticated'
    | '/_auth/forgot-password'
    | '/_auth/login'
    | '/_auth/register'
    | '/_auth/reset-password'
    | '/_authenticated/dashboard'
    | '/_authenticated/'
    | '/_authenticated/parties/$id'
    | '/_authenticated/parties/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
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
        "/_auth",
        "/_authenticated"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/login",
        "/_auth/register",
        "/_auth/reset-password"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard",
        "/_authenticated/",
        "/_authenticated/parties/$id",
        "/_authenticated/parties/"
      ]
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.tsx",
      "parent": "/_auth"
    },
    "/_auth/reset-password": {
      "filePath": "_auth/reset-password.tsx",
      "parent": "/_auth"
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/parties/$id": {
      "filePath": "_authenticated/parties/$id.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/parties/": {
      "filePath": "_authenticated/parties/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
