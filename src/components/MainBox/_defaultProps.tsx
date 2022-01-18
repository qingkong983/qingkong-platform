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
        path: '/calendar',
        name: '日历配置列表',
        icon: <TableOutlined />,
      },
      {
        path: '/calendar/:id',
        name: '日历配置详情',
        hideInMenu: true
      },
    ],
  },
  location: {
    pathname: '/#/',
  },
};
