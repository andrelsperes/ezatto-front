import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Tela Inicial',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Gestão de Cliente',
    icon: 'people-outline',
    link: '/pages/gestao-cliente',
    data:  {roles: ['GESTAO_CLIENTE']},
    hidden: true,
    children: [
      {
        title: 'Cadastro de Cliente',
        link: '/pages/gestao-cliente/lista-cliente',
        data:  {roles: ['CADASTRO_CLIENTE']},
        hidden: true,
      },
    ],
  },
  {
    title: 'Gestao de Notas',
    icon: 'people-outline',
    link: '/pages/gestao-notas',
    data: {roles: ['GESTAO_NOTAS']},
    hidden: true,
    children: [
      {
        title: 'Upload de arquivos',
        link: '/pages/gestao-notas/upload-arquivos',
        data: {roles: ['UPLOAD_ARQUIVOS']},
        hidden: true,
      },
    ],
  },
 /* {
    title: 'Relatórios',
    icon: 'file-text-outline',
    link: '/pages/relatorio',
    data: {roles: ['RELATORIO']},
    hidden: true,
    children: [
      {
        title: 'Relatório de Autuação por Agente',
        link: '/pages/relatorio/relatorio-autuacao-agente',
      },
      {
        title: 'Relatório de Infração Mensal',
        link: '/pages/relatorio/relatorio-infracao-mensal',
      },
      {
        title: 'Relatório de Quantidade Autuação',
        link: '/pages/relatorio',
      },

    ],
  },*/

];
