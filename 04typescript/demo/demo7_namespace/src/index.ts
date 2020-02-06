// 依赖声明 (功能上可以不写)
/// <reference path='./components.ts' />
namespace Home {
  class Header {
    constructor() {
      const ele = document.createElement("div");
      ele.innerHTML = "head";
      document.body.appendChild(ele);
    }
  }
  export class Page {
    constructor() {
      new Header();
      // 命名空间引用
      new Components.Body();
      // 命名空间
      new Components.SubComponents.sub();
    }
    user: Components.User = {
      name: "Alex"
    };
  }
}
