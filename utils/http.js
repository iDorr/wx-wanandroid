const ui = require('../utils/ui')

const request = function(method){

    return (obj)=>{
        if(obj.showLoading != false){
            ui.hideLoading()
            ui.showLoading("加载中...")
        }
        var data = {}
        if(obj.data) data = obj.data
        wx.request({
            url : encodeURI(obj.url),
            method: method,
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res)=>{
                if(!res.data || res.statusCode >= 300 || res.statusCode < 200) {
                    ui.showToast("接口请求失败, 请稍后重试!")
                    return
                }
                if(res.data.errorCode < 0) {
                    ui.showToast(res.data.errorMsg)
                    return
                }
                if(obj.success)
                    obj.success(res.data.data)
            },
            fail: ()=>{
                ui.showToast("接口请求失败, 请稍后重试!")
                if (obj.fail) {
                    obj.fail()
                }
            },
            complete: ()=>{
                ui.hideLoading()
            }
        })
    }
}

module.exports = {
    get: request('GET'),
    post: request('POST'),
    delete: request('DELETE'),
    put: request('PUT')
}
