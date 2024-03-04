import { green } from "kolorist";
import fs from "fs";
import path from "path";

const timelinePath = path.resolve("TIMELINE.json");
const infoPath = path.resolve("YOURINFO.json");
const dictPath = path.resolve("DICTIONARY.json");

const here = path.resolve("./src/who");

fs.copyFile(timelinePath, `${here}/timeline-ja.json`, (err) => {
  console.log(green(`try copy ${timelinePath} to ${here}.json`));
  if (err) throw err;
});
fs.copyFile(infoPath, `${here}/info-ja.json`, (err) => {
  console.log(green(`try copy ${infoPath} to ${here}.json`));
  if (err) throw err;
});
fs.copyFile(dictPath, `${here}/DICTIONARY.json`, (err) => {
  console.log(green(`try copy ${dictPath} to ${here}.json`));
  if (err) throw err;
});
