let var1: string; //类型注解
var1 = "aa";
// var1 = 1;
let var2 = true; //类型推断

//原始类型string,boolean,number,symbol，undefined,null

//数组
let arr: string[];
arr = ["tom"];

//任意类型
let varAny: any[];
varAny = [1, "tom"];

//函数中的类型约束
function greet(person: string): string {
  return "hello," + person;
}
greet("abc");

//函数无返回值
function warn(): void {}

//对象类型object，不是原始类型就是对象类型
function fn1(o: object) {}
fn1({ prop: 0 });
// fn1(1); //wrong

function fn2(o: { prop: number }) {}
fn2({ prop: 1 });
// fn2({ prop2: "qq" });

//  类型别名type,自定义类型
type Type = { prop: string };
function fn3(obj: Type) {}
fn3({ prop: "tom" });

//类型断言as，把范围比较大的类型断言为更具体的类型
const one: any = "this is tom";
const strLength = (one as string).length;

//联合类型
let union: string | number;
union = "1";
union = 1;

//交叉类型
type First = { first: number };
type Second = { second: number };
type FirstAndSecond = First & Second;
function fn4(params: FirstAndSecond): FirstAndSecond {
  return { first: 1, second: 2 };
}
