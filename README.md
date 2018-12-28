# [hzq-axios](https://github.com/MrHzq/hzq-axios)

## 对 axios 请求的二次封装，封装成 Vue 插件 this.\$api

[GitHub 源码](https://github.com/MrHzq/hzq-axios)

[npm 包](https://www.npmjs.com/package/hzq-axios)

### 在 Vue 中使用

#### 0. 请确保已安装`axios`，否则安装 axios：`npm i axios -s`

#### 1. `npm i hzq-axios -s`

#### 2. `import hzqAxios from 'hzq-axios'`

#### 3. `Vue.use(hzqAxios,Url,config)`

### 参数说明

#### 关于 Url 文件的目录说明

1. 请先在`src`根目录下创建一个文件夹，用于放置所有接口地址数据。以我为例：在`src`下创建一个`axiosUrl`文件夹，创建完为 `src/axiosUrl`
1. 再根据个人习惯分为：`接口文件分类放置`和`接口文件不分类放置`<br>
   a、接口文件分类放置时：即以每一个功能新建 js 文件<br>
   （1）【有前缀】：当你的接口形式为：**域名+前缀+具体地址** 如：**http://api.myapi.com/web/user/login**，其中域名为 **http://api.myapi.com**、前缀为 **/web**、具体地址为：**/user/login**。
   则在 axiosUrl 文件夹下以【前缀】来新建文件夹，上例中就新建【web】文件夹，建完为 /axiosUrl/web；然后在 /axiosUrl/web 内依据【具体地址】的第一个名称新建.js 文件，上例就新建 user.js，建完为 /axiosUrl/web/user.js，然后在 user.js 写接口数据<br>
   （2）【无前缀】：当你的接口形式为：域名+具体地址 如：**http://api.myapi.com/user/login**，其中域名为**http://api.myapi.com**、具体地址为：**/user/login**。就直接以【具体地址】的第一个名称新建.js 文件，上例就新建 user.js，建完为/axiosUrl/user.js，然后在 user.js 写接口数据<br>
   b、接口文件不分类<br>
   （1）和上述(1)相似，区别为：在/axiosUrl/web 内直接新建 index.js 就行了，建完为/axiosUrl/web/index.js，然后在 index.js 写接口数据<br>
   （2）和上述(2)相似，区别为：在/axiosUrl 内直接新建 index.js 就行了，建完为/axiosUrl/index.js，然后在 index.js 写接口数据

#### Url：接口地址 [JSON 格式]

```ruby
export default [
    {
        name: 'login',
        url: '/analyst/login',
        methods: 'get'
    },
    ...
]
```

name：方法名称（`请保持唯一性`），这样写，就在`.vue`里面这样使用：`this.$api.login()`<br>
url：请求地址，请根据 swagger 上面的来，不再需要加前缀了，如'/sib/'，因为自动处理了<br>
methods：请求方式，没有该属性时，默认为 post

#### config：axios 自定义配置 Object

```ruby
{
    baseURL: '',// 测试服务器接口地址：必传
    preURL: '',// 预生产服务器接口地址：可选、无默认
    prodURL: '',// 生产服务器接口地址：可选、无默认
    createConfig: {},// axios.create()方法参数：可选、默认({
        baseURL,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    beforeRequest(config) {
        // 请求拦截器：可选、无默认；使用了话，必须要在末尾加上：return config
        return config
    },
    respSuccess(resp) {},// 响应成功拦截器：可选、无默认
    respError(error) {},// 响应失败拦截器：可选、无默认
}
```

### 实例

```ruby
let apiUrl = []

找到接口文件夹下以.js命名的所有文件，我这的接口文件夹目录为 src/assets/axiosUrl

const requireComponent = require.context('src/assets/axiosUrl', true, /\.js$/)

requireComponent.keys().map(fileName => {
    let prefix = ''
    if (fileName.match(/\//g).length > 1) {
        如果长度大于1，则表明访问接口是需要前缀的，则自动获取到前缀并地址中加上
        prefix = '/' + fileName.split(/\//g)[1]
    }

    let arr = requireComponent(fileName).default.map(u => {
        u.url = prefix + u.url
        return u
    })
    apiUrl.push(...arr)
})
console.log(apiUrl)

Vue.use(hzqAxios, apiUrl, {
    baseURL: 'https://www.xxx.com'
})
```
