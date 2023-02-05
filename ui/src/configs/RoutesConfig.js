import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register-1',
        path: `${AUTH_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
    },
    {
        key: 'register-2',
        path: `${AUTH_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'error-page-1',
        path: `${AUTH_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${AUTH_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/ordens-de-servico')),
    },
    {
        key: 'dashboard.ordensDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/ordens-de-servico`,
        component: React.lazy(() => import('views/app-views/dashboards/ordens-de-servico')),
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/dashboards/abrir-chamado`,
        component: React.lazy(() => import('views/app-views/dashboards/abrir-chamado')),
    },
    {
        key: 'dashboard.editarOrdemDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/editar-ordem-de-servico/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/abrir-chamado')),
    },
    {
        key: 'dashboard.customers',
        path: `${APP_PREFIX_PATH}/dashboards/clientes`,
        component: React.lazy(() => import('views/app-views/dashboards/clientes')),
    },
    {
        key: 'dashboard.customer',
        path: `${APP_PREFIX_PATH}/dashboards/novo-cliente`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-cliente')),
    },
    {
        key: 'dashboard.editarCliente',
        path: `${APP_PREFIX_PATH}/dashboards/editar-cliente/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-cliente')),
    },
    {
        key: 'components.general',
        path: `${APP_PREFIX_PATH}/components/general`,
        component: React.lazy(() => import('views/app-views/components/general')),
    },
    {
        key: 'quadros.laboratorio',
        path: `${APP_PREFIX_PATH}/quadros/laboratorio`,
        component: React.lazy(() => import('views/app-views/dashboards/quadro-laboratorio')),
    },
    {
        key: 'quadros.campo',
        path: `${APP_PREFIX_PATH}/quadros/campo`,
        component: React.lazy(() => import('views/app-views/dashboards/quadro-campo')),
    },
    {
        key: 'usuarios.listagem',
        path: `${APP_PREFIX_PATH}/administrativo/usuarios`,
        component: React.lazy(() => import('views/app-views/dashboards/usuarios')),
    },
    {
        key: 'usuarios.novoUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/novo-usuario`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-usuario')),
    },
    {
        key: 'dashboard.editarUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/editar-usuario/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-usuario')),
    },
    {
        key: 'dashboard.perfil',
        path: `${APP_PREFIX_PATH}/perfil`,
        component: React.lazy(() => import('views/app-views/dashboards/perfil')),
    },



    {
        key: 'register-1',
        path: `${APP_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register-2',
        path: `${APP_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'forgot-password',
        path: `${APP_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'error-page-1',
        path: `${APP_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${APP_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
        meta: {
            blankLayout: true
        }
    },
];
