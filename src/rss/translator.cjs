const { OpenAI } = require("openai");
const { OpenAIStream, StreamingTextResponse } = require("ai");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

// items.jsonのパスを構築
const itemsPath = path.join(__dirname, "items.json");

const SYSTEM_PROMPT = `Translate the following text to English`;
const TARGET_LANGUAGE = "English";

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
          content: `text to convert to ${targetLanguage}: ${text}`,
        },
      ],

      // prompt: `Translate the following text to :\n\n${text}`,
      temperature: 0.7,
      max_tokens: 1000,
    });
    return response;
  } catch (error) {
    console.error("Error in translation:", error);
    return text; // エラー時は元のテキストを返す
  }
}

// RSSフィードから記事を読み込み、翻訳する例
async function translateRSSItems(rssItems) {
  const promises = rssItems.map(async (item) => {
    console.log(item.title, item.contentSnippet);
    const translatedTitle = await translateText(item.title, TARGET_LANGUAGE);
    const translatedSnippet = await translateText(
      item.contentSnippet,
      TARGET_LANGUAGE,
    );

    return {
      title: translatedTitle.choices[0].message.content,
      contentSnippet: translatedSnippet.choices[0].message.content,
    };
  });
  const translatedItems = await Promise.all(promises);
  return translatedItems;
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
