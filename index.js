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

const linebotParser = bot.parser();

// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  // event.message.text是使用者傳給bot的訊息
  const introRegex = /你|誰|介紹|you|yourself|hello|你好|hi/gi;
  //   const resumeRegex = /resume|履歷|cv/gi;
  //   const blogRegex = /blog|部落格|文章/gi;
  const searchRegex = /openapi|OpenApi|open|查詢|問|問題/gi;
  const LottoRegex = /大樂透|樂透|開獎/gi;
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
  } else {
    event.reply(
      "不知道該問什麼嗎？ 歡迎透過以下的關鍵字與我互動！\n\nOpenApi/大樂透"
    );

    // 主動發送訊息
    setTimeout(function () {
      var userId = "U65408a11db9afa4192268cd46d55f8df";
      var sendMsg = "==傳送訊息測試==";
      bot.push(userId, [sendMsg]);
      console.log("userId: " + userId);
      console.log("send: " + sendMsg);
    }, 1000);
  }
});

// 送出帶有line-bot需要資訊的POST請求
app.post("/", linebotParser);

// 啟動express server
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server start");
});

const config = {
  channelAccessToken:
    "bW3urfAiN8Lg0BgF175qpzBGbvlT2SVAN9dekAtXSHotmFwdxFPE0DWURxFDRXYVXPaso1sMDxJbFy6CVgMT6vXglbaXVSZWCZcNiZWeQ+Md413jHxpo0l16xbiYEN0WA0r2NWw8vtyn552lsaatZwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "48d69d737406be7f8f478861f9be295d",
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
