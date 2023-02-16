const fs = require("fs");

const compile = (code) => {
    const source = code.replace(";})();\n", ";});");

    const engine = eval(`${source} engine`).toString();

    const engineRegex = /^{\"engine\":\"(?<engine>.*)\"}$/;

    const engineMatch = JSON.stringify({ engine }).match(engineRegex);

    return `export const engine = \"${engineMatch.groups["engine"]}\";`;
}

fs.readFile("./build/obj/engine.js", {}, (_err, buf) => {
    const code = buf.toString();

    fs.writeFile("./engine.ts", compile(code), () => { });
});