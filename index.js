import fs, { writeFileSync } from "fs";

//

/**
 * @param {string} name - name of the constructor
 * @param {any[]} args - args
 * @param {{[index: string]: any}} options - extra props
 */
function resolveAsR3FComponent(name, args, options) {
  const opts = Object.entries(options).map(([k, v]) => `${k}={${v}}`);

  return `<${name.replace(/\w/i, (m) =>
    m.toLowerCase()
  )} args={[${args.toString()}]} ${opts.join(" ")} />`;
}

//

/**
 *
 * @param {string[]} threeImports import statements from `three`
 * @param {string} src - Remaining soruce code
 * @param {string} animate - Converted animate function
 * @param {string[]} AppComponents - Things inside `App` return statement
 * @param {string[]} r3fImports - Imports from r3f
 * @returns {string}
 */
const template = (threeImports = [], r3fImports = [], src, animate, AppComponents = []) => {
  let useThree = "";
  r3fImports.push("Canvas")
  
  const imports = `import {
    ${r3fImports.toString()}
  } from "@react-three/fiber"
  import {${threeImports.toString()}} from "three";`;

  const App = `function App() {return <div><Canvas>\n${AppComponents.join("\n")}\n</Canvas></div>};`;

  if (animate) useThree = ``;

  return imports + src + App;
};

//

const script = fs.readFileSync("./data.js", { encoding: "utf-8" });

writeFileSync("out.js", JSON.stringify(script));
