# Simple Portfolio

- 軽量、高速。
- モバイルファーストデザイン。
- 自動でコンテンツを英語に翻訳。
- 簡単にカスタマイズ。
- 数クリックで作成可能。

## 仕組み・コンセプト

- モバイルファーストデザイン
- シンプルにあなたを表現する
  - 自己紹介ページで簡潔に伝えよう
  - Works ページであなたが生み出したものを見せつけよう。
  - Blog ページであなたの考えを発信しよう。
  - Contact ページでたくさんの人と繋がろう。
- 世界と繋がる
  - GPT3.5を使用して、英語に翻訳したページを生成。世界中の人と繋がろう。

## クイックスタート

以下はこのサイトをすぐにつくるための手順です。詳細は後述します。

### 1. Vercel にデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsoumame%2Fsimple_portfolio&env=BLOG_RSS_URL,OPENAI_API_KEY&envDescription=BLOG_RSS_URL%E3%81%AB%E3%81%AF%E3%80%81%20htttps%3A%2F%2Fnote.com%2F%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%8D%2Frss%20%E3%82%92%E3%80%81OPENAI_API_KEY%E3%81%AB%E3%81%AF%E3%80%81%20https%3A%2F%2Fplatform.openai.com%2Fapi-keys%20%E3%81%8B%E3%82%89%E7%99%BA%E8%A1%8C%E3%81%97%E3%81%9FAPI%E3%82%AD%E3%83%BC%E3%82%92%E5%85%A5%E5%8A%9B%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82%20API%E3%81%AF%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E7%BF%BB%E8%A8%B3%E3%81%AE%E7%9B%AE%E7%9A%84%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%80%82&project-name=so-simple-portfolio&repository-name=so-simple-portfolio&redirect-url=https%3A%2F%2Fso-bean.work)

ボタンをクリックして、Vercel にデプロイしてください。デプロイ時に、以下の環境変数を設定してください。

```
BLOG_RSS_URL = https://note.com/あなたのユーザー名/rss
OPENAI_API_KEY = https://platform.openai.com/api-keys から発行したAPIキーを入力してください。
```

### 2. デプロイ後に設定を変更

デプロイするときに作成されたGitリポジトリで、以下のファイルを編集してください。詳細は後述するのでそちらを参照してください。

- YOURINFO.json - 自己紹介ページの内容を変更
- TIMELINE.json - Worksページの内容を変更
- YourSNS.json - Contactページの内容を変更

内容を保存してプッシュすれば完成です。

## 各種設定

カスタマイズをしたい場合や、詳細な設定をしたい場合は、以下の手順を参照してください。

#### 名前、bio 、プロフィール画像を変更する方法

    YOURINFO.json を編集してください。以下はYOURINFO.jsonのテンプレートです。

```json
{
  "ja": [
    {
      "name": "得丸 創生",
      "subname": "So Tokumaru",
      "bio": "こんにちは！どいつもこいつも白黒ミニマルデザインを好むようなので困っちゃうなぁ",
      "icon": "https://pbs.twimg.com/profile_images/1517715992469970945/_66xagxr_400x400.jpg"
    }
  ],
  "en": [
    {
      "name": "So Tokumaru",
      "subname": "得丸創生",
      "bio": "Hi! I'm a Japanese designer. I'm interested in minimal design.",
      "icon": "https://pbs.twimg.com/profile_images/1517715992469970945/_66xagxr_400x400.jpg"
    }
  ]
}
```

特に設定を変更しなければ、YOURINFO.jsonのファイルはsrc/components/About.astroに読みこまれます。

#### Works にあなたの作品や経歴を追加する方法

    TIMELINE.json を編集してください。以下はTIMELINE.jsonのテンプレートです。

```json
[
  {
    "Title": "タイトルをここに入力します",
    "image": "写真のurlをここに入力します(例：https://cdn.example.com/example.jpg)",
    "description": "説明文をここに入力します",
    "link": "リンクを入力します。(例：https://twitter.com/so_to9)"
  }
]
```

特に設定を変更しなければ、works.jsonのファイルはsrc/timeline/にitems-ja.jsonとしてビルド時にコピーされ、GPT3.5を使用して英語に翻訳されます。

JSONで出力ができるものであれば、CMSに接続することも可能です。例えば、[Contentful](https://www.contentful.com/) などに接続して、インターネット上からjson管理することも可能です。

#### note(RSS)の設定方法

デプロイ時に設定する環境変数(Environment Variable)に、`BLOG_RSS_URL` を設定し、noteのURLの末尾に`/rss`を追加したものを入力してください。例えば、`https://note.com/yourname`の場合、`https://note.com/yourname/rss`となります。Vercelを通してデプロイする際は、Vercelのダッシュボードから設定することができます。

特に設定を変更しなければ、RSSの内容はrss-parserを使用して、src/rss/にitems-ja.jsonとしてビルド時にコピーされ、GPT3.5を使用して英語(items-en.json)に翻訳されます。

また、RSSを使用して取得しているので、note以外のサービスでも使用できます。取得するRSSに合わせて、取得する内容を`So-Simple-portfolio/src/components/Blogs.astro`で変更してください。（note以外のRSSでは動作未確認です。）

#### Contact の追加方法

    YourSNS.json を編集してください。８件以上リンクを追加するとレイアウトが崩れる恐れがあります。

## contributrion

Shu, [Twitter](https://twitter.com/shu_out)
GPT-4 [Website](https://openai.com/)
Google 先輩, [website](https://www.google.com/)
