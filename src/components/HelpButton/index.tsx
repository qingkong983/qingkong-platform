import React, { useEffect, useState } from 'react'
import './index.less'
import { Dropdown, Menu, Tooltip } from 'antd'
import axios from 'axios'

const HelpButton = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [v, setV] = useState<string>('v0.0.0')
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>使用文档</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        Qingkong {v}
      </Menu.Item>
    </Menu>
  )
  useEffect(() => {
    axios.get('/api/cov/version').then((res) => {
      console.log(res.data)
      setV(res.data.version)
    })
  }, [])
  const dropdownBtn = <span className="dropdown-btn">?</span>
  return (
    <div className="help-button">
      <Dropdown
        visible={visible}
        overlay={menu}
        trigger={['click']}
        onVisibleChange={(val) => {
          setVisible(val)
        }}
      >
        <div>{!visible ? <Tooltip title="帮助">{dropdownBtn}</Tooltip> : dropdownBtn}</div>
      </Dropdown>
    </div>
  )
}

export default HelpButton
