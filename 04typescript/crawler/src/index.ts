import fs from "fs";
import path from "path";
import superagent from "superagent";
import leeAnalyse from "./leeAnalyse";
export interface Analyse {
  analyse: (html: string, filepath: string) => string;
}
class Crawler {
  private filepath = path.resolve(__dirname, "../data/course.json");
  // 获取 html
  async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filepath, content);
  }
  constructor(private analyse: Analyse, private url: string) {
    this.init();
  }
  async init() {
    const html = await this.getRawHtml();
    const writeIn = this.analyse.analyse(html, this.filepath);
    this.writeFile(writeIn);
  }
}
const secret = "secretKey";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyse = new leeAnalyse();
new Crawler(analyse, url);
