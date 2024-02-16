const fs = require("fs/promises");
const path = require("path");

const read = () => {
  const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8");
  return result;
};

read().then((res) => console.log(res));
console.log("hi");
