const fs = require("fs");
//D:\Projects\LMV-QL\build\obj\engine.js
fs.readFile("./build/obj/engine.js", {}, (_err, buf) => {
    const engine = buf.toString()
        .replace(
            ";})();\n",
            ";});\n\nmodule.exports = { engine };\n");

    fs.writeFile("./engine.js", engine, () => { });
});