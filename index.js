/*
 * @Author: hzq
 * @Date: 2018-08-28 15:55:55
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-12 16:10:01
 * @文件说明: 全局$api插件
 */
import Service from './service'
export default {
    install(Vue, Url, config = {}) {
        if (config.baseURL) {
            let service = Service(config)
            let api = {}
            Url.map(u => {
                let methods = u.methods || 'post'
                api[u.name] = (data, headers = {}) => {
                    let params = data || {}
                    if (methods === 'get') params = { params }
                    return service[methods](config.prefix + u.url, params, {
                        headers
                    })
                }
            })
            Vue.prototype.$api = api
            Vue.$api = api
        } else console.error('baseURL为必传参数')
    }
}
