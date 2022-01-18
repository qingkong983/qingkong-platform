import React, { useRef } from 'react'
import { message } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
    ProFormText,ProFormDatePicker,ProFormTextArea
} from '@ant-design/pro-form'
import { CalendarService } from '../../services/CalendarService'
import { useParams } from "react-router-dom";

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
                request={async () => {
                    let retrieveACodeHouseRes: any = {}
                    if (params.id === '-1') {
                        retrieveACodeHouseRes = {
                            repoId: '',
                            codeHouseId: '',
                            date:'2022-01-01'
                        }
                        await waitTime(100)
                    } else {
                        retrieveACodeHouseRes = await CalendarService.retrieveACalendar({
                            id: params.id,
                        })
                    }

                    return retrieveACodeHouseRes
                }}
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
                </ProForm.Group>
            </ProForm>
        </div>
    )
}
