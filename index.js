const { Bot, Message, Middleware } = require('mirai-js');
const { groups, sendTo, recalldelay = 0, botconfig, sendDuplicate } = require('./config.json');
const { query } = require('./api');
if (!sendDuplicate) {
    var idSet = new Set();
}

const bot = new Bot();

(async () => {
    await bot.open({
        baseUrl: botconfig.baseUrl,
        authKey: botconfig.authKey,
        qq: botconfig.qq,
    });

    bot.on('GroupMessage', new Middleware()
        .groupFilter(groups)
        .messageIdProcessor()
        .messageProcessor(['Image'])
        .use(async (data, next) => { data.classified?.Image?.length ? next() : 'ignore'; })
        .done(async (data) => {
            let isRecall = false;
            data.classified?.Image?.forEach(async (img) => {
                let result = await query({ imgUrl: img.url })
                if (result == 2 || result == 3) {
                    if (result == 2 && sendTo.length) {
                        sendTo.forEach(friend => {
                            if (!sendDuplicate) {
                                if (idSet.has(img.imageId)) {
                                    return;
                                }
                                idSet.add(img.imageId);
                            }

                            bot.sendMessage({
                                friend,
                                message: new Message().addImageId(img.imageId),
                            })
                        });
                    }

                    if (isRecall) {
                        return;
                    }
                    isRecall = true;
                    setTimeout(() => bot.recall({ messageId: data.messageId }), recalldelay * 1000);
                }
            });
        }));
})();