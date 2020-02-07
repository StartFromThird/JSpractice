// 装饰器
function dec10(constructor: any) {
  console.log("10 dec");
  constructor.prototype.getName = () => {
    console.log("10 name");
  };
}
function dec101(constructor: any) {
  console.log("101 dec");
}
// 多个装饰器 先101 后10 创建后执行
@dec10
@dec101
class Test {}

const t10 = new Test();
(t10 as any).getName();

// 部分情况下需要装饰器
function isDec(t: boolean) {
  if (t) {
    return function dec102(constructor: any) {
      console.log("102 dec");
    };
  } else {
    return function dec102(constructor: any) {};
  }
}
@isDec(false)
class Test102 {}

// 先执行class constructor, 后执行装饰器的
function dec103<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    name = `103--dec`;
  };
}
@dec103
class Test103 {
  constructor(public name: string) {
    console.log("103--1", this.name);
  }
}
const test103 = new Test103("name");
console.log(test103.name);

// 更标准的写法
function dec104() {
  return function<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      // name = `104--dec`;
      getName() {
        return `${this.name}--dec`;
      }
    };
  };
}
const Test104 = dec104()(
  class {
    constructor(public name: string) {}
  }
);
const test104 = new Test104("104--name");
console.log(test104.name);
console.log(test104.getName());
