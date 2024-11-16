import { whaleRequset as req } from '..'

export const getProjectType = () => {
  return req.get('/staticonfig/project_type')
}
