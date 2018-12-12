# [hzq-axios](https://github.com/MrHzq/hzq-axios)

## axios 请求封装

### 使用方式

1.  `npm i hzq-axios -s`
1.  `import hzqAxios from 'hzq-axios'`
1.  `Vue.use(hzqAxios,Url,config)`

### 使用说明

#### Url：接口地址 Array

```ruby
[
    {
        name: 'login',
        url: '/analyst/login',
        methods: 'get'
    }
]
```

name：方法名称，这样写，就在`.vue`里面这样使用：`this.\$api.logout()`<br>
url：请求地址，请根据 swagger 上面的来，不再需要加前缀了，如'/sib/'，因为自动处理了<br>
methods：请求方式，没有该属性时，默认为 post

#### config：axios 自定义配置 Object

```ruby
{
    baseURL: '',// 测试服务器接口地址：必须
    preURL: '',// 预生产服务器接口地址：可选、无默认
    prodURL: '',// 生产服务器接口地址：可选、默认'/web'
    prefix: '',// 接口地址前缀：可选、无默认
    createConfig: {},// axios.create()方法参数：可选、默认({
        baseURL,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    beforeRequest(config) {// 请求拦截器：可选、无默认；使用了话，必须要在末尾加上：return config
        return config
    },
    respSuccess(resp) {},// 响应成功拦截器：可选、无默认
    respError(error) {},// 响应失败拦截器：可选、无默认
}
```
