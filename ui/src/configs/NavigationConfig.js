import { 
  DashboardOutlined,
  ToolOutlined,
  LaptopOutlined,
  UserOutlined,
  UserAddOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import { PERFIL_ADMINISTRADOR, PERFIL_CLIENTE, PERFIL_TECNICO } from 'views/app-views/dashboards/dados';


const navOperacional = [{
  key: 'operacional',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.operacional',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id, PERFIL_CLIENTE.id],
  submenu: [
    {
      key: 'ordens-de-servico',
      path: `${APP_PREFIX_PATH}/dashboards/ordens-de-servico`,
      title: 'sidenav.operacional.ordensDeServico',
      icon: FileSearchOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id, PERFIL_CLIENTE.id],
      submenu: []
    },
    {
      key: 'abrir-chamado',
      path: `${APP_PREFIX_PATH}/dashboards/abrir-chamado`,
      title: 'sidenav.operacional.abrirChamado',
      icon: FileAddOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id, PERFIL_CLIENTE.id],
      submenu: []
    },
    {
      key: 'dashboards-customers',
      path: `${APP_PREFIX_PATH}/dashboards/clientes`,
      title: 'sidenav.operacional.clientes',
      icon: UserOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    },
    {
      key: 'dashboards-customer',
      path: `${APP_PREFIX_PATH}/dashboards/novo-cliente`,
      title: 'sidenav.operacional.novoCliente',
      icon: UserAddOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    }
  ]
}]

const navQuadros = [{
  key: 'quadros',
  path: `${APP_PREFIX_PATH}/quadros`,
  title: 'sidenav.quadros',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id],
  submenu: [
    {
      key: 'laboratorio',
      path: `${APP_PREFIX_PATH}/quadros/laboratorio`,
      title: 'sidenav.quadros.laboratorio',
      icon: LaptopOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id],
      submenu: []
    },
    {
      key: 'campo',
      path: `${APP_PREFIX_PATH}/quadros/campo`,
      title: 'sidenav.quadros.campo',
      icon: ToolOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id, PERFIL_TECNICO.id],
      submenu: []
    }
  ]
}]

const navAdministrativo = [{
  key: 'administrativo',
  path: `${APP_PREFIX_PATH}/usuarios`,
  title: 'sidenav.administrativo',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  profiles: [PERFIL_ADMINISTRADOR.id],
  submenu: [
    {
      key: 'usuarios',
      path: `${APP_PREFIX_PATH}/administrativo/usuarios`,
      title: 'sidenav.administrativo.usuarios.listagem',
      icon: UserSwitchOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    },
    {
      key: 'novo-usuario',
      path: `${APP_PREFIX_PATH}/administrativo/novo-usuario`,
      title: 'sidenav.administrativo.usuarios.novo',
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    },
    {
      key: 'fornecedores',
      path: `${APP_PREFIX_PATH}/administrativo/fornecedores`,
      title: 'sidenav.administrativo.fornecedores.listagem',
      icon: ShopOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    },
    {
      key: 'novo-fornecedor',
      path: `${APP_PREFIX_PATH}/administrativo/novo-fornecedor`,
      title: 'sidenav.administrativo.fornecedores.novo',
      icon: ShopOutlined,
      breadcrumb: false,
      profiles: [PERFIL_ADMINISTRADOR.id],
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...navOperacional,
  ...navQuadros,
  ...navAdministrativo,
]

export default navigationConfig;
