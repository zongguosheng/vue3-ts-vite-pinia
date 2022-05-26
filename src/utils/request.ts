import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/modules/user'
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
// import { setupInterceptor } from './interceptors'
// import config from '@/config'
// console.log(import.meta.env.VITE_BASE_API) 
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // config.apiConfig.baseUrl, // url = base url + request url
  timeout: 5000 // config.apiConfig.timeout // 5000
  // withCredentials: true // send cookies when cross-domain requests  
  // withCredentials: config.apiConfig.withCredentials
})

/**
 * 请求拦截
 */

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const UserModule = useStore()
    // Add X-Access-Token header to every request, you can add other custom headers here
    // token 配置化处理
    // 过滤拦截链
    // if (config.interceptors) {
    //   const interceptors = config.interceptors as BaseInterceptor[]
    //   for (let index = 0; index < interceptors.length; index++) {
    //     const interceptor = interceptors[index]
    //     if (interceptor.isIntercept(config.url)) {
    //       // 如果false 过滤链不走
    //       if (!interceptor.before(config)) {
    //         break
    //       }
    //     }
    //   }
    // }
    if (UserModule.accessToken) {
      config.headers['X-Access-Token'] = UserModule.accessToken
    }
    return config
  },
  (error) => {
    // 清除加载中
    Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const UserModule = useStore()
    // 这里可以对响应进行统一处理
    const res = response.data
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }

  }, error => {
  // 可以对错误进行统一处理,弹窗提示
  return Promise.reject(error)
})

export class RequestBuilder {
  private baseUrl: string;
  private method: Method;
  private url: string;
  private data?: any;
  private headers?: object;
  private params?: any;
  // private interceptors: BaseInterceptor[];

  constructor(baseUrl: string,  url: string, method: Method) {
    this.baseUrl = baseUrl
    this.method = method
    this.url = url
  }
  
  public static Builder (url: string, baseURL = '', method: Method = 'post'): RequestBuilder {
    return new RequestBuilder(url, baseURL, method)
  }

  private Method (method: Method): RequestBuilder {
    this.method = method
    return this
  }

  public get (): RequestBuilder {
    return this.Method('get')
  }

  public post (): RequestBuilder {
    return this.Method('post')
  }

  public delete (): RequestBuilder {
    return this.Method('delete')
  }


  public Data (data: any = {}): RequestBuilder {
    this.data = data
    return this
  }

  public Headers (headers: object): RequestBuilder {
    this.headers = headers
    return this
  }

  public Params (params: any = {}): RequestBuilder {
    this.params = params
    return this
  }

  public request<T> (): Promise<T> {
    return (service.request<T>(this as unknown as AxiosRequestConfig) as Promise<unknown>) as Promise<T>
  }

}
enum SysCode{
  SUCCESS = 200,
  ERROR=500
}
interface ResultPage<T> {
  pageSize: number
  size: number
  total: number
  list:T[]
}

interface ResultHelper<T>{
  code: SysCode
  data:T
  message:string
}

export abstract class BaseApi<Q, R> {
  public modelUrl = ''
  public list (data: Q): Promise<ResultHelper<R[]>> {
    return RequestBuilder.Builder(this.modelUrl + 'list').Data(data).request()
  }
  public page (data: Q): Promise<ResultPage<R>> {
    return RequestBuilder.Builder(this.modelUrl + 'list').Data(data).request()
  }
  public save = (data: any): Promise<ResultHelper<boolean>> => {
    return RequestBuilder.Builder(this.modelUrl + 'save').Data(data).request()
  }

  public update = (data: any): Promise<ResultHelper<boolean>> => {
    return RequestBuilder.Builder(this.modelUrl + 'update').Data(data).request()
  }

  public delete = (ids: string): Promise<ResultHelper<boolean>> => {
    return RequestBuilder.Builder(this.modelUrl + `delete/${ids}`).request()
  }

  public saveOrUpdate = (data: any, id='id'): Promise<ResultHelper<boolean>> => {
    if(!data[id]) {
      return this.save(data)
    } else {
      return this.update(data)
    }
  }

}

export default service