import fs from "fs";
import path from "path";
export default function Metadata(props) {
  //YOURINFOから読み込む
  const infoPath = path.resolve("YOURINFO.json");
  const SNSPath = path.resolve("YourSNS.json");

  const rawData = fs.readFileSync(infoPath);
  const rawSNS = fs.readFileSync(SNSPath);

  const jsonData = JSON.parse(rawData);
  const SNSData = JSON.parse(rawSNS);

  const janame = jsonData.ja[0].name;
  const enname = jsonData.ja[0].name;
  const jabio = jsonData.ja[0].bio;
  const enbio = jsonData.en[0].bio;
  const jaicon = jsonData.ja[0].icon;
  const enicon = jsonData.en[0].icon;

  const sitePath = props.path;

  const twitterLink = SNSData.find((item) => item.title === "Twitter")?.link;
  const twitterUsername = twitterLink.split("/").pop();

  const bioo = props.lang + "bio";
  const bio = eval(bioo);
  const iconn = props.lang + "icon";
  const icon = eval(iconn);
  const namee = props.lang + "name";
  const name = eval(namee);

  return (
    <head>
      {" "}
      <meta name="description" content={bio} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>{name}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="icon" href={icon}></link>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@1,300;1,700&family=Noto+Sans+JP:wght@200;400;700&family=Zen+Kaku+Gothic+Antique:wght@300&display=swap"
        rel="stylesheet"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:image" content={icon} />
      <meta property="og:url" content={sitePath} />
    </head>
  );
}
