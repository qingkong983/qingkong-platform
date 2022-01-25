import ImageCompressor from 'js-image-compressor'

async function yasuo(file: any) {
  const r = await new Promise((resolve, reject) => {
    const options = {
      file,
      quality: 0.6,
      mimeType: 'image/jpeg',
      maxWidth: 2000,
      maxHeight: 2000,
      width: 1000,
      height: 1000,
      minWidth: 500,
      minHeight: 500,
      convertSize: Infinity,
      loose: true,
      redressOrientation: true,

      // 压缩前回调
      beforeCompress(result: any) {
        console.log('压缩之前图片尺寸大小: ', result.size)
        console.log('mime 类型: ', result.type)
      },

      // 压缩成功回调
      success(result: any) {
        console.log(result, '压缩成功回调')
        console.log('压缩之后图片尺寸大小: ', result.size)
        console.log('mime 类型: ', result.type)
        console.log(
          '实际压缩率： ',
          `${(((file.size - result.size) / file.size) * 100).toFixed(2)}%`
        )
        resolve(result)
      },

      // 发生错误
      error(msg: any) {
        console.error(msg)
        reject(msg)
      },
    }

    const a = new ImageCompressor(options)
    console.log(a)
  })

  return r
}

function genUrl(f: any): string {
  const { storageKey } = f
  const { postfix } = f
  return `http://public-api.rico.org.cn/${storageKey}.${postfix}`
}

export default {
  yasuo,
  genUrl,
}
