export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        name: 'register',
        path: '/register',
        component: './User/Register',
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                path: '/comm',
                name: '基础配置',
                routes: [
                  {
                    path: '/comm/approve',
                    name: '流程模型',
                    component: './Comm/Approve/ApproveModel',
                  },
                  {
                    name: '流程编辑器',
                    icon: 'smile',
                    path: '/comm/editorFlow',
                    component: './Comm/EditorFlow',
                  },
                  {
                    name: '页面配置',
                    icon: 'edit',
                    path: '/comm/navigation',
                    component: './Comm/Navigation',
                  },

                  {
                    name: '成功页',
                    icon: 'smile',
                    path: '/comm/resultSuccess',
                    component: './Comm/Results/ResultSuccess',
                  },
                  {
                    name: '失败页',
                    icon: 'smile',
                    path: '/comm/resultFail',
                    component: './Comm/Results/ResultFail',
                  },
                ],
              },
              {
                path: '/mainData',
                name: '主数据',
                routes: [
                  {
                    path: '/mainData/user-approve',
                    name: '用户信息',
                    component: './MainData/UserApprove',
                  },
                  {
                    path: '/mainData/org',
                    name: '组织机构设计',
                    component: './MainData/Org',
                  },
                  {
                    path: '/mainData/model-design',
                    name: '表单设计',
                    component: './MainData/ModelDesign',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
