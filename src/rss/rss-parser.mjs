import Parser from "rss-parser";
import fs from "fs-extra";
import ogs from "open-graph-scraper";
import { red } from "kolorist";

const parser = new Parser();

async function getOgImageURL(url) {
  if (!url) return null;

  const data = await ogs({ url });

  if (data.result?.ogImage && data.result.ogImage.length > 0) {
    return data.result.ogImage[0].url;
  } else {
    return null;
  }
}

async function fetchFeedItems(url) {
  try {
    const feed = await parser.parseURL(url);

    console.log(feed);

    if (!feed?.items?.length) return [];

    const feedItems = await Promise.all(
      feed.items.map(async ({ title, contentSnippet, link, isoDate }) => {
        const og = await getOgImageURL(link);
        return {
          title,
          contentSnippet: contentSnippet?.replace(/\n/g, ""),
          link,
          isoDate,
          og,
          dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
        };
      }),
    );

    return feedItems.filter(({ title, link }) => title && link);
  } catch (err) {
    console.log(red("RSSの抽出に失敗しました"));
    return err;
  }
}

(async function () {
  const data = await fetchFeedItems(process.env.BLOG_RSS_URL);

  if (data) {
    data.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);

    fs.ensureDirSync(".feed");
    fs.writeJsonSync("./src/rss/items-ja.json", data);
  }
})();
