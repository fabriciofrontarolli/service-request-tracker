import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

import LoginPage from 'views/auth-views/authentication/login';

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: LoginPage,
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/ordens-de-servico'))
    },
    {
        key: 'dashboard.ordensDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/ordens-de-servico`,
        component: React.lazy(() => import('views/app-views/dashboards/ordens-de-servico'))
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/dashboards/abrir-chamado`,
        component: React.lazy(() => import('views/app-views/dashboards/abrir-chamado'))
    },
    {
        key: 'dashboard.editarOrdemDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/editar-ordem-de-servico/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/abrir-chamado'))
    },
    {
        key: 'dashboard.customers',
        path: `${APP_PREFIX_PATH}/dashboards/clientes`,
        component: React.lazy(() => import('views/app-views/dashboards/clientes'))
    },
    {
        key: 'dashboard.customer',
        path: `${APP_PREFIX_PATH}/dashboards/novo-cliente`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-cliente'))
    },
    {
        key: 'dashboard.editarCliente',
        path: `${APP_PREFIX_PATH}/dashboards/editar-cliente/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-cliente'))
    },
    {
        key: 'quadros.laboratorio',
        path: `${APP_PREFIX_PATH}/quadros/laboratorio`,
        component: React.lazy(() => import('views/app-views/dashboards/quadro-laboratorio'))
    },
    {
        key: 'quadros.campo',
        path: `${APP_PREFIX_PATH}/quadros/campo`,
        component: React.lazy(() => import('views/app-views/dashboards/quadro-campo'))
    },
    {
        key: 'usuarios.listagem',
        path: `${APP_PREFIX_PATH}/administrativo/usuarios`,
        component: React.lazy(() => import('views/app-views/dashboards/usuarios'))
    },
    {
        key: 'usuarios.novoUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/novo-usuario`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-usuario'))
    },
    {
        key: 'dashboard.editarUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/editar-usuario/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-usuario'))
    },
    {
        key: 'administrativo.fornecedores.listagem',
        path: `${APP_PREFIX_PATH}/administrativo/fornecedores`,
        component: React.lazy(() => import('views/app-views/dashboards/fornecedores'))
    },
    {
        key: 'administrativo.fornecedores.novoFornecedor',
        path: `${APP_PREFIX_PATH}/administrativo/novo-fornecedor`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-fornecedor'))
    },
    {
        key: 'administrativo.fornecedores.editarFornecedor',
        path: `${APP_PREFIX_PATH}/administrativo/editar-fornecedor/:id`,
        component: React.lazy(() => import('views/app-views/dashboards/novo-fornecedor'))
    },
    {
        key: 'dashboard.perfil',
        path: `${APP_PREFIX_PATH}/perfil`,
        component: React.lazy(() => import('views/app-views/dashboards/perfil'))
    }
];
