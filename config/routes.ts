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
                name: 'basicConfig', //基础配置
                routes: [
                  {
                    path: '/comm/approve',
                    name: 'flowModel', //流程模型
                    component: './Comm/Approve/ApproveModel',
                  },
                  {
                    name: 'editFlow', // 流程编辑器
                    icon: 'smile',
                    path: '/comm/editorFlow',
                    component: './Comm/EditorFlow',
                  },
                  {
                    name: 'pageConfig', // 页面配置
                    icon: 'edit',
                    path: '/comm/navigation',
                    component: './Comm/Navigation',
                  },

                  // {
                  //   name: 'dynamicPage', //  动态页面
                  //   icon: 'smile',
                  //   path: '/comm/dynamicPage',
                  //   component: './Comm/PagesDesign',
                  // },
                  {
                    name: 'success',
                    icon: 'smile',
                    path: '/comm/resultSuccess',
                    component: './Comm/Results/ResultSuccess',
                  },
                  {
                    name: 'fail', //  失败页面
                    icon: 'smile',
                    path: '/comm/resultFail',
                    component: './Comm/Results/ResultFail',
                  },
                ],
              },
              {
                path: '/mainData',
                name: 'mainData', //主数据
                routes: [
                  {
                    path: '/mainData/user-approve',
                    name: 'userInfo', // 用户信息
                    component: './MainData/UserApprove',
                  },
                  {
                    path: '/mainData/org',
                    name: 'orgDesign', // 组织结构
                    component: './MainData/Org',
                  },
                  {
                    path: '/mainData/model-design',
                    name: 'pageDesign', // 页面设计
                    component: './MainData/ModelDesign',
                  },
                  {
                    path: '/mainData/supplier',
                    name: 'supplier', // 供应商
                    component: './MainData/Supplier',
                  },
                  {
                    path: '/mainData/pagesDesign',
                    name: 'pagesDesign', // 动态页面
                    component: './MainData/PagesDesign',
                  }
                ],
              },
              {
                path: '/purchase',
                name: 'purchaseManager', // 采购管理
                routes: [
                  {
                    path: '/purchase/purchaseApply',
                    name: 'purchaseApply', // 采购申请
                    component: './Purchase/PurchaseApply',
                  },
                  {
                    // name: '采购申请-编辑',
                    path: '/purchase/purchaseApply/edit',
                    component: './Purchase/PurchaseApply/Edit',
                  },
                ],
              },
              {
                name: 'advanceForm', // 高级表单
                icon: 'smile',
                path: '/formadvancedform',
                component: './FormAdvancedForm',
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
