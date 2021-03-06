import { useEffect, useRef, useState } from 'react'
import { message, Upload } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import { SketchPicker } from 'react-color'
import CalendarService from '../../services/CalendarService'
import util from '../../utils/util'

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
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ProForm<any>
        onFinish={async () => {
          await waitTime(100)
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            CalendarService.createACalendar({
              ...val2,
              background,
            }).then((res) => {
              message.success('??????????????????????????????????????????')
              history(`/calendar/${res.id}`)
            })
          } else {
            await CalendarService.updateACalendar({
              ...val2,
              background,
              id: params.id,
            })

            message.success('??????')
          }
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText width="md" name="proposal" label="???/???" placeholder="proposal" />
          <ProFormTextArea width="md" name="content" label="??????" placeholder="content" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="from" label="??????" placeholder="from" />
          <ProFormText width="md" name="profession" label="??????" placeholder="profession" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="author" label="??????" placeholder="author" />
          <ProFormText
            width="md"
            name="authorOriginName"
            label="????????????"
            placeholder="authorOriginName"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormDatePicker width="md" name="date" label="date" placeholder="date" />
          {params.id !== '-1' ? (
            <div>
              <p>????????????</p>
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
                    '??????????????????'
                  )}
                </Upload>
              </ImgCrop>
            </div>
          ) : null}
        </ProForm.Group>
        {/* {background} */}
        <p>??????????????????</p>
        {/* <div className={'bg-zhanshi'} style={{ backgroundColor:background }}> */}

        {/* </div> */}
        <div style={{ marginBottom: '20px' }}>
          <SketchPicker width="300px" color={background} onChangeComplete={handleChangeComplete} />
        </div>
      </ProForm>
    </div>
  )
}
