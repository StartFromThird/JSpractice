import fs from "fs";
import cheerio from "cheerio";
import { Analyse } from "./index";
interface Course {
  title: string;
  num: number;
}
interface CourseRes {
  time: number;
  data: Course[];
}
interface Content {
  [propName: number]: Course[];
}
export default class leeAnalyse implements Analyse {
  // 拆html 提取对应数据
  private getInfo(html: string) {
    let courseDesc: Course[] = [];
    const $ = cheerio.load(html);
    const doms = $(".course-item>img")
      .next()
      .next()
      .text();
    $(".course-item").map((index, ele) => {
      const domP = $(ele).find(".course-desc");
      const title = domP.eq(0).text();
      const num = parseInt(
        domP
          .eq(1)
          .text()
          .split("：")[1],
        10
      );
      courseDesc.push({
        title,
        num
      });
    });
    return {
      time: new Date().getTime(),
      data: courseDesc
    };
  }
  // 即将写入当前数据
  private writeInInfo(info: CourseRes, filepath: string) {
    let writeIn: Content = {};
    if (fs.existsSync(filepath)) {
      writeIn = JSON.parse(fs.readFileSync(filepath, "utf-8"));
    }
    writeIn[info.time] = info.data;
    return writeIn;
  }
  public analyse(html: string, filepath: string) {
    const info = this.getInfo(html);
    const writeIn = this.writeInInfo(info, filepath);
    return JSON.stringify(writeIn);
  }
}
