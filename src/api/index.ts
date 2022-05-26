
// import { defAxios as request } from '@/utils/request'
import { BaseApi, RequestBuilder } from '@/utils/request'
const namepath = 'vue3'
export class User extends BaseApi<any, any> {
  modelUrl = 'user/user'
}


export const user = new User()