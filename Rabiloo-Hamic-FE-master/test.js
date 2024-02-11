const a = () => {};
const b = () => {};

const c = [];

c.push(a);
c.push(b);

const d = c.filter((item) => item !== b);

console.log("first", d);
