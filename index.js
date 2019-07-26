const TelegramBot = require('node-telegram-bot-api');

// let WELCOME_MESSAGE = 'Привет {kroshka}! Прочитай гайды в закрепе. Это чат потока. Тут около 15+ 2-3 курсников и люди с твоего потока.  Мы тут только что ты помогать и травить байки)';
let WELCOME_MESSAGE = 'Привет {kroshka} =)';

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true,
    timeout: 500
});

bot.on('message', msg =>{
    if (msg.new_chat_members !== undefined) {
        console.log(msg.new_chat_member.username);
        console.log(msg.new_chat_member.id);

        const text = WELCOME_MESSAGE.replace('{kroshka}', `@${msg.new_chat_member.username}`);

        bot.sendMessage(msg.chat.id, text);
    }
});

bot.onText(/\/change_text (\S+) (.+)/, function (msg, match) {
    console.log(match);
    const [, password, newText] = match;

    if (password === (process.env.PASS || 'apirol')) {
        WELCOME_MESSAGE = newText;

        bot.sendMessage(msg.chat.id, `Текст изменен на: ${WELCOME_MESSAGE}`);
    }
});

bot.on('polling_error', console.error);

// hack
const http = require('http');
http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
}).listen(process.env.PORT || 8084);
