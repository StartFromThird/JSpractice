class Animal {
  name = "Animal";
  getName() {
    return this.name;
  }
}
class Cat extends Animal {
  // 重写父类方法后调父类方法
  getName() {
    return super.getName() + "-- Cat";
  }
}
const c = new Cat();
console.log("super", c.getName());

// 访问类型 private protected public
// 不写，默认public
// public    允许在类的内外被调用
// private   允许在类内被使用
// protected 允许在类内及继承的子类中使用
class Pet {
  name = "Pet";
  getName() {
    return this.name;
  }
  protected isAggressive = false;
  isSafeForHuman() {
    return !this.isAggressive;
  }
}
class Dog extends Pet {
  name = "Dog";
  private legNum = 4;
  // 子类访问类型 要和 父类一致
  // protected getName() {
  // }
  getLegNum() {
    return this.legNum;
  }
  isSafeForHuman() {
    return !this.isAggressive;
  }
}
const p = new Pet();
const d = new Dog();
console.log("public", d.name, p.name);
console.log("private", d.getLegNum());
// console.log("private", d.legNum);
console.log("protected", p.isSafeForHuman());
// console.log("protected", p.isAggressive);
console.log("protected", d.isSafeForHuman());

// constructor
class ConF {
  // public name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
  // 同上 简写
  // 创建实例时执行
  constructor(public name: string) {
    this.name = name;
  }
}
class ConS extends ConF {
  constructor(public age: number) {
    // 必须调用父类构造器，传父类构造器对应参数
    super("ConSName");
  }
}
const cons = new ConS(22);
console.log("constructor", cons.name, cons.age);

// get set 静态属性
// 保护私有属性
class GSF {
  constructor(private _name: string) {}
  get fullName() {
    return this._name + " Ham";
  }
  set name(n: string) {
    this._name = n.split(" ")[0];
  }
}
const gs = new GSF("Alex");
console.log("get", gs.fullName);
gs.name = "Andy Alex";
console.log("set", gs.fullName);

// 单例模式
class Single {
  // static 类的方法或属性，不是实例的
  private static instance: Single;
  // 规避 new Demo()
  private constructor(public i: number) {}
  // 没有实例，生成一个存下来
  // 有实例，返回之前的
  static getInstance() {
    if (!this.instance) {
      this.instance = new Single(0);
    }
    return this.instance;
  }
  getNum() {
    return ++this.i;
  }
}
const single = Single.getInstance();
const single1 = Single.getInstance();
console.log("单例模式", single.getNum(), single1.getNum());

// readonly
class RO {
  constructor(public readonly name: string) {}
}
const ro = new RO("Alex");
console.log("readonly", ro.name);
// ro.name = 'djaoi'

// 抽象类
// 抽象类只能继承
abstract class Geom {
  getType() {
    return "Gemo";
  }
  // 抽象方法
  abstract getArea(): number;
}
class Circle extends Geom {
  getArea() {
    return 20;
  }
}
