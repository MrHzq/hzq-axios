/*
 * @Author: hzq
 * @Date: 2018-08-28 15:55:55
 * @Last Modified by: hzq
 * @Last Modified time: 2018-12-24 15:36:44
 * @文件说明: 全局$api插件
 */
import Service from './service.min.js'
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
                    return service[methods](u.url, params, {
                        headers
                    })
                }
            })
            Vue.$api = api
            Vue.prototype.$api = api
        } else console.error('baseURL为必传参数')
    }
}
