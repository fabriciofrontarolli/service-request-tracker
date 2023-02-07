import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

import LoginPage from 'views/auth-views/authentication/login';
import OrdensDeServicoPage from 'views/app-views/dashboards/ordens-de-servico';
import AbrirChamadoPage from 'views/app-views/dashboards/abrir-chamado';
import ClientesPage from 'views/app-views/dashboards/clientes';
import NovoClientePage from 'views/app-views/dashboards/novo-cliente';
import QuadroLaboratorio from 'views/app-views/dashboards/quadro-laboratorio';
import QuadroCampo from 'views/app-views/dashboards/quadro-campo';
import UsuariosPage from 'views/app-views/dashboards/usuarios';
import NovoUsaurioPage from 'views/app-views/dashboards/novo-usuario';
import PerfilPage from 'views/app-views/dashboards/perfil';

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
        component: OrdensDeServicoPage,
    },
    {
        key: 'dashboard.ordensDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/ordens-de-servico`,
        component: OrdensDeServicoPage,
    },
    {
        key: 'dashboard.analytic',
        path: `${APP_PREFIX_PATH}/dashboards/abrir-chamado`,
        component: AbrirChamadoPage,
    },
    {
        key: 'dashboard.editarOrdemDeServico',
        path: `${APP_PREFIX_PATH}/dashboards/editar-ordem-de-servico/:id`,
        component: AbrirChamadoPage,
    },
    {
        key: 'dashboard.customers',
        path: `${APP_PREFIX_PATH}/dashboards/clientes`,
        component: ClientesPage,
    },
    {
        key: 'dashboard.customer',
        path: `${APP_PREFIX_PATH}/dashboards/novo-cliente`,
        component: NovoClientePage,
    },
    {
        key: 'dashboard.editarCliente',
        path: `${APP_PREFIX_PATH}/dashboards/editar-cliente/:id`,
        component: NovoClientePage
    },
    {
        key: 'quadros.laboratorio',
        path: `${APP_PREFIX_PATH}/quadros/laboratorio`,
        component: QuadroLaboratorio,
    },
    {
        key: 'quadros.campo',
        path: `${APP_PREFIX_PATH}/quadros/campo`,
        component: QuadroCampo,
    },
    {
        key: 'usuarios.listagem',
        path: `${APP_PREFIX_PATH}/administrativo/usuarios`,
        component: UsuariosPage,
    },
    {
        key: 'usuarios.novoUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/novo-usuario`,
        component: NovoUsaurioPage,
    },
    {
        key: 'dashboard.editarUsuario',
        path: `${APP_PREFIX_PATH}/administrativo/editar-usuario/:id`,
        component: NovoUsaurioPage
    },
    {
        key: 'dashboard.perfil',
        path: `${APP_PREFIX_PATH}/perfil`,
        component: PerfilPage,
    }
];
