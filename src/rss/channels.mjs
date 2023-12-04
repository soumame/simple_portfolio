import Parser from "rss-parser";
import fs from "fs-extra";

const parser = new Parser();

async function fetchFeedItems(url) {
  try {
    const feed = await parser.parseURL(url);

    if (!feed?.items?.length) return [];

    const feedItems = await Promise.all(
      feed.items.foreach(async ({ description }) => {
        return {
          description,
        };
      }),
    );
    return feedItems;
  } catch (err) {
    console.log("channelの取得に失敗しました");
    console.log("RSSのURL：", process.env.BLOG_RSS_URL);
    return err;
  }
}

(async function () {
  const data = await fetchFeedItems(process.env.BLOG_RSS_URL);

  if (data) {
    console.log("RSSのURL：", process.env.BLOG_RSS_URL);
    console.log("出力するデータ：", data);
    fs.ensureDirSync(".feed");
    fs.writeJsonSync("./src/rss/channels.json", data);
  }
})();
