import { FC } from 'react'

import { useRoutes } from 'react-router-dom'
import routerConfig from './routers'

const App: FC<any> = (p) => {
  console.log(p)
  const useRoutesRouterConfig = useRoutes(routerConfig)
  return useRoutesRouterConfig
}

export default App
