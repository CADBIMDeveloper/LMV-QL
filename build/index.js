"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // build/obj/src/filtergrammar.ohm-bundle.js
  var require_filtergrammar_ohm_bundle = __commonJS({
    "build/obj/src/filtergrammar.ohm-bundle.js"(exports, module) {
      "use strict";
      var ohm = __require("../node_modules/ohm-js/index.js");
      var result = ohm.makeRecipe(["grammar", { "source": 'Filter {\r\n    Exp = BoolOr\r\n    \r\n    BoolOr\r\n        = BoolOr orOperation BoolAnd -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = BoolAnd andOperation PriExp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = "(" Exp ")" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | NonEqualityExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence "=" expressionConst\r\n    \r\n    LessThanExpr = propertySequence "<" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence ">" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence "<=" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence ">=" expressionConst\r\n\r\n    NonEqualityExpr = propertySequence nonEqualSign expressionConst\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence "." categoryOrProperty --ofPropertySequence\r\n        | directAnyPropertySequence "." categoryOrProperty --ofDirectAnyPropertySequence\r\n        | directAnyProperty "." categoryOrProperty --ofDirectAny\r\n                    \r\n    directProperty \r\n        = categoryOrProperty "." categoryOrProperty --ofCategory\r\n        | anyProperty "." categoryOrProperty --ofAnyProperty\r\n        \r\n    directAnyPropertySequence = propertySequence "." anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty "." anyProperty --sequenced\r\n        | categoryOrProperty "." anyProperty --ofCategory\r\n        | anyProperty "." anyProperty --ofAny\r\n        \r\n    exactElement = propertySequence "!" --ofPropertySequence\r\n        | categoryOrProperty "!" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = "[" identificator "]" --inBrackets \r\n        | alnum+ --value\r\n\r\n    nonEqualSign = "<>" | "!="\r\n        \r\n    andOperation = andWord | "&&" | "&"\r\n\r\n    andWord = ("A" | "a")("N" | "n")("D" | "d")\r\n    \r\n    orOperation = orWord | "||" | "|"\r\n\r\n    orWord = ("O" | "o")("R" | "r")\r\n    \r\n    anyProperty = "*"\r\n    \r\n    identificator = (~"]" ~"[" any)+\r\n    \r\n    expressionConst = textConst | number\r\n    \r\n    textConst (target text value)\r\n        = "\\"" textValue "\\""\r\n        \r\n    textValue = textChar*\r\n    \r\n    textChar\r\n        = "\\\\\\""\r\n        | (~"\\"" any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = "-" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* "." digit+\r\n}' }, "Filter", null, "Exp", { "Exp": ["define", { "sourceInterval": [14, 26] }, null, [], ["app", { "sourceInterval": [20, 26] }, "BoolOr", []]], "BoolOr_or": ["define", { "sourceInterval": [56, 88] }, null, [], ["seq", { "sourceInterval": [56, 82] }, ["app", { "sourceInterval": [56, 62] }, "BoolOr", []], ["app", { "sourceInterval": [63, 74] }, "orOperation", []], ["app", { "sourceInterval": [75, 82] }, "BoolAnd", []]]], "BoolOr": ["define", { "sourceInterval": [38, 107] }, null, [], ["alt", { "sourceInterval": [56, 107] }, ["app", { "sourceInterval": [56, 82] }, "BoolOr_or", []], ["app", { "sourceInterval": [100, 107] }, "BoolAnd", []]]], "BoolAnd_and": ["define", { "sourceInterval": [135, 169] }, null, [], ["seq", { "sourceInterval": [135, 162] }, ["app", { "sourceInterval": [135, 142] }, "BoolAnd", []], ["app", { "sourceInterval": [143, 155] }, "andOperation", []], ["app", { "sourceInterval": [156, 162] }, "PriExp", []]]], "BoolAnd": ["define", { "sourceInterval": [115, 187] }, null, [], ["alt", { "sourceInterval": [135, 187] }, ["app", { "sourceInterval": [135, 162] }, "BoolAnd_and", []], ["app", { "sourceInterval": [181, 187] }, "PriExp", []]]], "PriExp_paren": ["define", { "sourceInterval": [222, 242] }, null, [], ["seq", { "sourceInterval": [222, 233] }, ["terminal", { "sourceInterval": [222, 225] }, "("], ["app", { "sourceInterval": [226, 229] }, "Exp", []], ["terminal", { "sourceInterval": [230, 233] }, ")"]]], "PriExp": ["define", { "sourceInterval": [203, 267] }, null, [], ["alt", { "sourceInterval": [222, 267] }, ["app", { "sourceInterval": [222, 233] }, "PriExp_paren", []], ["app", { "sourceInterval": [254, 267] }, "ComparisonExp", []]]], "ComparisonExp": ["define", { "sourceInterval": [275, 410] }, null, [], ["alt", { "sourceInterval": [291, 410] }, ["app", { "sourceInterval": [291, 303] }, "EqualityExpr", []], ["app", { "sourceInterval": [306, 318] }, "LessThanExpr", []], ["app", { "sourceInterval": [321, 333] }, "MoreThanExpr", []], ["app", { "sourceInterval": [336, 355] }, "LessThanOrEqualExpr", []], ["app", { "sourceInterval": [358, 377] }, "MoreThanOrEqualExpr", []], ["app", { "sourceInterval": [380, 395] }, "NonEqualityExpr", []], ["app", { "sourceInterval": [398, 410] }, "exactElement", []]]], "EqualityExpr": ["define", { "sourceInterval": [418, 469] }, null, [], ["seq", { "sourceInterval": [433, 469] }, ["app", { "sourceInterval": [433, 449] }, "propertySequence", []], ["terminal", { "sourceInterval": [450, 453] }, "="], ["app", { "sourceInterval": [454, 469] }, "expressionConst", []]]], "LessThanExpr": ["define", { "sourceInterval": [481, 532] }, null, [], ["seq", { "sourceInterval": [496, 532] }, ["app", { "sourceInterval": [496, 512] }, "propertySequence", []], ["terminal", { "sourceInterval": [513, 516] }, "<"], ["app", { "sourceInterval": [517, 532] }, "expressionConst", []]]], "MoreThanExpr": ["define", { "sourceInterval": [544, 595] }, null, [], ["seq", { "sourceInterval": [559, 595] }, ["app", { "sourceInterval": [559, 575] }, "propertySequence", []], ["terminal", { "sourceInterval": [576, 579] }, ">"], ["app", { "sourceInterval": [580, 595] }, "expressionConst", []]]], "LessThanOrEqualExpr": ["define", { "sourceInterval": [607, 666] }, null, [], ["seq", { "sourceInterval": [629, 666] }, ["app", { "sourceInterval": [629, 645] }, "propertySequence", []], ["terminal", { "sourceInterval": [646, 650] }, "<="], ["app", { "sourceInterval": [651, 666] }, "expressionConst", []]]], "MoreThanOrEqualExpr": ["define", { "sourceInterval": [678, 737] }, null, [], ["seq", { "sourceInterval": [700, 737] }, ["app", { "sourceInterval": [700, 716] }, "propertySequence", []], ["terminal", { "sourceInterval": [717, 721] }, ">="], ["app", { "sourceInterval": [722, 737] }, "expressionConst", []]]], "NonEqualityExpr": ["define", { "sourceInterval": [745, 808] }, null, [], ["seq", { "sourceInterval": [763, 808] }, ["app", { "sourceInterval": [763, 779] }, "propertySequence", []], ["app", { "sourceInterval": [780, 792] }, "nonEqualSign", []], ["app", { "sourceInterval": [793, 808] }, "expressionConst", []]]], "propertySequence": ["define", { "sourceInterval": [816, 860] }, null, [], ["alt", { "sourceInterval": [835, 860] }, ["app", { "sourceInterval": [835, 843] }, "property", []], ["app", { "sourceInterval": [846, 860] }, "directProperty", []]]], "property_ofPropertySequence": ["define", { "sourceInterval": [910, 970] }, null, [], ["seq", { "sourceInterval": [910, 949] }, ["app", { "sourceInterval": [910, 926] }, "propertySequence", []], ["terminal", { "sourceInterval": [927, 930] }, "."], ["app", { "sourceInterval": [931, 949] }, "categoryOrProperty", []]]], "property_ofDirectAnyPropertySequence": ["define", { "sourceInterval": [982, 1060] }, null, [], ["seq", { "sourceInterval": [982, 1030] }, ["app", { "sourceInterval": [982, 1007] }, "directAnyPropertySequence", []], ["terminal", { "sourceInterval": [1008, 1011] }, "."], ["app", { "sourceInterval": [1012, 1030] }, "categoryOrProperty", []]]], "property_ofDirectAny": ["define", { "sourceInterval": [1072, 1126] }, null, [], ["seq", { "sourceInterval": [1072, 1112] }, ["app", { "sourceInterval": [1072, 1089] }, "directAnyProperty", []], ["terminal", { "sourceInterval": [1090, 1093] }, "."], ["app", { "sourceInterval": [1094, 1112] }, "categoryOrProperty", []]]], "property": ["define", { "sourceInterval": [888, 1126] }, null, [], ["alt", { "sourceInterval": [910, 1126] }, ["app", { "sourceInterval": [910, 949] }, "property_ofPropertySequence", []], ["app", { "sourceInterval": [982, 1030] }, "property_ofDirectAnyPropertySequence", []], ["app", { "sourceInterval": [1072, 1112] }, "property_ofDirectAny", []]]], "directProperty_ofCategory": ["define", { "sourceInterval": [1181, 1235] }, null, [], ["seq", { "sourceInterval": [1181, 1222] }, ["app", { "sourceInterval": [1181, 1199] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1200, 1203] }, "."], ["app", { "sourceInterval": [1204, 1222] }, "categoryOrProperty", []]]], "directProperty_ofAnyProperty": ["define", { "sourceInterval": [1247, 1297] }, null, [], ["seq", { "sourceInterval": [1247, 1281] }, ["app", { "sourceInterval": [1247, 1258] }, "anyProperty", []], ["terminal", { "sourceInterval": [1259, 1262] }, "."], ["app", { "sourceInterval": [1263, 1281] }, "categoryOrProperty", []]]], "directProperty": ["define", { "sourceInterval": [1154, 1297] }, null, [], ["alt", { "sourceInterval": [1181, 1297] }, ["app", { "sourceInterval": [1181, 1222] }, "directProperty_ofCategory", []], ["app", { "sourceInterval": [1247, 1281] }, "directProperty_ofAnyProperty", []]]], "directAnyPropertySequence": ["define", { "sourceInterval": [1313, 1373] }, null, [], ["seq", { "sourceInterval": [1341, 1373] }, ["app", { "sourceInterval": [1341, 1357] }, "propertySequence", []], ["terminal", { "sourceInterval": [1358, 1361] }, "."], ["app", { "sourceInterval": [1362, 1373] }, "anyProperty", []]]], "directAnyProperty_sequenced": ["define", { "sourceInterval": [1409, 1454] }, null, [], ["seq", { "sourceInterval": [1409, 1442] }, ["app", { "sourceInterval": [1409, 1426] }, "directAnyProperty", []], ["terminal", { "sourceInterval": [1427, 1430] }, "."], ["app", { "sourceInterval": [1431, 1442] }, "anyProperty", []]]], "directAnyProperty_ofCategory": ["define", { "sourceInterval": [1466, 1513] }, null, [], ["seq", { "sourceInterval": [1466, 1500] }, ["app", { "sourceInterval": [1466, 1484] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1485, 1488] }, "."], ["app", { "sourceInterval": [1489, 1500] }, "anyProperty", []]]], "directAnyProperty_ofAny": ["define", { "sourceInterval": [1525, 1560] }, null, [], ["seq", { "sourceInterval": [1525, 1552] }, ["app", { "sourceInterval": [1525, 1536] }, "anyProperty", []], ["terminal", { "sourceInterval": [1537, 1540] }, "."], ["app", { "sourceInterval": [1541, 1552] }, "anyProperty", []]]], "directAnyProperty": ["define", { "sourceInterval": [1389, 1560] }, null, [], ["alt", { "sourceInterval": [1409, 1560] }, ["app", { "sourceInterval": [1409, 1442] }, "directAnyProperty_sequenced", []], ["app", { "sourceInterval": [1466, 1500] }, "directAnyProperty_ofCategory", []], ["app", { "sourceInterval": [1525, 1552] }, "directAnyProperty_ofAny", []]]], "exactElement_ofPropertySequence": ["define", { "sourceInterval": [1591, 1632] }, null, [], ["seq", { "sourceInterval": [1591, 1611] }, ["app", { "sourceInterval": [1591, 1607] }, "propertySequence", []], ["terminal", { "sourceInterval": [1608, 1611] }, "!"]]], "exactElement_ofCategory": ["define", { "sourceInterval": [1644, 1679] }, null, [], ["seq", { "sourceInterval": [1644, 1666] }, ["app", { "sourceInterval": [1644, 1662] }, "categoryOrProperty", []], ["terminal", { "sourceInterval": [1663, 1666] }, "!"]]], "exactElement": ["define", { "sourceInterval": [1576, 1679] }, null, [], ["alt", { "sourceInterval": [1591, 1679] }, ["app", { "sourceInterval": [1591, 1611] }, "exactElement_ofPropertySequence", []], ["app", { "sourceInterval": [1644, 1666] }, "exactElement_ofCategory", []]]], "categoryOrProperty_inBrackets": ["define", { "sourceInterval": [1752, 1786] }, null, [], ["seq", { "sourceInterval": [1752, 1773] }, ["terminal", { "sourceInterval": [1752, 1755] }, "["], ["app", { "sourceInterval": [1756, 1769] }, "identificator", []], ["terminal", { "sourceInterval": [1770, 1773] }, "]"]]], "categoryOrProperty_value": ["define", { "sourceInterval": [1799, 1813] }, null, [], ["plus", { "sourceInterval": [1799, 1805] }, ["app", { "sourceInterval": [1799, 1804] }, "alnum", []]]], "categoryOrProperty": ["define", { "sourceInterval": [1691, 1813] }, "element category or property", [], ["alt", { "sourceInterval": [1752, 1813] }, ["app", { "sourceInterval": [1752, 1773] }, "categoryOrProperty_inBrackets", []], ["app", { "sourceInterval": [1799, 1805] }, "categoryOrProperty_value", []]]], "nonEqualSign": ["define", { "sourceInterval": [1821, 1847] }, null, [], ["alt", { "sourceInterval": [1836, 1847] }, ["terminal", { "sourceInterval": [1836, 1840] }, "<>"], ["terminal", { "sourceInterval": [1843, 1847] }, "!="]]], "andOperation": ["define", { "sourceInterval": [1863, 1898] }, null, [], ["alt", { "sourceInterval": [1878, 1898] }, ["app", { "sourceInterval": [1878, 1885] }, "andWord", []], ["terminal", { "sourceInterval": [1888, 1892] }, "&&"], ["terminal", { "sourceInterval": [1895, 1898] }, "&"]]], "andWord": ["define", { "sourceInterval": [1906, 1949] }, null, [], ["seq", { "sourceInterval": [1916, 1949] }, ["alt", { "sourceInterval": [1917, 1926] }, ["terminal", { "sourceInterval": [1917, 1920] }, "A"], ["terminal", { "sourceInterval": [1923, 1926] }, "a"]], ["alt", { "sourceInterval": [1928, 1937] }, ["terminal", { "sourceInterval": [1928, 1931] }, "N"], ["terminal", { "sourceInterval": [1934, 1937] }, "n"]], ["alt", { "sourceInterval": [1939, 1948] }, ["terminal", { "sourceInterval": [1939, 1942] }, "D"], ["terminal", { "sourceInterval": [1945, 1948] }, "d"]]]], "orOperation": ["define", { "sourceInterval": [1961, 1994] }, null, [], ["alt", { "sourceInterval": [1975, 1994] }, ["app", { "sourceInterval": [1975, 1981] }, "orWord", []], ["terminal", { "sourceInterval": [1984, 1988] }, "||"], ["terminal", { "sourceInterval": [1991, 1994] }, "|"]]], "orWord": ["define", { "sourceInterval": [2002, 2033] }, null, [], ["seq", { "sourceInterval": [2011, 2033] }, ["alt", { "sourceInterval": [2012, 2021] }, ["terminal", { "sourceInterval": [2012, 2015] }, "O"], ["terminal", { "sourceInterval": [2018, 2021] }, "o"]], ["alt", { "sourceInterval": [2023, 2032] }, ["terminal", { "sourceInterval": [2023, 2026] }, "R"], ["terminal", { "sourceInterval": [2029, 2032] }, "r"]]]], "anyProperty": ["define", { "sourceInterval": [2045, 2062] }, null, [], ["terminal", { "sourceInterval": [2059, 2062] }, "*"]], "identificator": ["define", { "sourceInterval": [2074, 2106] }, null, [], ["plus", { "sourceInterval": [2090, 2106] }, ["seq", { "sourceInterval": [2091, 2104] }, ["not", { "sourceInterval": [2091, 2095] }, ["terminal", { "sourceInterval": [2092, 2095] }, "]"]], ["not", { "sourceInterval": [2096, 2100] }, ["terminal", { "sourceInterval": [2097, 2100] }, "["]], ["app", { "sourceInterval": [2101, 2104] }, "any", []]]]], "expressionConst": ["define", { "sourceInterval": [2118, 2154] }, null, [], ["alt", { "sourceInterval": [2136, 2154] }, ["app", { "sourceInterval": [2136, 2145] }, "textConst", []], ["app", { "sourceInterval": [2148, 2154] }, "number", []]]], "textConst": ["define", { "sourceInterval": [2166, 2226] }, "target text value", [], ["seq", { "sourceInterval": [2207, 2226] }, ["terminal", { "sourceInterval": [2207, 2211] }, '"'], ["app", { "sourceInterval": [2212, 2221] }, "textValue", []], ["terminal", { "sourceInterval": [2222, 2226] }, '"']]], "textValue": ["define", { "sourceInterval": [2242, 2263] }, null, [], ["star", { "sourceInterval": [2254, 2263] }, ["app", { "sourceInterval": [2254, 2262] }, "textChar", []]]], "textChar": ["define", { "sourceInterval": [2275, 2324] }, null, [], ["alt", { "sourceInterval": [2295, 2324] }, ["terminal", { "sourceInterval": [2295, 2301] }, '\\"'], ["seq", { "sourceInterval": [2313, 2324] }, ["not", { "sourceInterval": [2314, 2319] }, ["terminal", { "sourceInterval": [2315, 2319] }, '"']], ["app", { "sourceInterval": [2320, 2323] }, "any", []]]]], "number": ["define", { "sourceInterval": [2340, 2394] }, null, [], ["alt", { "sourceInterval": [2356, 2394] }, ["app", { "sourceInterval": [2356, 2370] }, "positiveNumber", []], ["app", { "sourceInterval": [2380, 2394] }, "negativeNumber", []]]], "negativeNumber": ["define", { "sourceInterval": [2408, 2443] }, null, [], ["seq", { "sourceInterval": [2425, 2443] }, ["terminal", { "sourceInterval": [2425, 2428] }, "-"], ["app", { "sourceInterval": [2429, 2443] }, "positiveNumber", []]]], "positiveNumber": ["define", { "sourceInterval": [2455, 2498] }, null, [], ["alt", { "sourceInterval": [2472, 2498] }, ["app", { "sourceInterval": [2472, 2482] }, "realNumber", []], ["app", { "sourceInterval": [2485, 2498] }, "integerNumber", []]]], "integerNumber": ["define", { "sourceInterval": [2512, 2534] }, null, [], ["plus", { "sourceInterval": [2528, 2534] }, ["app", { "sourceInterval": [2528, 2533] }, "digit", []]]], "realNumber": ["define", { "sourceInterval": [2546, 2576] }, null, [], ["seq", { "sourceInterval": [2559, 2576] }, ["star", { "sourceInterval": [2559, 2565] }, ["app", { "sourceInterval": [2559, 2564] }, "digit", []]], ["terminal", { "sourceInterval": [2566, 2569] }, "."], ["plus", { "sourceInterval": [2570, 2576] }, ["app", { "sourceInterval": [2570, 2575] }, "digit", []]]]] }]);
      module.exports = result;
    }
  });

  // build/obj/src/expandedWildcategoriesFactory.js
  var require_expandedWildcategoriesFactory = __commonJS({
    "build/obj/src/expandedWildcategoriesFactory.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.expandTemplateCategoriesForValue = exports.expandTemplateCategories = void 0;
      var expandTemplateCategories = (templateCategories, targetLength) => {
        if (templateCategories.length > targetLength)
          throw new Error("Template categories count should not exceed target categories array");
        const templates = [];
        expand(templates, [], templateCategories, 0, targetLength);
        return templates;
      };
      exports.expandTemplateCategories = expandTemplateCategories;
      var expandTemplateCategoriesForValue = (templateCategories, targetLength) => {
        let templates = [];
        for (let i = templateCategories.length; i <= targetLength; i++)
          templates = templates.concat((0, exports.expandTemplateCategories)(templateCategories, i));
        return templates;
      };
      exports.expandTemplateCategoriesForValue = expandTemplateCategoriesForValue;
      var expand = (templates, currentTemplate, templateCategories, currentIndex, targetLength) => {
        if (currentTemplate.length === targetLength) {
          if (currentIndex === templateCategories.length)
            templates.push(currentTemplate);
          return;
        }
        if (currentIndex < templateCategories.length && templateCategories[currentIndex] !== "*") {
          currentTemplate.push(templateCategories[currentIndex]);
          expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);
          return;
        }
        if (currentIndex >= templateCategories.length) {
          currentTemplate.push("*");
          expand(templates, currentTemplate, templateCategories, currentIndex, targetLength);
          return;
        }
        if (templateCategories[currentIndex] === "*") {
          const maxInsertsCount = targetLength - currentTemplate.length;
          for (let i = 2; i < maxInsertsCount; ++i) {
            const template = [...currentTemplate];
            for (let j = 0; j < i; ++j)
              template.push("*");
            expand(templates, template, templateCategories, currentIndex + 1, targetLength);
          }
          currentTemplate.push("*");
          expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);
        }
      };
    }
  });

  // build/obj/src/elementCategoriesComparer.js
  var require_elementCategoriesComparer = __commonJS({
    "build/obj/src/elementCategoriesComparer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.compareCategories = void 0;
      var expandedWildcategoriesFactory_1 = require_expandedWildcategoriesFactory();
      var compareCategories = (elementCategories, templateCategories) => {
        if (templateCategories.length > elementCategories.length)
          return false;
        const expandedTemplates = (0, expandedWildcategoriesFactory_1.expandTemplateCategories)(templateCategories, elementCategories.length);
        for (const template of expandedTemplates)
          if (validate(elementCategories, template))
            return true;
        return false;
      };
      exports.compareCategories = compareCategories;
      var validate = (elementCategories, templateCategories) => {
        for (let i = 0; i < templateCategories.length; i++) {
          if (templateCategories[i] !== "*" && elementCategories[i] !== templateCategories[i])
            return false;
        }
        return true;
      };
    }
  });

  // build/obj/src/numbersComparison.js
  var require_numbersComparison = __commonJS({
    "build/obj/src/numbersComparison.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAlmostEqualOrMoreThan = exports.isAlmostEqualOrLessThan = exports.isMoreThan = exports.isLessThan = exports.isAlmostEqual = void 0;
      var isAlmostEqual = (x, y, tolerance = 1e-5) => Math.abs(x - y) < tolerance;
      exports.isAlmostEqual = isAlmostEqual;
      var isLessThan = (x, y, tolerance = 1e-5) => x < y && !(0, exports.isAlmostEqual)(x, y, tolerance);
      exports.isLessThan = isLessThan;
      var isMoreThan = (x, y, tolerance = 1e-5) => x > y && !(0, exports.isAlmostEqual)(x, y, tolerance);
      exports.isMoreThan = isMoreThan;
      var isAlmostEqualOrLessThan = (x, y, tolerance = 1e-5) => x < y || (0, exports.isAlmostEqual)(x, y, tolerance);
      exports.isAlmostEqualOrLessThan = isAlmostEqualOrLessThan;
      var isAlmostEqualOrMoreThan = (x, y, tolerance = 1e-5) => x > y || (0, exports.isAlmostEqual)(x, y, tolerance);
      exports.isAlmostEqualOrMoreThan = isAlmostEqualOrMoreThan;
    }
  });

  // build/obj/src/filterOperations.js
  var require_filterOperations = __commonJS({
    "build/obj/src/filterOperations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getPropertyValue = exports.getPropertyDefinition = exports.compile = void 0;
      var elementCategoriesComparer_1 = require_elementCategoriesComparer();
      var expandedWildcategoriesFactory_1 = require_expandedWildcategoriesFactory();
      var numbersComparison_1 = require_numbersComparison();
      var isNumberValueDefinition = (propertyDefinition) => {
        return propertyDefinition.type === "number";
      };
      var isNumber = (value) => typeof value === "number";
      var isString = (value) => typeof value === "string";
      var createComparisonExpression = (numberComparisonRule, textComparisonRule) => {
        return (propertyNode, _, valueNode) => {
          const propertyDefinition = propertyNode.getPropertyDefinition();
          const valueDefinition = valueNode.getPropertyDefinition();
          if (isNumberValueDefinition(valueDefinition))
            return (filterSettings, element) => {
              if (!(0, elementCategoriesComparer_1.compareCategories)(element.categoriesList, propertyDefinition.categories))
                return false;
              const categoryTemplates = (0, expandedWildcategoriesFactory_1.expandTemplateCategoriesForValue)(propertyDefinition.categories, element.categoriesList.length);
              return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).filter(isNumber).reduce((acc, elem) => acc || numberComparisonRule(elem, valueDefinition.value, filterSettings), false);
            };
          return (filterSettings, element) => {
            if (!(0, elementCategoriesComparer_1.compareCategories)(element.categoriesList, propertyDefinition.categories))
              return false;
            const categoryTemplates = (0, expandedWildcategoriesFactory_1.expandTemplateCategoriesForValue)(propertyDefinition.categories, element.categoriesList.length);
            const constraintTestValue = filterSettings.stringCaseSensitive ? valueDefinition.value : valueDefinition.value.toLocaleLowerCase();
            return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).filter(isString).map((x) => filterSettings.stringCaseSensitive ? x : x.toLocaleLowerCase()).reduce((acc, elem) => acc || textComparisonRule(elem, constraintTestValue), false);
          };
        };
      };
      exports.compile = {
        exactElement: (node) => {
          const propertyDefinition = node.getPropertyDefinition();
          return (_, element) => (0, elementCategoriesComparer_1.compareCategories)(element.categoriesList, propertyDefinition.categories);
        },
        EqualityExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => (0, numbersComparison_1.isAlmostEqual)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue === constraint),
        LessThanExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => (0, numbersComparison_1.isLessThan)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue < constraint),
        LessThanOrEqualExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => (0, numbersComparison_1.isAlmostEqualOrLessThan)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue <= constraint),
        MoreThanExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => (0, numbersComparison_1.isMoreThan)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue > constraint),
        MoreThanOrEqualExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => (0, numbersComparison_1.isAlmostEqualOrMoreThan)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue >= constraint),
        BoolAnd_and: (leftNode, _, rightNode) => (filterSettings, element) => leftNode.compile()(filterSettings, element) && rightNode.compile()(filterSettings, element),
        BoolOr_or: (leftNode, _, rightNode) => (filterSettings, element) => leftNode.compile()(filterSettings, element) || rightNode.compile()(filterSettings, element),
        PriExp_paren: (_1, node, _2) => (filterSettings, element) => node.compile()(filterSettings, element),
        NonEqualityExpr: createComparisonExpression((elementPropertyValue, constraint, filterSettings) => !(0, numbersComparison_1.isAlmostEqual)(elementPropertyValue, constraint, filterSettings.tolerance), (elementPropertyValue, constraint) => elementPropertyValue !== constraint)
      };
      var appendPropertyToSequence = (sequenceNode, propertyNode) => {
        const sequence = sequenceNode.getPropertyDefinition();
        const property = propertyNode.getPropertyDefinition();
        const categories = [...sequence.categories];
        if (sequence.type === "property-value")
          categories.push(sequence.propertyName);
        return {
          type: "property-value",
          propertyName: property.value,
          categories
        };
      };
      var convertToCategoriesNode = (sequenceNode) => {
        const value = sequenceNode.getPropertyDefinition();
        if (value.type === "exact-category")
          return value;
        const categories = [...value.categories];
        categories.push(value.propertyName);
        return {
          type: "exact-category",
          categories
        };
      };
      var convertToPropertiesNode = (sequenceNode) => {
        const definition = sequenceNode.getPropertyDefinition();
        if (definition.type === "property-value")
          return definition;
        const categories = [...definition.categories];
        const propertyName = categories.pop();
        return {
          type: "property-value",
          propertyName,
          categories
        };
      };
      var createSimpleValue = (valueNode) => {
        return {
          type: "simple",
          value: valueNode.sourceString
        };
      };
      exports.getPropertyDefinition = {
        exactElement_ofCategory: (parentNode, _) => {
          const category = parentNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value]
          };
        },
        categoryOrProperty_inBrackets: (_, valueNode, _1) => createSimpleValue(valueNode),
        categoryOrProperty_value: (valueNode) => createSimpleValue(valueNode),
        exactElement_ofPropertySequence: (sequenceNode, _) => convertToCategoriesNode(sequenceNode),
        property_ofPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        property_ofDirectAny: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        property_ofDirectAnyPropertySequence: (sequenceNode, _, propertyNode) => appendPropertyToSequence(sequenceNode, propertyNode),
        directAnyProperty_ofCategory: (sequenceNode, _1, _2) => {
          const category = sequenceNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value, "*"]
          };
        },
        directAnyPropertySequence: (sequenceNode, _1, _2) => convertToCategoriesNode(sequenceNode),
        directAnyProperty_sequenced: (sequenceNode, _1, _2) => {
          const sequence = convertToCategoriesNode(sequenceNode);
          const categories = [...sequence.categories];
          categories.push("*");
          return {
            type: "exact-category",
            categories
          };
        },
        propertySequence: (node) => convertToPropertiesNode(node),
        directProperty_ofCategory: (categoriesNode, _, propertyNode) => {
          const category = categoriesNode.getPropertyDefinition();
          const property = propertyNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: [category.value, property.value]
          };
        },
        directProperty_ofAnyProperty: (_1, _2, propertyNode) => {
          const property = propertyNode.getPropertyDefinition();
          return {
            type: "exact-category",
            categories: ["*", property.value]
          };
        },
        number: (node) => {
          return {
            type: "number",
            value: parseFloat(node.sourceString)
          };
        },
        textConst: (_1, valueNode, _2) => valueNode.getPropertyDefinition(),
        textValue: (valueNode) => createSimpleValue(valueNode)
      };
      exports.getPropertyValue = {
        propertySequence: (node) => {
          const propertyDefinition = convertToPropertiesNode(node);
          return (element) => {
            if (!(0, elementCategoriesComparer_1.compareCategories)(element.categoriesList, propertyDefinition.categories))
              return void 0;
            const categoryTemplates = (0, expandedWildcategoriesFactory_1.expandTemplateCategoriesForValue)(propertyDefinition.categories, element.categoriesList.length);
            return categoryTemplates.map((x) => element.getPropertyValue(propertyDefinition.propertyName, x)).find((x) => x !== void 0);
          };
        }
      };
    }
  });

  // build/obj/src/parsingError.js
  var require_parsingError = __commonJS({
    "build/obj/src/parsingError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ParsingError = void 0;
      var ParsingError = class extends Error {
        constructor(message, shortMessage) {
          super(message);
          this.shortMessage = shortMessage;
        }
      };
      exports.ParsingError = ParsingError;
    }
  });

  // build/obj/src/elementPropertyValueQueryFactory.js
  var require_elementPropertyValueQueryFactory = __commonJS({
    "build/obj/src/elementPropertyValueQueryFactory.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ElementPropertyValueQueryFactory = void 0;
      var filtergrammar_ohm_bundle_1 = __importDefault(require_filtergrammar_ohm_bundle());
      var filterOperations_1 = require_filterOperations();
      var parsingError_1 = require_parsingError();
      var ElementPropertyValueQueryFactory = class {
        constructor() {
          this.semantics = filtergrammar_ohm_bundle_1.default.createSemantics();
          this.semantics.addOperation("getPropertyDefinition", filterOperations_1.getPropertyDefinition);
          this.semantics.addOperation("getPropertyValue", filterOperations_1.getPropertyValue);
        }
        createPropertyQuery(propertyQuery) {
          const match = filtergrammar_ohm_bundle_1.default.match(propertyQuery, "propertySequence");
          if (match.failed())
            throw new parsingError_1.ParsingError(match.message, match.shortMessage);
          const node = this.semantics(match);
          return node.getPropertyValue();
        }
      };
      exports.ElementPropertyValueQueryFactory = ElementPropertyValueQueryFactory;
    }
  });

  // build/obj/src/filterFactory.js
  var require_filterFactory = __commonJS({
    "build/obj/src/filterFactory.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FilterFactory = void 0;
      var filtergrammar_ohm_bundle_1 = __importDefault(require_filtergrammar_ohm_bundle());
      var filterOperations_1 = require_filterOperations();
      var parsingError_1 = require_parsingError();
      var FilterFactory = class {
        constructor(settings) {
          this.semantics = filtergrammar_ohm_bundle_1.default.createSemantics();
          this.settings = settings || { tolerance: 1e-5, stringCaseSensitive: true };
          this.semantics.addOperation("getPropertyDefinition", filterOperations_1.getPropertyDefinition);
          this.semantics.addOperation("compile", filterOperations_1.compile);
        }
        createFilter(filterString) {
          const match = filtergrammar_ohm_bundle_1.default.match(filterString);
          if (match.failed())
            throw new parsingError_1.ParsingError(match.message, match.shortMessage);
          const node = this.semantics(match);
          return node.compile().bind(null, this.settings);
        }
      };
      exports.FilterFactory = FilterFactory;
    }
  });

  // build/obj/src/propertyDatabaseAttributesCollection.js
  var require_propertyDatabaseAttributesCollection = __commonJS({
    "build/obj/src/propertyDatabaseAttributesCollection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PropertyDatabaseAttributesCollection = void 0;
      var PropertyDatabaseAttributesCollection = class {
        constructor(propertyDatabase, attributesCaseSensitive) {
          this.attributesCaseSensitive = attributesCaseSensitive;
          this.attributesIdsByName = /* @__PURE__ */ new Map();
          let nameAttributeId = -1;
          propertyDatabase.enumAttributes((attrId, attrDef) => {
            const attributeName = attributesCaseSensitive ? attrDef.name : attrDef.name.toLocaleLowerCase();
            const ids = this.attributesIdsByName.get(attributeName) || [];
            ids.push(attrId);
            this.attributesIdsByName.set(attributeName, ids);
            if (attrDef.name === "name" && attrDef.category === "__name__")
              nameAttributeId = attrId;
          });
          this.nameAttributeId = nameAttributeId;
        }
        findAttributesIdsByName(name) {
          const attributeName = this.attributesCaseSensitive ? name : name.toLocaleLowerCase();
          return this.attributesIdsByName.get(attributeName) || [];
        }
      };
      exports.PropertyDatabaseAttributesCollection = PropertyDatabaseAttributesCollection;
    }
  });

  // build/obj/src/propertyDatabaseFilterableElement.js
  var require_propertyDatabaseFilterableElement = __commonJS({
    "build/obj/src/propertyDatabaseFilterableElement.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PropertyDatabaseFilterableElement = void 0;
      var PropertyDatabaseFilterableElement = class {
        constructor(dbId, propertyDatabase, attributes) {
          this.dbId = dbId;
          this.propertyDatabase = propertyDatabase;
          this.attributes = attributes;
          this.categoryNodesDbIds = getCategories(dbId, propertyDatabase);
        }
        get categoriesList() {
          return this.categoryNodesDbIds.map((x) => this.getNodePropertyValue(x, this.attributes.nameAttributeId));
        }
        getPropertyValue(propertyName, categories) {
          if (!this.compareCategories(categories))
            return void 0;
          const dbId = this.categoryNodesDbIds[categories.length - 1];
          return this.attributes.findAttributesIdsByName(propertyName).map((x) => this.getNodePropertyValue(dbId, x)).find((x) => x !== void 0);
        }
        compareCategories(categories) {
          for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
              return false;
          }
          return true;
        }
        getNodePropertyValue(dbId, attributeId) {
          let value = void 0;
          this.propertyDatabase.enumObjectProperties(dbId, (attrId, attrValueId) => {
            if (attrId === attributeId)
              value = this.propertyDatabase.getAttrValue(attrId, attrValueId);
          });
          return value;
        }
      };
      exports.PropertyDatabaseFilterableElement = PropertyDatabaseFilterableElement;
      var getCategories = (dbId, propertyDatabase) => {
        const categories = [];
        let currentNodeDbId = dbId;
        while (currentNodeDbId !== null) {
          const parentDbId = propertyDatabase.findParent(currentNodeDbId);
          if (parentDbId !== null)
            categories.push(currentNodeDbId);
          currentNodeDbId = parentDbId;
        }
        return categories.reverse();
      };
    }
  });

  // build/obj/index.js
  var require_obj = __commonJS({
    "build/obj/index.js"(exports) {
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.computeExpressionValue = exports.query = exports.helloWorld = exports.FilterFactory = void 0;
      var elementPropertyValueQueryFactory_1 = require_elementPropertyValueQueryFactory();
      var filterFactory_1 = require_filterFactory();
      var propertyDatabaseAttributesCollection_1 = require_propertyDatabaseAttributesCollection();
      var propertyDatabaseFilterableElement_1 = require_propertyDatabaseFilterableElement();
      var filterFactory_2 = require_filterFactory();
      Object.defineProperty(exports, "FilterFactory", { enumerable: true, get: function() {
        return filterFactory_2.FilterFactory;
      } });
      function helloWorld() {
        const message = "Hello World!";
        return message;
      }
      exports.helloWorld = helloWorld;
      function query(model, query2, options) {
        return __awaiter(this, void 0, void 0, function* () {
          const propertyDatabase = model.getPropertyDb();
          return propertyDatabase.executeUserFunction(function(pdb, tag) {
            try {
              const dbIds = [];
              const { lmvQuery, lmvQueryOptions } = tag;
              const filterFactory = new filterFactory_1.FilterFactory(lmvQueryOptions);
              const elementFilter = filterFactory.createFilter(lmvQuery);
              const attributesCollection = new propertyDatabaseAttributesCollection_1.PropertyDatabaseAttributesCollection(pdb, lmvQueryOptions.attributesCaseSensitive);
              pdb.enumObjects((dbId) => {
                if (lmvQueryOptions.leafNodesOnly && pdb.getNodeNameAndChildren({ dbId }) !== void 0)
                  return;
                const element = new propertyDatabaseFilterableElement_1.PropertyDatabaseFilterableElement(dbId, pdb, attributesCollection);
                if (elementFilter(element))
                  dbIds.push(dbId);
              });
              return {
                dbIds,
                error: null
              };
            } catch (error) {
              return {
                dbIds: [],
                error
              };
            }
          }, { lmvQuery: query2, lmvQueryOptions: options });
        });
      }
      exports.query = query;
      function computeExpressionValue(model, dbId, query2, attributesCaseSensitive = true) {
        return __awaiter(this, void 0, void 0, function* () {
          const propertyDatabase = model.getPropertyDb();
          return propertyDatabase.executeUserFunction(function(pdb, tag) {
            try {
              const { nodeId, propertyQuery, caseSensitive } = tag;
              const factory = new elementPropertyValueQueryFactory_1.ElementPropertyValueQueryFactory();
              const query3 = factory.createPropertyQuery(propertyQuery);
              const attributesCollection = new propertyDatabaseAttributesCollection_1.PropertyDatabaseAttributesCollection(pdb, caseSensitive);
              const element = new propertyDatabaseFilterableElement_1.PropertyDatabaseFilterableElement(nodeId, pdb, attributesCollection);
              const result = query3(element);
              return { result, error: null };
            } catch (error) {
              return {
                result: void 0,
                error
              };
            }
          }, { nodeId: dbId, propertyQuery: query2, caseSensitive: attributesCaseSensitive });
        });
      }
      exports.computeExpressionValue = computeExpressionValue;
    }
  });
  require_obj();
})();
