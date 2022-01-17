import React from 'react';
import {
  SmileOutlined,
  CrownOutlined,
  TabletOutlined,
  AntDesignOutlined,
  TableOutlined,
  ApartmentOutlined,
  CodepenOutlined,
  UserOutlined
} from "@ant-design/icons";

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/project',
        name: '项目列表',
        icon: <TableOutlined />,
      },
      {
        path: '/project/:id/commit/:commitSha/tree/:catalogue',
        name: '覆盖率详情',
        hideInMenu: true
      },
      // {
      //   path: '/project/:id',
      //   name: '项目新增',
      //   hideInMenu: true
      // },
      {
        path: '/code-house',
        name: 'Git Source',
        icon: <CodepenOutlined />
      },
      {
        path: '/code-house/-1',
        name: 'Git Source新增',
        hideInMenu: true
      },
      {
        path: '/code-house/:id',
        name: 'Git Source编辑',
        hideInMenu: true
      },
      {
        path: '/user',
        name: '用户信息',
        icon: <UserOutlined />,
      },
    ],
  },
  location: {
    pathname: '/#/',
  },
};
