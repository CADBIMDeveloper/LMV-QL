'use strict';const ohm=require('ohm-js');const result=ohm.makeRecipe(["grammar",{"source":"Filter {\r\n    Exp = BoolOr\r\n    \r\n    BoolOr\r\n        = PriExp orOperation Exp -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = PriExp andOperation Exp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = \"(\" Exp \")\" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence \"=\" expressionConst\r\n    \r\n    LessThanExpr = propertySequence \"<\" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence \">\" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence \"<=\" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence \">=\" expressionConst\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence \".\" categoryOrProperty\r\n        | directAnyPropertySequence \".\" categoryOrProperty\r\n        | directAnyProperty \".\" categoryOrProperty\r\n                    \r\n    directProperty \r\n        = categoryOrProperty \".\" categoryOrProperty \r\n        | anyProperty \".\" categoryOrProperty\r\n        \r\n    directAnyPropertySequence = propertySequence \".\" anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty \".\" anyProperty | categoryOrProperty \".\" anyProperty | anyProperty \".\" anyProperty\r\n        \r\n    exactElement = propertySequence \"!\" --ofPropertySequence\r\n        | categoryOrProperty \"!\" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = \"[\" identificator \"]\" --b \r\n        | alnum+ --s\r\n        \r\n    andOperation = andWord | \"&&\" | \"&\"\r\n\r\n    andWord = (\"A\" | \"a\")(\"N\" | \"n\")(\"D\" | \"d\")\r\n    \r\n    orOperation = orWord | \"||\" | \"|\"\r\n\r\n    orWord = (\"O\" | \"o\")(\"R\" | \"r\")\r\n    \r\n    anyProperty = \"*\"\r\n    \r\n    identificator = (~\"]\" ~\"[\" any)+\r\n    \r\n    expressionConst = textConst | number\r\n    \r\n    textConst (target text value)\r\n        = \"\\\"\" textValue \"\\\"\"\r\n        \r\n    textValue = textChar*\r\n    \r\n    textChar\r\n        = \"\\\\\\\"\"\r\n        | (~\"\\\"\" any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = \"-\" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* \".\" digit+\r\n}"},"Filter",null,"Exp",{"Exp":["define",{"sourceInterval":[14,26]},null,[],["app",{"sourceInterval":[20,26]},"BoolOr",[]]],"BoolOr_or":["define",{"sourceInterval":[56,84]},null,[],["seq",{"sourceInterval":[56,78]},["app",{"sourceInterval":[56,62]},"PriExp",[]],["app",{"sourceInterval":[63,74]},"orOperation",[]],["app",{"sourceInterval":[75,78]},"Exp",[]]]],"BoolOr":["define",{"sourceInterval":[38,103]},null,[],["alt",{"sourceInterval":[56,103]},["app",{"sourceInterval":[56,78]},"BoolOr_or",[]],["app",{"sourceInterval":[96,103]},"BoolAnd",[]]]],"BoolAnd_and":["define",{"sourceInterval":[131,161]},null,[],["seq",{"sourceInterval":[131,154]},["app",{"sourceInterval":[131,137]},"PriExp",[]],["app",{"sourceInterval":[138,150]},"andOperation",[]],["app",{"sourceInterval":[151,154]},"Exp",[]]]],"BoolAnd":["define",{"sourceInterval":[111,179]},null,[],["alt",{"sourceInterval":[131,179]},["app",{"sourceInterval":[131,154]},"BoolAnd_and",[]],["app",{"sourceInterval":[173,179]},"PriExp",[]]]],"PriExp_paren":["define",{"sourceInterval":[214,234]},null,[],["seq",{"sourceInterval":[214,225]},["terminal",{"sourceInterval":[214,217]},"("],["app",{"sourceInterval":[218,221]},"Exp",[]],["terminal",{"sourceInterval":[222,225]},")"]]],"PriExp":["define",{"sourceInterval":[195,259]},null,[],["alt",{"sourceInterval":[214,259]},["app",{"sourceInterval":[214,225]},"PriExp_paren",[]],["app",{"sourceInterval":[246,259]},"ComparisonExp",[]]]],"ComparisonExp":["define",{"sourceInterval":[267,384]},null,[],["alt",{"sourceInterval":[283,384]},["app",{"sourceInterval":[283,295]},"EqualityExpr",[]],["app",{"sourceInterval":[298,310]},"LessThanExpr",[]],["app",{"sourceInterval":[313,325]},"MoreThanExpr",[]],["app",{"sourceInterval":[328,347]},"LessThanOrEqualExpr",[]],["app",{"sourceInterval":[350,369]},"MoreThanOrEqualExpr",[]],["app",{"sourceInterval":[372,384]},"exactElement",[]]]],"EqualityExpr":["define",{"sourceInterval":[392,443]},null,[],["seq",{"sourceInterval":[407,443]},["app",{"sourceInterval":[407,423]},"propertySequence",[]],["terminal",{"sourceInterval":[424,427]},"="],["app",{"sourceInterval":[428,443]},"expressionConst",[]]]],"LessThanExpr":["define",{"sourceInterval":[455,506]},null,[],["seq",{"sourceInterval":[470,506]},["app",{"sourceInterval":[470,486]},"propertySequence",[]],["terminal",{"sourceInterval":[487,490]},"<"],["app",{"sourceInterval":[491,506]},"expressionConst",[]]]],"MoreThanExpr":["define",{"sourceInterval":[518,569]},null,[],["seq",{"sourceInterval":[533,569]},["app",{"sourceInterval":[533,549]},"propertySequence",[]],["terminal",{"sourceInterval":[550,553]},">"],["app",{"sourceInterval":[554,569]},"expressionConst",[]]]],"LessThanOrEqualExpr":["define",{"sourceInterval":[581,640]},null,[],["seq",{"sourceInterval":[603,640]},["app",{"sourceInterval":[603,619]},"propertySequence",[]],["terminal",{"sourceInterval":[620,624]},"<="],["app",{"sourceInterval":[625,640]},"expressionConst",[]]]],"MoreThanOrEqualExpr":["define",{"sourceInterval":[652,711]},null,[],["seq",{"sourceInterval":[674,711]},["app",{"sourceInterval":[674,690]},"propertySequence",[]],["terminal",{"sourceInterval":[691,695]},">="],["app",{"sourceInterval":[696,711]},"expressionConst",[]]]],"propertySequence":["define",{"sourceInterval":[719,763]},null,[],["alt",{"sourceInterval":[738,763]},["app",{"sourceInterval":[738,746]},"property",[]],["app",{"sourceInterval":[749,763]},"directProperty",[]]]],"property":["define",{"sourceInterval":[791,964]},null,[],["alt",{"sourceInterval":[813,964]},["seq",{"sourceInterval":[813,852]},["app",{"sourceInterval":[813,829]},"propertySequence",[]],["terminal",{"sourceInterval":[830,833]},"."],["app",{"sourceInterval":[834,852]},"categoryOrProperty",[]]],["seq",{"sourceInterval":[864,912]},["app",{"sourceInterval":[864,889]},"directAnyPropertySequence",[]],["terminal",{"sourceInterval":[890,893]},"."],["app",{"sourceInterval":[894,912]},"categoryOrProperty",[]]],["seq",{"sourceInterval":[924,964]},["app",{"sourceInterval":[924,941]},"directAnyProperty",[]],["terminal",{"sourceInterval":[942,945]},"."],["app",{"sourceInterval":[946,964]},"categoryOrProperty",[]]]]],"directProperty":["define",{"sourceInterval":[992,1107]},null,[],["alt",{"sourceInterval":[1019,1107]},["seq",{"sourceInterval":[1019,1060]},["app",{"sourceInterval":[1019,1037]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1038,1041]},"."],["app",{"sourceInterval":[1042,1060]},"categoryOrProperty",[]]],["seq",{"sourceInterval":[1073,1107]},["app",{"sourceInterval":[1073,1084]},"anyProperty",[]],["terminal",{"sourceInterval":[1085,1088]},"."],["app",{"sourceInterval":[1089,1107]},"categoryOrProperty",[]]]]],"directAnyPropertySequence":["define",{"sourceInterval":[1123,1183]},null,[],["seq",{"sourceInterval":[1151,1183]},["app",{"sourceInterval":[1151,1167]},"propertySequence",[]],["terminal",{"sourceInterval":[1168,1171]},"."],["app",{"sourceInterval":[1172,1183]},"anyProperty",[]]]],"directAnyProperty":["define",{"sourceInterval":[1199,1319]},null,[],["alt",{"sourceInterval":[1219,1319]},["seq",{"sourceInterval":[1219,1252]},["app",{"sourceInterval":[1219,1236]},"directAnyProperty",[]],["terminal",{"sourceInterval":[1237,1240]},"."],["app",{"sourceInterval":[1241,1252]},"anyProperty",[]]],["seq",{"sourceInterval":[1255,1289]},["app",{"sourceInterval":[1255,1273]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1274,1277]},"."],["app",{"sourceInterval":[1278,1289]},"anyProperty",[]]],["seq",{"sourceInterval":[1292,1319]},["app",{"sourceInterval":[1292,1303]},"anyProperty",[]],["terminal",{"sourceInterval":[1304,1307]},"."],["app",{"sourceInterval":[1308,1319]},"anyProperty",[]]]]],"exactElement_ofPropertySequence":["define",{"sourceInterval":[1350,1391]},null,[],["seq",{"sourceInterval":[1350,1370]},["app",{"sourceInterval":[1350,1366]},"propertySequence",[]],["terminal",{"sourceInterval":[1367,1370]},"!"]]],"exactElement_ofCategory":["define",{"sourceInterval":[1403,1438]},null,[],["seq",{"sourceInterval":[1403,1425]},["app",{"sourceInterval":[1403,1421]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[1422,1425]},"!"]]],"exactElement":["define",{"sourceInterval":[1335,1438]},null,[],["alt",{"sourceInterval":[1350,1438]},["app",{"sourceInterval":[1350,1370]},"exactElement_ofPropertySequence",[]],["app",{"sourceInterval":[1403,1425]},"exactElement_ofCategory",[]]]],"categoryOrProperty_b":["define",{"sourceInterval":[1511,1536]},null,[],["seq",{"sourceInterval":[1511,1532]},["terminal",{"sourceInterval":[1511,1514]},"["],["app",{"sourceInterval":[1515,1528]},"identificator",[]],["terminal",{"sourceInterval":[1529,1532]},"]"]]],"categoryOrProperty_s":["define",{"sourceInterval":[1549,1559]},null,[],["plus",{"sourceInterval":[1549,1555]},["app",{"sourceInterval":[1549,1554]},"alnum",[]]]],"categoryOrProperty":["define",{"sourceInterval":[1450,1559]},"element category or property",[],["alt",{"sourceInterval":[1511,1559]},["app",{"sourceInterval":[1511,1532]},"categoryOrProperty_b",[]],["app",{"sourceInterval":[1549,1555]},"categoryOrProperty_s",[]]]],"andOperation":["define",{"sourceInterval":[1575,1610]},null,[],["alt",{"sourceInterval":[1590,1610]},["app",{"sourceInterval":[1590,1597]},"andWord",[]],["terminal",{"sourceInterval":[1600,1604]},"&&"],["terminal",{"sourceInterval":[1607,1610]},"&"]]],"andWord":["define",{"sourceInterval":[1618,1661]},null,[],["seq",{"sourceInterval":[1628,1661]},["alt",{"sourceInterval":[1629,1638]},["terminal",{"sourceInterval":[1629,1632]},"A"],["terminal",{"sourceInterval":[1635,1638]},"a"]],["alt",{"sourceInterval":[1640,1649]},["terminal",{"sourceInterval":[1640,1643]},"N"],["terminal",{"sourceInterval":[1646,1649]},"n"]],["alt",{"sourceInterval":[1651,1660]},["terminal",{"sourceInterval":[1651,1654]},"D"],["terminal",{"sourceInterval":[1657,1660]},"d"]]]],"orOperation":["define",{"sourceInterval":[1673,1706]},null,[],["alt",{"sourceInterval":[1687,1706]},["app",{"sourceInterval":[1687,1693]},"orWord",[]],["terminal",{"sourceInterval":[1696,1700]},"||"],["terminal",{"sourceInterval":[1703,1706]},"|"]]],"orWord":["define",{"sourceInterval":[1714,1745]},null,[],["seq",{"sourceInterval":[1723,1745]},["alt",{"sourceInterval":[1724,1733]},["terminal",{"sourceInterval":[1724,1727]},"O"],["terminal",{"sourceInterval":[1730,1733]},"o"]],["alt",{"sourceInterval":[1735,1744]},["terminal",{"sourceInterval":[1735,1738]},"R"],["terminal",{"sourceInterval":[1741,1744]},"r"]]]],"anyProperty":["define",{"sourceInterval":[1757,1774]},null,[],["terminal",{"sourceInterval":[1771,1774]},"*"]],"identificator":["define",{"sourceInterval":[1786,1818]},null,[],["plus",{"sourceInterval":[1802,1818]},["seq",{"sourceInterval":[1803,1816]},["not",{"sourceInterval":[1803,1807]},["terminal",{"sourceInterval":[1804,1807]},"]"]],["not",{"sourceInterval":[1808,1812]},["terminal",{"sourceInterval":[1809,1812]},"["]],["app",{"sourceInterval":[1813,1816]},"any",[]]]]],"expressionConst":["define",{"sourceInterval":[1830,1866]},null,[],["alt",{"sourceInterval":[1848,1866]},["app",{"sourceInterval":[1848,1857]},"textConst",[]],["app",{"sourceInterval":[1860,1866]},"number",[]]]],"textConst":["define",{"sourceInterval":[1878,1938]},"target text value",[],["seq",{"sourceInterval":[1919,1938]},["terminal",{"sourceInterval":[1919,1923]},"\""],["app",{"sourceInterval":[1924,1933]},"textValue",[]],["terminal",{"sourceInterval":[1934,1938]},"\""]]],"textValue":["define",{"sourceInterval":[1954,1975]},null,[],["star",{"sourceInterval":[1966,1975]},["app",{"sourceInterval":[1966,1974]},"textChar",[]]]],"textChar":["define",{"sourceInterval":[1987,2036]},null,[],["alt",{"sourceInterval":[2007,2036]},["terminal",{"sourceInterval":[2007,2013]},"\\\""],["seq",{"sourceInterval":[2025,2036]},["not",{"sourceInterval":[2026,2031]},["terminal",{"sourceInterval":[2027,2031]},"\""]],["app",{"sourceInterval":[2032,2035]},"any",[]]]]],"number":["define",{"sourceInterval":[2052,2106]},null,[],["alt",{"sourceInterval":[2068,2106]},["app",{"sourceInterval":[2068,2082]},"positiveNumber",[]],["app",{"sourceInterval":[2092,2106]},"negativeNumber",[]]]],"negativeNumber":["define",{"sourceInterval":[2120,2155]},null,[],["seq",{"sourceInterval":[2137,2155]},["terminal",{"sourceInterval":[2137,2140]},"-"],["app",{"sourceInterval":[2141,2155]},"positiveNumber",[]]]],"positiveNumber":["define",{"sourceInterval":[2167,2210]},null,[],["alt",{"sourceInterval":[2184,2210]},["app",{"sourceInterval":[2184,2194]},"realNumber",[]],["app",{"sourceInterval":[2197,2210]},"integerNumber",[]]]],"integerNumber":["define",{"sourceInterval":[2224,2246]},null,[],["plus",{"sourceInterval":[2240,2246]},["app",{"sourceInterval":[2240,2245]},"digit",[]]]],"realNumber":["define",{"sourceInterval":[2258,2288]},null,[],["seq",{"sourceInterval":[2271,2288]},["star",{"sourceInterval":[2271,2277]},["app",{"sourceInterval":[2271,2276]},"digit",[]]],["terminal",{"sourceInterval":[2278,2281]},"."],["plus",{"sourceInterval":[2282,2288]},["app",{"sourceInterval":[2282,2287]},"digit",[]]]]]}]);module.exports=result;