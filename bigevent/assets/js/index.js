$(function () {
    // 调用获取用户基本信息的函数
    getUserInfo()


    var layer = layui.layer
    // 退出功能
    $('#btnLogout').on('click', function () {
        //    提示用户是否确认退出
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {

            // 清空本地存储的token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index)
        })
    })
})


// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // header: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染用户头像的函数
            renderAvatar(res.data)
            // console.log(res.data)
        },

        // 不论成功还是失败都会调用complete函数
        // complete: function (res) {
        //     // 拿到服务器响应回来的数据
        //     if (res.responseJSON === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空本地存储的token
        //         localStorage.removeItem('token')
        //         // 跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像的函数 
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 显示图片头像，隐藏文本头像
        $('.layui-nav-img').attr('scr', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 显示文本头像，隐藏图片头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}