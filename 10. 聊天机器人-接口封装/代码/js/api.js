var API = (function () {
    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';

    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, {
            headers
        })
    }

    function post(path, bodyObj) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL + path, {
            headers,
            method: 'POST',
            body: JSON.stringify(bodyObj)
        })
    }

    /**
     * 注册
     * @param {*} userInfo 注册用户信息
     * @return {*} 
     */
    async function reg(userInfo) {
        const resp = await post('/api/user/reg', userInfo)
        return await resp.json();
    }

    /**
     * 登陆
     * @param {*} loginInfo 登陆用户信息
     */
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo)
        const data = await resp.json();
        if (data.code === 0) {
            // 登陆成功
            // 将返回头里面的令牌 authorization 保存到本地
            localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'))
        }
        return data;
    }

    /**
     * 发送消息
     * @param {*} content   消息内容
     * @return {*} 
     */
    async function sendChat(content) {
        const resp = await post('/api/chat', {
            content
        })
        return await resp.json();
    }

    /**
     * 验证用户是否已经存在
     * @param {*} loginId
     * @return {*} 
     */
    async function exists(loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    }

    /**
     * 获取当前登陆的用户信息
     * 服务器会根据请求头中的authorization值，返回当前登录的用户信息
     * @return {*} 
     */
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    }

    /**
     * 获取消息历史
     * @return {*}
     */
    async function getHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }

    /**
     * 退出登录
     * @return {*}
     */
    function loginOut() {
        return localStorage.removeItem(TOKEN_KEY);
    }

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    }
})()