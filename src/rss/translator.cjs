const { OpenAI } = require("openai");
const { OpenAIStream, StreamingTextResponse } = require("ai");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

// items.jsonのパスを構築
const itemsPath = path.join(__dirname, "items-ja.json");

const TARGET_LANGUAGE = "en";
const SYSTEM_PROMPT = `Translate the following text to target language: ${TARGET_LANGUAGE}`;

// OpenAI API キーの設
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// 翻訳関数
async function translateText(text, targetLanguage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `convert text to ${targetLanguage}: ${text}`,
        },
      ],

      // prompt: `Translate the following text to :\n\n${text}`,
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log(`翻訳中(RSS)...(${text})`);
    return response;
  } catch (error) {
    console.error("翻訳中にエラーが発生しました:", error);
    return text; // エラー時は元のテキストを返す
  }
}

// RSSフィードから記事を読み込み、翻訳する例
async function translateRSSItems(rssItems) {
  const batchSize = 3; // 一度に処理するアイテムの数
  let result = [];

  for (let i = 0; i < rssItems.length; i += batchSize) {
    const batch = rssItems.slice(i, i + batchSize);
    const translatedBatch = await Promise.all(
      batch.map(async (item) => {
        const translatedTitle = await translateText(
          item.title,
          TARGET_LANGUAGE,
        );
        const translatedSnippet = await translateText(
          item.contentSnippet,
          TARGET_LANGUAGE,
        );

        return {
          title: translatedTitle.choices[0].message.content,
          contentSnippet: translatedSnippet.choices[0].message.content,
          link: item.link,
          isoDate: item.isoDate,
          og: item.og,
          dateMiliSeconds: item.dateMiliSeconds,
        };
      }),
    );

    result = [...result, ...translatedBatch];
  }

  return result;
}

// 例: RSSフィードデータ
const rssItems = JSON.parse(fs.readFileSync(itemsPath, "utf8"));

// 翻訳の実行
translateRSSItems(rssItems).then((translatedItems) => {
  if (translatedItems) {
    fs.ensureDirSync(".feed");
    fs.writeJsonSync(
      `./src/rss/items-${TARGET_LANGUAGE}.json`,
      translatedItems,
    );
  }
});
