const { OpenAI } = require("openai");
const { OpenAIStream, StreamingTextResponse } = require("ai");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

// items.jsonのパスを構築
const itemsPath = require("./timeline-ja.json");
const namePath = require("./info-ja.json");

const SYSTEM_PROMPT = `introduce about the person with information by third person perspective`;
const NAMEja = namePath.ja[0].name;
const NAMEen = namePath.en[0].name;

function formatArrayToText(array) {
  return array
    .map((item) => {
      return `${item.date}という時間に、${item.title}ということをしたそうです。詳細な説明は以下の通りです：${item.description}`;
    })
    .join("\n");
}
const TEXT = formatArrayToText(itemsPath);

const BIO = namePath.ja[0].bio;

// OpenAI API キーの設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function introduceThem(nameJa, nameEn, text, bio) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `この人 (日本語での名前は ${nameJa}, 英語では ${nameEn}です。)について日本語を使ってポジティブに紹介してください。ネガティブな情報や、詳細な情報、意味がわからない部分は伝えなくて構いません。以下はその人の自己紹介です：${bio}\nまた、この人のタイムラインは以下のように記述されています。(json形式で書かれています): ${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log(`生成中(summarize)...(${text})`);
    const generatedContent = response.choices[0].message.content;
    return generatedContent;
  } catch (error) {
    console.error("くそっ！生成中にエラーが発生した！:", error);
    return text; // エラー時は元のテキストを返す
  }
}

introduceThem(NAMEja, NAMEen, TEXT, BIO).then((summarizedItems) => {
  if (summarizedItems) {
    const noNewLineItems = summarizedItems.replace(/\n/g, ""); // ここで改行コードを削除
    fs.ensureDirSync(".feed");
    fs.writeJsonSync(`./src/who/summary-ja.json`, noNewLineItems);
  }
});
