function greeting (person: string, msg?: string, age = 20): string {
  return "hi," + person;
}
greeting("tom");

//函数重载，先声明再重载
//watch(fn)
function watch (cb1: () => void): void; //watch1
function watch (cb1: () => void, cb2: (v1: any, v2: any) => void): void; //watch2
//实现
function watch (cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 & cb2) {
    clog("执行watch2");
  } else {
    clog("执行watch1");
  }
}
