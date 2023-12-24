import { green } from "kolorist";
import fs from "fs";
import path from "path";

const filePath = path.resolve("LINKS.json");
const dictPath = path.resolve("DICTIONARY.json");

const here = path.resolve("./src/links");

fs.copyFile(filePath, `${here}/items-ja.json`, (err) => {
  console.log(green(`try copy ${filePath} to ${here}.json`));
  if (err) throw err;
});
fs.copyFile(dictPath, `${here}/DICTIONARY.json`, (err) => {
  console.log(green(`try copy ${dictPath} to ${here}.json`));
  if (err) throw err;
});
