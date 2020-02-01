interface Point {
  x: number;
  y: number;
}
function demo1(data: Point) {
  console.log("示例1-", data.x + data.y);
  return data.x + data.y;
}
demo1({
  x: 2,
  y: 3
});
// 静态类型
// 基础类型 null undefined boolean num string symbol void
const lastname: string = "Alex";
// 对象类型 对象 数组 函数 类
const o: {
  name: string;
  age: number;
} = {
  name: "alex",
  age: 18
};
const numbersArr: number[] = [1, 2, 3];
const sum: () => number = () => {
  return 111;
};
class Person {}
const alex: Person = new Person();
// 函数
// 返回值类型 void 没返回值 never 不会执行到最后
function add(a: number, b: number): number {
  return a + b;
}
// 解构参数
function add1({ a, b }: { a: number; b: number }): number {
  return a + b;
}
// 数组
const arr: (number | string)[] = ["1", 1];
type User = { name: string; age: number }; // type 类型别名
const objArr: User[] = [{ name: "Alex", age: 22 }];
// 元组 已知长度和类型顺序
const info: [string, string, number] = ["Alex", "f", 20];
const infos: [string, string, number][] = [
  ["Alex", "f", 20],
  ["Arthur", "m", 20]
];
