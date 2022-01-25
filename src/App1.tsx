import { FC } from 'react'
import util from './utils/util'

const App1: FC<any> = () => {
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          // console.log(e.target.files)
          const file: any = e.target.files[0]
          // console.log()
          util.yasuo(file).then((res) => {
            console.log(res)
          })
        }}
      />
    </div>
  )
}
export default App1
