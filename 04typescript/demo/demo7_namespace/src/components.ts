namespace Components {
  export class Body {
    constructor() {
      const ele = document.createElement("div");
      ele.innerHTML = "components / body";
      document.body.appendChild(ele);
    }
  }
  // 子命名空间
  export namespace SubComponents {
    export class sub {
      constructor() {
        console.log("子命名空间");
      }
    }
  }
  // 接口
  export interface User {
    name: string;
  }
}
