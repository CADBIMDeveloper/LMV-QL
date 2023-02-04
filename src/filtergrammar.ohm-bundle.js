'use strict';const ohm=require('ohm-js');const result=ohm.makeRecipe(["grammar",{"source":"Filter {\r\n    Exp = BoolOr\r\n    \r\n    BoolOr\r\n        = PriExp orOperation Exp -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = PriExp andOperation Exp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = \"(\" Exp \")\" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence \"=\" expressionConst\r\n    \r\n    LessThanExpr = propertySequence \"<\" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence \">\" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence \"<=\" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence \">=\" expressionConst\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence \".\" categoryOrProperty\r\n        | directAnyPropertySequence \".\" categoryOrProperty\r\n        | directAnyProperty \".\" categoryOrProperty\r\n                    \r\n    directProperty \r\n        = categoryOrProperty \".\" categoryOrProperty --ofCategory\r\n        | anyProperty \".\" categoryOrProperty --ofAnyProperty\r\n        \r\n    directAnyPropertySequence = propertySequence \".\" anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty \".\" anyProperty | categoryOrProperty \".\" anyProperty | anyProperty \".\" anyProperty\r\n        \r\n    exactElement = propertySequence \"!\" --ofPropertySequence\r\n        | categoryOrProperty \"!\" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = \"[\" identificator \"]\" --inBrackets \r\n        | alnum+ --value\r\n        \r\n    andOperation = andWord | \"&&\" | \"&\"\r\n\r\n    andWord = (\"A\" | \"a\")(\"N\" | \"n\")(\"D\" | \"d\")\r\n    \r\n    orOperation = orWord | \"||\" | \"|\"\r\n\r\n    orWord = (\"O\" | \"o\")(\"R\" | \"r\")\r\n    \r\n    anyProperty = \"*\"\r\n    \r\n    identificator = (~\"]\" ~\"[\" any)+\r\n    \r\n    expressionConst = textConst | number\r\n    \r\n    textConst (target text value)\r\n        = \"\\\"\" textValue \"\\\"\"\r\n        \r\n    textValue = textChar*\r\n    \r\n    textChar\r\n        = \"\\\\\\\"\"\r\n        | (~\"\\\"\" any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = \"-\" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* \".\" digit+\r\n}"},"Filter",null,"Exp",{"Exp":["define",{"sourceInterval":[14,26]},null,[],["app",{"sourceInterval":[20,26]},"BoolOr",[]]],"BoolOr_or":["define",{"sourceInterval":[56,84]},null,[],["seq",{"sourceInterval":[56,78]},["app",{"sourceInterval":[56,62]},"PriExp",[]],["app",{"sourceInterval":[63,74]},"orOperation",[]],["app",{"sourceInterval":[75,78]},"Exp",[]]]],"BoolOr":["define",{"sourceInterval":[38,103]},null,[],["alt",{"sourceInterval":[56,103]},["app",{"sourceInterval":[56,78]},"BoolOr_or",[]],["app",{"sourceInterval":[96,103]},"BoolAnd",[]]]],"BoolAnd_and":["define",{"sourceInterval":[131,161]},null,[],["seq",{"sourceInterval":[131,154]},["app",{"sourceInterval":[131,137]},"PriExp",[]],["app",{"sourceInterval":[138,150]},"andOperation",[]],["app",{"sourceInterval":[151,154]},"Exp",[]]]],"BoolAnd":["define",{"sourceInterval":[111,179]},null,[],["alt",{"sourceInterval":[131,179]},["app",{"sourceInterval":[131,154]},"BoolAnd_and",[]],["app",{"sourceInterval":[173,179]},"PriExp",[]]]],"PriExp_paren":["define",{"sourceInterval":[214,234]},null,[],["seq",{"sourceInterval":[214,225]},["terminal",{"sourceInterval":[214,217]},"("],["app",{"sourceInterval":[218,221]},"Exp",[]],["terminal",{"sourceInterval":[222,225]},")"]]],"PriExp":["define",{"sourceInterval":[195,259]},null,[],["alt",{"sourceInterval":[214,259]},["app",{"sourceInterval":[214,225]},"PriExp_paren",[]],["app",{"sourceInterval":[246,259]},"ComparisonExp",[]]]],"ComparisonExp":["define",{"sourceInterval":[267,384]},null,[],["alt",{"sourceInterval":[283,384]},["app",{"sourceInterval":[283,295]},"EqualityExpr",[]],["app",{"sourceInterval":[298,310]},"LessThanExpr",[]],["app",{"sourceInterval":[313,325]},"MoreThanExpr",[]],["app",{"sourceInterval":[328,347]},"LessThanOrEqualExpr",[]],["app",{"sourceInterval":[350,369]},"MoreThanOrEqualExpr",[]],["app",{"sourceInterval":[372,384]},"exactElement",[]]]],"EqualityExpr":["define",{"sourceInterval":[392,443]},null,[],["seq",{"sourceInterval":[407,443]},["app",{"sourceInterval":[407,423]},"propertySequence",[]],["terminal",{"sourceInterval":[424,427]},"="],["app",{"sourceInterval":[428,443]},"expressionConst",[]]]],"LessThanExpr":["define",{"sourceInterval":[455,506]},null,[],["seq",{"sourceInterval":[470,506]},["app",{"sourceInterval":[470,486]},"propertySequence",[]],["terminal",{"sourceInterval":[487,490]},"<"],["app",{"sourceInterval":[491,506]},"expressionConst",[]]]],"MoreThanExpr":["define",{"sourceInterval":[518,569]},null,[],["seq",{"sourceInterval":[533,569]},["app",{"sourceInterval":[533,549]},"propertySequence",[]],["terminal",{"sourceInterval":[550,553]},">"],["app",{"sourceInterval":[554,569]},"expressionConst",[]]]],"LessThanOrEqualExpr":["define",{"sourceInterval":[581,640]},null,[],["seq",{"sourceInterval":[603,640]},["app",{"sourceInterval":[603,619]},"propertySequence",[]],["terminal",{"sourceInterval":[620,624]},"<="],["app",{"sourceInterval":[625,640]},"expressionConst",[]]]],"MoreThanOrEqualExpr":["define",{"sourceInterval":[652,711]},null,[],["seq",{"sourceInterval":[674,711]},["app",{"sourceInterval":[674,690]},"propertySequence",[]],["terminal",{"sourceInterval":[691,695]},">="],["app",{"sourceInterval":[696,711]},"expressionConst",[]]]],"propertySequence":["define",{"sourceInterval":[719,763]},null,[],["alt",{"sourceInterval":[738,763]},["app",{"sourceInterval":[738,746]},"property",[]],["app",{"sourceInterval":[749,763]},"directProperty",[]]]],"property":["define",{"sourceInterval":[791,964]},null,[],["alt",{"sourceInterval":[813,964]},["seq",{"sourceInterval":[813,852]},["app",{"sourceInterval":[813,829]},"propertySequence",[]],["terminal",{"sourceInterval":[830,833]},"."],["app",{"sourceInterval":[834,852]},"categoryOrProperty",[]]],["seq",{"sourceInterval":[864,912]},["app",{"sourceInterval":[864,889]},"directAnyPropertySequence",[]],["terminal",{"sourceInterval":[890,893]},"."],["app",{"sourceInterval":[894,912]},"categoryOrProperty",[]]],["seq",{"sourceInterval":[924,964]},["app",{"sourceInterval":[924,941]},"directAnyProperty",[]],["terminal",{"sourceInterval":[942,945]},"."],["app",{"sourceInterval":[946,964]},"categoryOrProperty",[]]]]],"directProperty_ofCategory":["define",{"sourceInterval":[1019,1073]},null,[],["seq",{"sourceInterval":[1019,1060]},["app",{"sourceInterval":[1019,1037]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1038,1041]},"."],["app",{"sourceInterval":[1042,1060]},"categoryOrProperty",[]]]],"directProperty_ofAnyProperty":["define",{"sourceInterval":[1085,1135]},null,[],["seq",{"sourceInterval":[1085,1119]},["app",{"sourceInterval":[1085,1096]},"anyProperty",[]],["terminal",{"sourceInterval":[1097,1100]},"."],["app",{"sourceInterval":[1101,1119]},"categoryOrProperty",[]]]],"directProperty":["define",{"sourceInterval":[992,1135]},null,[],["alt",{"sourceInterval":[1019,1135]},["app",{"sourceInterval":[1019,1060]},"directProperty_ofCategory",[]],["app",{"sourceInterval":[1085,1119]},"directProperty_ofAnyProperty",[]]]],"directAnyPropertySequence":["define",{"sourceInterval":[1151,1211]},null,[],["seq",{"sourceInterval":[1179,1211]},["app",{"sourceInterval":[1179,1195]},"propertySequence",[]],["terminal",{"sourceInterval":[1196,1199]},"."],["app",{"sourceInterval":[1200,1211]},"anyProperty",[]]]],"directAnyProperty":["define",{"sourceInterval":[1227,1347]},null,[],["alt",{"sourceInterval":[1247,1347]},["seq",{"sourceInterval":[1247,1280]},["app",{"sourceInterval":[1247,1264]},"directAnyProperty",[]],["terminal",{"sourceInterval":[1265,1268]},"."],["app",{"sourceInterval":[1269,1280]},"anyProperty",[]]],["seq",{"sourceInterval":[1283,1317]},["app",{"sourceInterval":[1283,1301]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1302,1305]},"."],["app",{"sourceInterval":[1306,1317]},"anyProperty",[]]],["seq",{"sourceInterval":[1320,1347]},["app",{"sourceInterval":[1320,1331]},"anyProperty",[]],["terminal",{"sourceInterval":[1332,1335]},"."],["app",{"sourceInterval":[1336,1347]},"anyProperty",[]]]]],"exactElement_ofPropertySequence":["define",{"sourceInterval":[1378,1419]},null,[],["seq",{"sourceInterval":[1378,1398]},["app",{"sourceInterval":[1378,1394]},"propertySequence",[]],["terminal",{"sourceInterval":[1395,1398]},"!"]]],"exactElement_ofCategory":["define",{"sourceInterval":[1431,1466]},null,[],["seq",{"sourceInterval":[1431,1453]},["app",{"sourceInterval":[1431,1449]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1450,1453]},"!"]]],"exactElement":["define",{"sourceInterval":[1363,1466]},null,[],["alt",{"sourceInterval":[1378,1466]},["app",{"sourceInterval":[1378,1398]},"exactElement_ofPropertySequence",[]],["app",{"sourceInterval":[1431,1453]},"exactElement_ofCategory",[]]]],"categoryOrProperty_inBrackets":["define",{"sourceInterval":[1539,1573]},null,[],["seq",{"sourceInterval":[1539,1560]},["terminal",{"sourceInterval":[1539,1542]},"["],["app",{"sourceInterval":[1543,1556]},"identificator",[]],["terminal",{"sourceInterval":[1557,1560]},"]"]]],"categoryOrProperty_value":["define",{"sourceInterval":[1586,1600]},null,[],["plus",{"sourceInterval":[1586,1592]},["app",{"sourceInterval":[1586,1591]},"alnum",[]]]],"categoryOrProperty":["define",{"sourceInterval":[1478,1600]},"element category or property",[],["alt",{"sourceInterval":[1539,1600]},["app",{"sourceInterval":[1539,1560]},"categoryOrProperty_inBrackets",[]],["app",{"sourceInterval":[1586,1592]},"categoryOrProperty_value",[]]]],"andOperation":["define",{"sourceInterval":[1616,1651]},null,[],["alt",{"sourceInterval":[1631,1651]},["app",{"sourceInterval":[1631,1638]},"andWord",[]],["terminal",{"sourceInterval":[1641,1645]},"&&"],["terminal",{"sourceInterval":[1648,1651]},"&"]]],"andWord":["define",{"sourceInterval":[1659,1702]},null,[],["seq",{"sourceInterval":[1669,1702]},["alt",{"sourceInterval":[1670,1679]},["terminal",{"sourceInterval":[1670,1673]},"A"],["terminal",{"sourceInterval":[1676,1679]},"a"]],["alt",{"sourceInterval":[1681,1690]},["terminal",{"sourceInterval":[1681,1684]},"N"],["terminal",{"sourceInterval":[1687,1690]},"n"]],["alt",{"sourceInterval":[1692,1701]},["terminal",{"sourceInterval":[1692,1695]},"D"],["terminal",{"sourceInterval":[1698,1701]},"d"]]]],"orOperation":["define",{"sourceInterval":[1714,1747]},null,[],["alt",{"sourceInterval":[1728,1747]},["app",{"sourceInterval":[1728,1734]},"orWord",[]],["terminal",{"sourceInterval":[1737,1741]},"||"],["terminal",{"sourceInterval":[1744,1747]},"|"]]],"orWord":["define",{"sourceInterval":[1755,1786]},null,[],["seq",{"sourceInterval":[1764,1786]},["alt",{"sourceInterval":[1765,1774]},["terminal",{"sourceInterval":[1765,1768]},"O"],["terminal",{"sourceInterval":[1771,1774]},"o"]],["alt",{"sourceInterval":[1776,1785]},["terminal",{"sourceInterval":[1776,1779]},"R"],["terminal",{"sourceInterval":[1782,1785]},"r"]]]],"anyProperty":["define",{"sourceInterval":[1798,1815]},null,[],["terminal",{"sourceInterval":[1812,1815]},"*"]],"identificator":["define",{"sourceInterval":[1827,1859]},null,[],["plus",{"sourceInterval":[1843,1859]},["seq",{"sourceInterval":[1844,1857]},["not",{"sourceInterval":[1844,1848]},["terminal",{"sourceInterval":[1845,1848]},"]"]],["not",{"sourceInterval":[1849,1853]},["terminal",{"sourceInterval":[1850,1853]},"["]],["app",{"sourceInterval":[1854,1857]},"any",[]]]]],"expressionConst":["define",{"sourceInterval":[1871,1907]},null,[],["alt",{"sourceInterval":[1889,1907]},["app",{"sourceInterval":[1889,1898]},"textConst",[]],["app",{"sourceInterval":[1901,1907]},"number",[]]]],"textConst":["define",{"sourceInterval":[1919,1979]},"target text value",[],["seq",{"sourceInterval":[1960,1979]},["terminal",{"sourceInterval":[1960,1964]},"\""],["app",{"sourceInterval":[1965,1974]},"textValue",[]],["terminal",{"sourceInterval":[1975,1979]},"\""]]],"textValue":["define",{"sourceInterval":[1995,2016]},null,[],["star",{"sourceInterval":[2007,2016]},["app",{"sourceInterval":[2007,2015]},"textChar",[]]]],"textChar":["define",{"sourceInterval":[2028,2077]},null,[],["alt",{"sourceInterval":[2048,2077]},["terminal",{"sourceInterval":[2048,2054]},"\\\""],["seq",{"sourceInterval":[2066,2077]},["not",{"sourceInterval":[2067,2072]},["terminal",{"sourceInterval":[2068,2072]},"\""]],["app",{"sourceInterval":[2073,2076]},"any",[]]]]],"number":["define",{"sourceInterval":[2093,2147]},null,[],["alt",{"sourceInterval":[2109,2147]},["app",{"sourceInterval":[2109,2123]},"positiveNumber",[]],["app",{"sourceInterval":[2133,2147]},"negativeNumber",[]]]],"negativeNumber":["define",{"sourceInterval":[2161,2196]},null,[],["seq",{"sourceInterval":[2178,2196]},["terminal",{"sourceInterval":[2178,2181]},"-"],["app",{"sourceInterval":[2182,2196]},"positiveNumber",[]]]],"positiveNumber":["define",{"sourceInterval":[2208,2251]},null,[],["alt",{"sourceInterval":[2225,2251]},["app",{"sourceInterval":[2225,2235]},"realNumber",[]],["app",{"sourceInterval":[2238,2251]},"integerNumber",[]]]],"integerNumber":["define",{"sourceInterval":[2265,2287]},null,[],["plus",{"sourceInterval":[2281,2287]},["app",{"sourceInterval":[2281,2286]},"digit",[]]]],"realNumber":["define",{"sourceInterval":[2299,2329]},null,[],["seq",{"sourceInterval":[2312,2329]},["star",{"sourceInterval":[2312,2318]},["app",{"sourceInterval":[2312,2317]},"digit",[]]],["terminal",{"sourceInterval":[2319,2322]},"."],["plus",{"sourceInterval":[2323,2329]},["app",{"sourceInterval":[2323,2328]},"digit",[]]]]]}]);module.exports=result;