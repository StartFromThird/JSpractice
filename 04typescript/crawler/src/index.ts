import superagent from "superagent";
import cheerio from "cheerio";
interface Course {
  title: string;
  num: number;
}
interface CourseRes {
  time: number;
  data: Course[];
}
class Crawler {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  // 获取 html
  async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
  }
  // 拆html 提取对应数据
  getInfo(html: string) {
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
  constructor() {
    this.init();
  }
  async init() {
    const html = await this.getRawHtml();
    const info = this.getInfo(html);
  }
}
const crawler = new Crawler();
