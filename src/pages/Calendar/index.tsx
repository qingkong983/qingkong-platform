import React, {useRef} from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {CalendarService} from "../../services/CalendarService";
import {Button, Divider, message, Popconfirm} from "antd";
import {useNavigate} from "react-router-dom";

export type TableListItem = {
  id: number;
  proposal: string;
  content: string;
  from: string;
  profession: string;
  author: string;
  authorOriginName: string;
};

const Calendar: React.FC = () => {
  const ref = useRef<any>();
  const history = useNavigate()
  const columns: ProColumns<TableListItem>[] = [
    {
      search:false,
      title: '提议',
      dataIndex: 'proposal'
    },
    {
      search:false,
      title: '内容',
      dataIndex: 'content'
    },
    {
      search:false,
      title: '出自',
      dataIndex: 'from'
    },
    {
      search:false,
      title: '职业',
      dataIndex: 'profession'
    },
    {
      search:false,
      title: '作者',
      dataIndex: 'author'
    },
    {
      search:false,
      title: '作者源名',
      dataIndex: 'authorOriginName'
    },
    {
      search:false,
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '操作',
      search:false,
      render(_,tableListItem){
        return <div>
          <a onClick={()=>{
            history(`/calendar/${tableListItem.id}`)
          }}>查看</a>
          <Divider type={'vertical'}/>
          <Popconfirm
            title="确认删除?"
            onConfirm={()=>{
              CalendarService.deleteACalendar({id:tableListItem.id}).then(res=>{
                message.success('删除成功')
                ref.current.reload()
              })
            }}
            onCancel={()=>{}}
            okText="Yes"
            cancelText="No"
          >
            <a style={{color:'red'}}>删除</a>
          </Popconfirm>
        </div>
      }
    }
  ];
  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        columns={columns}
        actionRef={ref}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        request={(params, sorter, filter) => {
          return CalendarService.listCalendar().then(res=>{
            return {
              data: res,
              success: true
            }
          })
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
              type={'primary'}
              onClick={() => {
                history(`/calendar/-1`)
              }}
          >
            新增
          </Button>,
        ]}
      />
    </div>
  );
};

export default Calendar
