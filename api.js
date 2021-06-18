const { apikey, secretkey } = require('./config.json');
const axios = require('axios').default;
const qs = require('qs');
let accessToken;
const auth = new Promise(async (resolve, reject) => {
    // 获取 access_token
    let { data: { access_token } } = await axios({
        url: 'https://aip.baidubce.com/oauth/2.0/token',
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            grant_type: 'client_credentials',
            client_id: apikey,
            client_secret: secretkey,
        }),
    });
    if (!access_token) {
        reject('Auth fail');
    }
    accessToken = access_token
    resolve()
});

module.exports = {
    async query({ imgUrl }) {
        if (!accessToken) {
            await auth;
        }
        const { data } = await axios({
            url: 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ imgUrl, access_token: accessToken }),
        });
        return data?.conclusionType;
    }
};