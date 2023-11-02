# Simple Portfolio

- 軽量、高速なウェブサイト。
- あなたのお好みに簡単カスタマイズ。
- 数クリック、そして無料で作成可能。

[いますぐデプロイ](example.com)

## 仕組み・コンセプト

- モバイルファーストデザイン
- シンプルにあなたを表現する
  - 自己紹介ページで簡潔に伝えよう
  - Works ページであなたが生み出したものを見せつけよう。
  - Blog ページで共感を生み出そう。
  - Contact ページでたくさんの人に見つけてもらおう

## このサイトの使用方法
以下はこのサイトの使用方法となります。ご自由にお使いください。

### プロフィール画像を変更する方法
  
  `/public/images/profile.jpg` を差し替えてください。

### 名前、bio を変更する方法
  
    YOURINFO.json を編集してください。

### Works にあなたの作品を追加方法

    WORKS.json を編集してください。必要があればCMSに接続することも可能です。例えば、[Contentful](https://www.contentful.com/) などに接続して、インターネット上から管理することも可能です。

### Blog にあなたのnoteを追加する方法

    デプロイ時に設定する環境変数(Environment Variable)に、`BLOG_RSS_URL` を設定し、noteのURLの末尾に`/rss`を追加したものを入力してください。例えば、`https://note.com/yourname`の場合、`https://note.com/yourname/rss`となります。Vercelを通してデプロイする際は、Vercelのダッシュボードから設定することができます。

    また、RSSを使用して取得しているので、note以外のサービスでも使用できます。取得するRSSに合わせて、取得する内容を`So-Simple-portfolio/src/components/Blogs.astro`で変更してください。

### Contact の追加方法

    YourSNS.json を編集してください。８件以上リンクを追加するとレイアウトが崩れる恐れがあります。

## テーマカラーの変更方法
各４ページのテーマカラーを設定できます。規定値は以下の通りです。

- Home: #F9F9F9
- Works: #F9F9F9
- Blog: #F9F9F9
- Contact: #F9F9F9
