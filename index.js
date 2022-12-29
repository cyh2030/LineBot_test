// 建立express伺服器
const express = require("express");
const app = express();

// 引用linebot SDK
var linebot = require("linebot");

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
  const resumeRegex = /resume|履歷|cv/gi;
  const blogRegex = /blog|部落格|文章/gi;
  const userText = event.message.text;
  if (introRegex.test(userText)) {
    event.reply(
      "你好！我是Danny，一個外向、口條流利、良好外語能力、學習快速的網頁前端工程師，有著兩年React & Typescript的開發經驗，熱衷新功能開發同時優化既有程式碼提高使用者與開發者體驗。由於過去商管背景，有著很好的溝通協調能力，善於與不同專業領域的夥伴合作。對於程式開發與協助他人成長有著極高的熱情，喜愛透過線上資源以及實務開發學習，鑽研各種前、後端技術持續精進自己的能力，同時透過文章與活動分享所學並提供協助，期望能將學習的成就感帶給更多人。"
    );
  } else if (resumeRegex.test(userText)) {
    event.reply(
      "以下是我目前的最新履歷以及linkedIn檔案，正在尋找中高階的前端工程師職位，歡迎隨時與我聯繫 \n\n中文履歷: https://www.cakeresume.com/s03411-6bb584\n\n英文履歷: https://www.cakeresume.com/s--vUgkMAempqZ4kcWeTtVG0Q--/s03411-e4dedd-eafe49\n\nLinkedIn頁面: https://www.linkedin.com/in/danny-wang-3b7471114/"
    );
  } else if (blogRegex.test(userText)) {
    event.reply(
      "以下是我的部落格連結，主要發布一些新手教學、專案筆記以及求職紀錄\n\n部落格連結: https://eruditeness.news.blog/"
    );
  } else {
    event.reply(
      "不知道該問什麼嗎？ 歡迎透過以下的關鍵字與我互動！\n\n介紹/履歷/部落格"
    );
  }
});

// 送出帶有line-bot需要資訊的POST請求
app.post("/", linebotParser);

// 啟動express server
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server start");
});
