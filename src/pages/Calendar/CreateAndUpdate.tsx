import React, {useEffect, useRef} from 'react'
import { message } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
    ProFormText,ProFormDatePicker,ProFormTextArea, ProFormUploadButton
} from '@ant-design/pro-form'
import { CalendarService } from '../../services/CalendarService'
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}

export default (props: any) => {
    const params = useParams();
    const formRef: any = useRef<
        ProFormInstance<any>
        >()
    const history = useNavigate()
    console.log(moment().format('YYYY-MM-DD'),123)
    useEffect(()=>{
        if (params.id !=='-1'){
            CalendarService.retrieveACalendar({id: Number(params.id)}).then(res=>{
                console.log(res)
                formRef.current?.setFieldsValue({
                    proposal:res.proposal,
                    content:res.content,
                    from:res.from,
                    profession:res.profession,
                    author:res.author,
                    authorOriginName:res.authorOriginName,
                    date:res.date
                })
            })
        } else {
            formRef.current?.setFieldsValue({
                proposal: '',
                content:'',
                from:'',
                profession:'',
                author:'',
                authorOriginName:'',
                date: moment().format('YYYY-MM-DD')
            })
        }
    },[])

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <ProForm<any>
                onFinish={async () => {
                    await waitTime(100)
                    const val2 =
                        await formRef.current?.validateFieldsReturnFormatValue?.()
                    if (params.id === '-1') {
                        await CalendarService.createACalendar({
                            ...val2,
                        })
                        message.success('创建成功')
                        history('/calendar')
                    } else {
                        await CalendarService.updateACalendar({
                            ...val2,
                            id: params.id,
                        })

                        message.success('更新')
                    }
                }}
                formRef={formRef}
                params={{ id: '100' }}
                formKey="base-form-use-demo"
                autoFocusFirstInput
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="proposal"
                        label="提议"
                        placeholder="proposal"
                    />
                    <ProFormTextArea
                        width="md"
                        name="content"
                        label="内容"
                        placeholder="content"
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="from"
                        label="出自"
                        placeholder="from"
                    />
                    <ProFormText
                        width="md"
                        name="profession"
                        label="职业"
                        placeholder="profession"
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="author"
                        label="作者"
                        placeholder="author"
                    />
                    <ProFormText
                        width="md"
                        name="authorOriginName"
                        label="作者源名"
                        placeholder="authorOriginName"
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormDatePicker
                        width="md"
                        name="date"
                        label="date"
                        placeholder="date"
                    />

                    <ProFormUploadButton label="上传凭证"
                                         max={1} name="file"
                                         rules={[{ required: true, message: '请上传到款凭证' }]}
                                         action="http://public-api.rico.org.cn/file/upload" //上传图片接口地址
                                         onChange={(e) => {
                                             console.log(e)
                                         }}
                                         fieldProps={{data:{bucket:'qingkong-home',label:'1010'}}}
                    />
                </ProForm.Group>
            </ProForm>
        </div>
    )
}
