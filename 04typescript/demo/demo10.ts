// 装饰器
// 类装饰器
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

// 方法装饰器
function fndec105(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target, key, descriptor);
  // descriptor.writable = false;
  descriptor.value = function() {
    return "105--fn--dec";
  };
}
class FnTest105 {
  constructor(public name: string) {}
  @fndec105
  getName() {
    return this.name;
  }
}
const fnTest105 = new FnTest105("105 name");
console.log(fnTest105.getName(), fnTest105.name);

// 访问器装饰器
function visitDec106(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor.writable = false;
  // console.log(target, key, descriptor);
}
class VisitTest106 {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  @visitDec106
  set name(name: string) {
    this._name = name;
  }
}
const visitTest106 = new VisitTest106("106--name");
visitTest106.name = "106--name-change";
console.log(visitTest106.name);

// 属性装饰器 107
// 原型 属性
function attrDec107(target: any, key: string): any {
  // console.log(target, key);
  // descriptor 替换
  // const descriptor: PropertyDescriptor = {
  //   writable: false
  // };
  // return descriptor;
  // 修改原型上的name
  target[key] = "107--dec--name";
}
class attrTest107 {
  @attrDec107
  name = "107--name";
}
const attrtest = new attrTest107();
attrtest.name = "107--name--change";
console.log(attrtest.name, (attrtest as any).__proto__.name);

// 参数装饰器 108
// 原型 所在方法名 修饰第几个参数
function paramDec(target: any, method: string, paramIndex: number) {
  // console.log(target, method, paramIndex);
}
class Test108 {
  getInfo(name: string, @paramDec age: number) {
    console.log(age);
  }
}
const test108 = new Test108();
test108.getInfo("XXX", 108);

// 应用例子 109
const user109: any = undefined;
function catchError(msg: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      try {
        fn();
      } catch (e) {
        console.log(msg);
      }
    };
  };
}
class Person109 {
  @catchError("name 不存在")
  getName() {
    return user109.name;
  }
}
const p109 = new Person109();
p109.getName();
