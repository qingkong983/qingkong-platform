import { useEffect, useRef, useState } from 'react'
import { message, Upload } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import CalendarService from '../../services/CalendarService'
import util from '../../utils/util'
import { SketchPicker } from 'react-color'

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default () => {
  const params = useParams()
  const formRef: any = useRef<ProFormInstance<any>>()
  const history = useNavigate()
  const [imageUrl, setImageUrl] = useState('')
  const [background, setBackground] = useState('#000000')
  useEffect(() => {
    if (params.id !== '-1') {
      CalendarService.retrieveACalendar({ id: Number(params.id) }).then((res) => {
        setBackground(res.background || '#000000')
        formRef.current?.setFieldsValue({
          proposal: res.proposal,
          content: res.content,
          from: res.from,
          profession: res.profession,
          author: res.author,
          authorOriginName: res.authorOriginName,
          date: res.date,
        })
      })
    } else {
      formRef.current?.setFieldsValue({
        proposal: '',
        content: '',
        from: '',
        profession: '',
        author: '',
        authorOriginName: '',
        date: moment().format('YYYY-MM-DD'),
      })
    }
    axios
      .post('http://public-api.rico.org.cn/file/list', {
        label: params.id,
        bucket: 'qingkong-home',
      })
      .then((res) => {
        setImageUrl(util.genUrl(res.data[0]))
      })
  }, [])

  const onChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      console.log(info)
      setImageUrl(util.genUrl(info.file.response.generatedMaps[0]))
    }
  }


  const handleChangeComplete = (color) => {
    // this.setState({ background:  });
    setBackground(color.hex)
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ProForm<any>
        onFinish={async () => {
          await waitTime(100)
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            CalendarService.createACalendar({
              ...val2,
              background
            }).then((res) => {
              message.success('新增成功，现可以编辑背景图片')
              history(`/calendar/${res.id}`)
            })
          } else {
            await CalendarService.updateACalendar({
              ...val2,
              background,
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
          <ProFormText width="md" name="proposal" label="宜/忌" placeholder="proposal" />
          <ProFormTextArea width="md" name="content" label="内容" placeholder="content" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="from" label="出自" placeholder="from" />
          <ProFormText width="md" name="profession" label="职业" placeholder="profession" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="author" label="作者" placeholder="author" />
          <ProFormText
            width="md"
            name="authorOriginName"
            label="作者源名"
            placeholder="authorOriginName"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormDatePicker width="md" name="date" label="date" placeholder="date" />
          {params.id !== '-1' ? (
            <div>
              <p>背景图片</p>
              <ImgCrop rotate aspect={0.74}>
                <Upload
                    action="http://public-api.rico.org.cn/file/upload"
                    listType="picture-card"
                    onChange={onChange}
                    showUploadList={false}
                    beforeUpload={(f) => util.yasuo(f)}
                    data={{ label: params.id, bucket: 'qingkong-home' }}
                >
                  {imageUrl ? (
                      <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                      '上传背景图片'
                  )}
                </Upload>
              </ImgCrop>
            </div>
          ) : null}
        </ProForm.Group>
        {/*{background}*/}
        <p>内容文字颜色</p>
        {/*<div className={'bg-zhanshi'} style={{ backgroundColor:background }}>*/}

        {/*</div>*/}
        <div style={{marginBottom:'20px'}}>
          <SketchPicker
              width={'300px'}
              color={ background }
              onChangeComplete={ handleChangeComplete }/>
        </div>
      </ProForm>
    </div>
  )
}
