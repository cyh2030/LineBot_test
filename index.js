// 建立express伺服器
const express = require("express");
const app = express();

// 引用linebot SDK
var linebot = require("linebot");

const line = require("@line/bot-sdk");
const cron = require("cron");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken,
});

function getRegexString(regex_string) {
  regex_string = regex_string.source;
  return regex_string.split("|")[0];
}

const linebotParser = bot.parser();

// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  // event.message.text是使用者傳給bot的訊息
  const introRegex = /你|誰|介紹|you|yourself|hello|你好|hi/gi;
  //   const resumeRegex = /resume|履歷|cv/gi;
  //   const blogRegex = /blog|部落格|文章/gi;
  const searchRegex = /OpenApi|open|查詢|問|問題/gi;
  const LottoRegex = /大樂透|樂透|開獎/gi;
  const LineBotSettingRegex = /LineBot|bot/gi;
  const RailwayRegex = /Railway|rail/gi;
  const StarbucksRegex = /星巴克|Starbucks|star/gi;
  const BookStoreRegex = /博客來/gi;
  const userText = event.message.text;
  if (introRegex.test(userText)) {
    event.reply("你好！我是Line Bot No.65.");
    //   } else if (resumeRegex.test(userText)) {
    //     event.reply(
    //       "以下是我目前的最新履歷以及linkedIn檔案，正在尋找中高階的前端工程師職位，歡迎隨時與我聯繫 \n\n中文履歷: https://www.cakeresume.com/s03411-6bb584\n\n英文履歷: https://www.cakeresume.com/s--vUgkMAempqZ4kcWeTtVG0Q--/s03411-e4dedd-eafe49\n\nLinkedIn頁面: https://www.linkedin.com/in/danny-wang-3b7471114/"
    //     );
    //   } else if (blogRegex.test(userText)) {
    //     event.reply(
    //       "以下是我的部落格連結，主要發布一些新手教學、專案筆記以及求職紀錄\n\n部落格連結: https://eruditeness.news.blog/"
    //     );
  } else if (searchRegex.test(userText)) {
    event.reply("https://chat.openai.com/chat");
  } else if (LottoRegex.test(userText)) {
    event.reply("https://www.taiwanlottery.com.tw/lotto/lotto649/history.aspx");
  } else if (LineBotSettingRegex.test(userText)) {
    event.reply("https://manager.line.biz/account/@776kbfne/stepmessage");
  } else if (RailwayRegex.test(userText)) {
    event.reply(
      "https://railway.app/project/dbf06706-a84d-4472-b2f6-65e7fc172f03/service/2bb59ac7-310a-44e6-b89b-ee66806d8e5b"
    );
  } else if (BookStoreRegex.test(userText)) {
    event.reply("https://www.books.com.tw/");
  } else if (StarbucksRegex.test(userText)) {
    event.reply("https://event.12cm.com.tw/starbucks/");
  } else {
    event.reply(
      "不知道該問什麼嗎？ 現有的關鍵字及連結如下！\n" +
        getRegexString(searchRegex) +
        "\n" +
        getRegexString(LottoRegex) +
        "\n" +
        getRegexString(LineBotSettingRegex) +
        "\n" +
        getRegexString(RailwayRegex) +
        "\n" +
        getRegexString(StarbucksRegex) +
        "\n" +
        getRegexString(BookStoreRegex) +
        "\n"
    );

    // 主動發送訊息
    // setTimeout(function () {
    //   var userId = "U65408a11db9afa4192268cd46d55f8df";
    //   var sendMsg = "==傳送訊息測試==";
    //   bot.push(userId, [sendMsg]);
    //   console.log("userId: " + userId);
    //   console.log("send: " + sendMsg);
    // }, 1000);
  }
});

// 送出帶有line-bot需要資訊的POST請求
app.post("/", linebotParser);

// 啟動express server
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server start");
});

//定時推播訊息
const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};

const client = new line.Client(config);

// const job = new cron.CronJob("*/10 * * * * *", async () => {
//   //"分 時 日 月 星期 年"
//   try {
//     const message = {
//       type: "text",
//       text: "每10秒的推播訊息",
//     };
//     await client.pushMessage("U65408a11db9afa4192268cd46d55f8df", message);
//   } catch (error) {
//     console.error(error);
//   }
// });

// job.start();

//
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  // 取得群組的ID
  const groupId = event.source.groupId;
  // 取得使用者的ID
  const userId = event.source.userId;
  // 回覆訊息
  const message = {
    type: "text",
    text: "回覆的訊息",
  };

  client
    .pushMessage(groupId, message)
    .then(() => {
      console.log(`Push message sent to ${groupId}.`);
    })
    .catch((error) => {
      console.error(error);
    });

  return Promise.resolve(null);
}
