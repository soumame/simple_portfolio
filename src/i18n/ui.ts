export const languages = {
  en: "English",
  ja: "日本語",
  // zh: "中文",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "button.readmore": "read more",
    "button.findmore": "find more articles",
    "text.bygpt":
      "As this is AI generated text, some of text or words might be incorrect.",
    "button.link": "Link",
  },
  ja: {
    "button.readmore": "もっと読む",
    "button.findmore": "さらに記事を探す",

    "text.bygpt":
      "AIによる文章生成のため、単語や説明が正確でない場合があります。",
    "button.link": "リンク",
  },
  zh: {
    "button.readmore": "更多",
    "button.findmore": "查找更多文章",

    "text.bygpt": "由于是人工智能文本生成，文字和描述可能不准确。",
    "button.link": "链接",
  },
} as const;
