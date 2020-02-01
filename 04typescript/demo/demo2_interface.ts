// 接口 interface
interface Person {
  name: string;
  readonly age: number; // readonly 只读
  title?: string; // ?可有可无
  [propName: string]: any; // 可追加属性
  say(): string; // 方法
}
const getPersonName = (per: Person): void => {
  console.log(per.name);
};
const Andy = {
  name: "Andy",
  age: 22,
  say() {
    return "nice day";
  },
  eat: "rice"
};
getPersonName(Andy);
// 变量赋值可以多属性，直接传强校验多属性报错 除非设置propName
getPersonName({
  name: "Andy",
  age: 22,
  say() {
    return "nice day";
  },
  eat: "rice"
});

// 类应用接口
class User1 implements Person {
  name = "Ann";
  age = 122;
  say() {
    return "hi";
  }
}

// 接口继承
interface Teacher extends Person {
  teach(): string;
}
const getTeacherName = (per: Teacher): void => {
  console.log(per.name);
};
const Andy1 = {
  name: "Andy",
  age: 22,
  say() {
    return "nice day";
  },
  teach() {
    return "Math";
  }
};
getTeacherName(Andy1);

// 接口定义函数
interface saysth {
  (word: string): string;
}
const sayHi: saysth = (w: string) => {
  return `say: Hi! ${w}`;
};
console.log("sayHi :", sayHi("Blue bird"));
