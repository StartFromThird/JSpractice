// 泛型
// 函数
function join60<T>(f: T, s: T) {
  return `${f}${s}`;
}
console.log("<T>", join60<number>(1, 6), join60<string>(`11`, `ab`));
// 不同参数 不同类型
function join61<T, P>(f: T, s: P) {
  return `${f}${s}`;
}
console.log("<T, P>", join61<number, string>(1, "aaa"));
// 不同参数 不同类型
function join62<T>(f: T): T {
  return f;
}
console.log("<T>():T", join62<number>(1));

// class
interface param60 {
  name: string;
}
class C61<T extends param60> {
  constructor(private data: T[]) {}
  getName(index: number): string {
    return this.data[index].name;
  }
}
const c61 = new C61([
  {
    name: "Class",
    age: 128
  }
]);
console.log(c61.getName(0));

class C62<T extends number | string> {
  constructor(private data: T[]) {}
  getName(index: number): T {
    return this.data[index];
  }
}
const c62 = new C62([6, "62"]);
console.log(c62.getName(0), c62.getName(1));
const c621 = new C62<string>(["621"]);
console.log(c621.getName(0));

// 泛型作为具体类型注解
function join63<T>(params: T) {
  return params;
}
const fc: <T>(params: T) => T = join63;
