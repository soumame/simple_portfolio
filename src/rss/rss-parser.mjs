import Parser from "rss-parser";
import fs from "fs-extra";
import ogs from "open-graph-scraper";
import { red } from "kolorist";
import path from "path";
import { green } from "kolorist";

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
      feed.items
        .slice(0, 20)
        .map(async ({ title, contentSnippet, link, isoDate }) => {
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
  const filePath = path.resolve("RSS.json");
  const here = path.resolve("./src/rss");

  fs.copyFile(filePath, `${here}/items-ja.json`, (err) => {
    console.log(green(`try copy ${filePath} to ${here}.json`));
    if (err) throw err;
  });

  const rssSources = fs.readJsonSync(filePath);

  const data = [];
  for (const { url } of rssSources) {
    const feedItems = await fetchFeedItems(url);
    if (Array.isArray(feedItems)) {
      data.push(...feedItems);
    }
  }

  if (data.length) {
    try {
      data.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);

      fs.ensureDirSync(".feed");
      fs.writeJsonSync("./src/rss/items-ja.json", data);
    } catch (err) {
      console.log(red("rssのJSONファイルの書き込みに失敗しました"));
      console.log(err);
    }
  }
})();
