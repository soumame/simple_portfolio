const { OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// summary-ja.jsonのパスを構築
const dictionary = fs.readFileSync("./DICTIONARY.json", "utf8");

const TARGET_LANGUAGE = "en";

const SYSTEM_PROMPT = `Translate the following text to target language: ${TARGET_LANGUAGE}\n And this is proper noun dictionary for translation(written by json): ${dictionary}`;

const inputFilePath = path.join(__dirname, "summary-ja.json");
const outputFilePath = path.join(__dirname, `summary-${TARGET_LANGUAGE}.json`);

// OpenAI API キーの設定
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
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log(`翻訳中...(${text}}`);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("翻訳中にエラーが発生しました:", error);
    return text; // エラー時は元のテキストを返す
  }
}

// 翻訳してJSONフォーマットで保存する
async function translateAndSaveAsJSON(inputPath, outputPath) {
  const textToTranslate = fs.readFileSync(inputPath, "utf8");
  const translatedText = await translateText(textToTranslate, TARGET_LANGUAGE);

  const jsonToSave = translatedText;

  fs.writeFileSync(outputPath, JSON.stringify(jsonToSave, null, 2));

  console.log(`翻訳結果を${outputPath}に保存中...`);
}

// ファイルの翻訳とJSON形式での保存を実行
translateAndSaveAsJSON(inputFilePath, outputFilePath);
