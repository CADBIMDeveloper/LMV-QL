'use strict';const ohm=require('ohm-js');const result=ohm.makeRecipe(["grammar",{"source":"Filter {\r\n    Expr \r\n        = FilterWithSelectExpr\r\n        | FilterWithAggregatedSelectExpr\r\n        | AggregatedSelectionClause\r\n        | FilterExpr\r\n        | PropertiesSelectExpr\r\n    \r\n    FilterWithSelectExpr = FilterExpr \"->\" PropertiesSelectExpr\r\n\r\n    FilterWithAggregatedSelectExpr = FilterExpr \"->\" AggregatedSelectionClause\r\n\r\n    FilterExpr = BoolOr\r\n    \r\n    BoolOr\r\n        = BoolOr orOperation BoolAnd -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = BoolAnd andOperation PriExp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = \"(\" FilterExpr \")\" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | NonEqualityExpr | StartsWithExpr | EndsWithExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence \"=\" expressionConst\r\n    \r\n    LessThanExpr = propertySequence \"<\" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence \">\" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence \"<=\" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence \">=\" expressionConst\r\n\r\n    NonEqualityExpr = propertySequence nonEqualSign expressionConst\r\n\r\n    StartsWithExpr = propertySequence likeWord startsWithConst\r\n\r\n    EndsWithExpr = propertySequence likeWord endsWithConst\r\n\r\n    AggregatedSelectionClause = AggregatedFuncsExpr | AnyAggregatedFuncExpr\r\n\r\n    AggregatedFuncsExpr = AnyAggregatedFuncExpr (\",\" AnyAggregatedFuncExpr)*\r\n\r\n    AnyAggregatedFuncExpr = AggregatedNamedFuncExpr | AggregatedFuncExpr\r\n\r\n    AggregatedNamedFuncExpr = AggregatedFuncExpr asWord propertyNameIdentifier\r\n\r\n    AggregatedFuncExpr = AggregatedCountExpr | AggregatedSumExpr | AggregatedMinExpr | AggregatedMaxExpr\r\n\r\n    AggregatedCountExpr = countWord \"()\"\r\n\r\n    AggregatedSumExpr = sumWord \"(\" propertySequence \")\"\r\n\r\n    AggregatedMinExpr = minWord \"(\" propertySequence \")\"\r\n\r\n    AggregatedMaxExpr = maxWord \"(\" propertySequence \")\"\r\n\r\n    PropertiesSelectExpr = PropertiesExpr | PropertyIdentifierExpr\r\n\r\n    PropertiesExpr = PropertyIdentifierExpr (\",\" PropertyIdentifierExpr)*\r\n\r\n    PropertyIdentifierExpr\r\n        = NamedPropertyExpr\r\n        | propertySequence\r\n\r\n    NamedPropertyExpr = propertySequence asWord propertyNameIdentifier\r\n\r\n    propertyNameIdentifier = (letter | digit)+\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence \".\" categoryOrProperty --ofPropertySequence\r\n        | directAnyPropertySequence \".\" categoryOrProperty --ofDirectAnyPropertySequence\r\n        | directAnyProperty \".\" categoryOrProperty --ofDirectAny\r\n                    \r\n    directProperty \r\n        = categoryOrProperty \".\" categoryOrProperty --ofCategory\r\n        | anyProperty \".\" categoryOrProperty --ofAnyProperty\r\n        \r\n    directAnyPropertySequence = propertySequence \".\" anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty \".\" anyProperty --sequenced\r\n        | categoryOrProperty \".\" anyProperty --ofCategory\r\n        | anyProperty \".\" anyProperty --ofAny\r\n        \r\n    exactElement = propertySequence \"!\" --ofPropertySequence\r\n        | categoryOrProperty \"!\" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = \"[\" identificator \"]\" --inBrackets \r\n        | alnum+ --value\r\n\r\n    maxWord = caseInsensitive<\"max\">\r\n\r\n    minWord = caseInsensitive<\"min\">\r\n\r\n    sumWord = caseInsensitive<\"sum\">\r\n\r\n    countWord = caseInsensitive<\"count\">\r\n\r\n    asWord = caseInsensitive<\"as\">\r\n\r\n    nonEqualSign = \"<>\" | \"!=\"\r\n        \r\n    andOperation = andWord | \"&&\" | \"&\"\r\n\r\n    andWord = caseInsensitive<\"and\">\r\n    \r\n    orOperation = orWord | \"||\" | \"|\"\r\n\r\n    orWord = caseInsensitive<\"or\">\r\n\r\n    likeWord = caseInsensitive<\"like\">\r\n    \r\n    anyProperty = \"*\"\r\n    \r\n    identificator = (~\"]\" ~\"[\" any)+\r\n    \r\n    expressionConst = textConst | number\r\n\r\n    startsWithConst\r\n        = \"\\\"\" likeTextValue \"%\\\"\"\r\n\r\n    endsWithConst\r\n        = \"\\\"%\" likeTextValue \"\\\"\"\r\n    \r\n    textConst (target text value)\r\n        = \"\\\"\" textValue \"\\\"\"\r\n        \r\n    textValue = textChar*\r\n\r\n    likeTextValue = likeTextChar*\r\n    \r\n    textChar\r\n        = \"\\\\\\\"\"\r\n        | (~\"\\\"\" any)\r\n\r\n    likeTextChar\r\n        = \"\\\\\\\"\"\r\n        | \"\\\\%\"\r\n        | (~(\"\\\"\" | \"%\") any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = \"-\" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* \".\" digit+\r\n}"},"Filter",null,"Expr",{"Expr":["define",{"sourceInterval":[14,184]},null,[],["alt",{"sourceInterval":[31,184]},["app",{"sourceInterval":[31,51]},"FilterWithSelectExpr",[]],["app",{"sourceInterval":[63,93]},"FilterWithAggregatedSelectExpr",[]],["app",{"sourceInterval":[105,130]},"AggregatedSelectionClause",[]],["app",{"sourceInterval":[142,152]},"FilterExpr",[]],["app",{"sourceInterval":[164,184]},"PropertiesSelectExpr",[]]]],"FilterWithSelectExpr":["define",{"sourceInterval":[196,255]},null,[],["seq",{"sourceInterval":[219,255]},["app",{"sourceInterval":[219,229]},"FilterExpr",[]],["terminal",{"sourceInterval":[230,234]},"->"],["app",{"sourceInterval":[235,255]},"PropertiesSelectExpr",[]]]],"FilterWithAggregatedSelectExpr":["define",{"sourceInterval":[263,337]},null,[],["seq",{"sourceInterval":[296,337]},["app",{"sourceInterval":[296,306]},"FilterExpr",[]],["terminal",{"sourceInterval":[307,311]},"->"],["app",{"sourceInterval":[312,337]},"AggregatedSelectionClause",[]]]],"FilterExpr":["define",{"sourceInterval":[345,364]},null,[],["app",{"sourceInterval":[358,364]},"BoolOr",[]]],"BoolOr_or":["define",{"sourceInterval":[394,426]},null,[],["seq",{"sourceInterval":[394,420]},["app",{"sourceInterval":[394,400]},"BoolOr",[]],["app",{"sourceInterval":[401,412]},"orOperation",[]],["app",{"sourceInterval":[413,420]},"BoolAnd",[]]]],"BoolOr":["define",{"sourceInterval":[376,445]},null,[],["alt",{"sourceInterval":[394,445]},["app",{"sourceInterval":[394,420]},"BoolOr_or",[]],["app",{"sourceInterval":[438,445]},"BoolAnd",[]]]],"BoolAnd_and":["define",{"sourceInterval":[473,507]},null,[],["seq",{"sourceInterval":[473,500]},["app",{"sourceInterval":[473,480]},"BoolAnd",[]],["app",{"sourceInterval":[481,493]},"andOperation",[]],["app",{"sourceInterval":[494,500]},"PriExp",[]]]],"BoolAnd":["define",{"sourceInterval":[453,525]},null,[],["alt",{"sourceInterval":[473,525]},["app",{"sourceInterval":[473,500]},"BoolAnd_and",[]],["app",{"sourceInterval":[519,525]},"PriExp",[]]]],"PriExp_paren":["define",{"sourceInterval":[560,587]},null,[],["seq",{"sourceInterval":[560,578]},["terminal",{"sourceInterval":[560,563]},"("],["app",{"sourceInterval":[564,574]},"FilterExpr",[]],["terminal",{"sourceInterval":[575,578]},")"]]],"PriExp":["define",{"sourceInterval":[541,612]},null,[],["alt",{"sourceInterval":[560,612]},["app",{"sourceInterval":[560,578]},"PriExp_paren",[]],["app",{"sourceInterval":[599,612]},"ComparisonExp",[]]]],"ComparisonExp":["define",{"sourceInterval":[620,787]},null,[],["alt",{"sourceInterval":[636,787]},["app",{"sourceInterval":[636,648]},"EqualityExpr",[]],["app",{"sourceInterval":[651,663]},"LessThanExpr",[]],["app",{"sourceInterval":[666,678]},"MoreThanExpr",[]],["app",{"sourceInterval":[681,700]},"LessThanOrEqualExpr",[]],["app",{"sourceInterval":[703,722]},"MoreThanOrEqualExpr",[]],["app",{"sourceInterval":[725,740]},"NonEqualityExpr",[]],["app",{"sourceInterval":[743,757]},"StartsWithExpr",[]],["app",{"sourceInterval":[760,772]},"EndsWithExpr",[]],["app",{"sourceInterval":[775,787]},"exactElement",[]]]],"EqualityExpr":["define",{"sourceInterval":[795,846]},null,[],["seq",{"sourceInterval":[810,846]},["app",{"sourceInterval":[810,826]},"propertySequence",[]],["terminal",{"sourceInterval":[827,830]},"="],["app",{"sourceInterval":[831,846]},"expressionConst",[]]]],"LessThanExpr":["define",{"sourceInterval":[858,909]},null,[],["seq",{"sourceInterval":[873,909]},["app",{"sourceInterval":[873,889]},"propertySequence",[]],["terminal",{"sourceInterval":[890,893]},"<"],["app",{"sourceInterval":[894,909]},"expressionConst",[]]]],"MoreThanExpr":["define",{"sourceInterval":[921,972]},null,[],["seq",{"sourceInterval":[936,972]},["app",{"sourceInterval":[936,952]},"propertySequence",[]],["terminal",{"sourceInterval":[953,956]},">"],["app",{"sourceInterval":[957,972]},"expressionConst",[]]]],"LessThanOrEqualExpr":["define",{"sourceInterval":[984,1043]},null,[],["seq",{"sourceInterval":[1006,1043]},["app",{"sourceInterval":[1006,1022]},"propertySequence",[]],["terminal",{"sourceInterval":[1023,1027]},"<="],["app",{"sourceInterval":[1028,1043]},"expressionConst",[]]]],"MoreThanOrEqualExpr":["define",{"sourceInterval":[1055,1114]},null,[],["seq",{"sourceInterval":[1077,1114]},["app",{"sourceInterval":[1077,1093]},"propertySequence",[]],["terminal",{"sourceInterval":[1094,1098]},">="],["app",{"sourceInterval":[1099,1114]},"expressionConst",[]]]],"NonEqualityExpr":["define",{"sourceInterval":[1122,1185]},null,[],["seq",{"sourceInterval":[1140,1185]},["app",{"sourceInterval":[1140,1156]},"propertySequence",[]],["app",{"sourceInterval":[1157,1169]},"nonEqualSign",[]],["app",{"sourceInterval":[1170,1185]},"expressionConst",[]]]],"StartsWithExpr":["define",{"sourceInterval":[1193,1251]},null,[],["seq",{"sourceInterval":[1210,1251]},["app",{"sourceInterval":[1210,1226]},"propertySequence",[]],["app",{"sourceInterval":[1227,1235]},"likeWord",[]],["app",{"sourceInterval":[1236,1251]},"startsWithConst",[]]]],"EndsWithExpr":["define",{"sourceInterval":[1259,1313]},null,[],["seq",{"sourceInterval":[1274,1313]},["app",{"sourceInterval":[1274,1290]},"propertySequence",[]],["app",{"sourceInterval":[1291,1299]},"likeWord",[]],["app",{"sourceInterval":[1300,1313]},"endsWithConst",[]]]],"AggregatedSelectionClause":["define",{"sourceInterval":[1321,1392]},null,[],["alt",{"sourceInterval":[1349,1392]},["app",{"sourceInterval":[1349,1368]},"AggregatedFuncsExpr",[]],["app",{"sourceInterval":[1371,1392]},"AnyAggregatedFuncExpr",[]]]],"AggregatedFuncsExpr":["define",{"sourceInterval":[1400,1472]},null,[],["seq",{"sourceInterval":[1422,1472]},["app",{"sourceInterval":[1422,1443]},"AnyAggregatedFuncExpr",[]],["star",{"sourceInterval":[1444,1472]},["seq",{"sourceInterval":[1445,1470]},["terminal",{"sourceInterval":[1445,1448]},","],["app",{"sourceInterval":[1449,1470]},"AnyAggregatedFuncExpr",[]]]]]],"AnyAggregatedFuncExpr":["define",{"sourceInterval":[1480,1548]},null,[],["alt",{"sourceInterval":[1504,1548]},["app",{"sourceInterval":[1504,1527]},"AggregatedNamedFuncExpr",[]],["app",{"sourceInterval":[1530,1548]},"AggregatedFuncExpr",[]]]],"AggregatedNamedFuncExpr":["define",{"sourceInterval":[1556,1630]},null,[],["seq",{"sourceInterval":[1582,1630]},["app",{"sourceInterval":[1582,1600]},"AggregatedFuncExpr",[]],["app",{"sourceInterval":[1601,1607]},"asWord",[]],["app",{"sourceInterval":[1608,1630]},"propertyNameIdentifier",[]]]],"AggregatedFuncExpr":["define",{"sourceInterval":[1638,1738]},null,[],["alt",{"sourceInterval":[1659,1738]},["app",{"sourceInterval":[1659,1678]},"AggregatedCountExpr",[]],["app",{"sourceInterval":[1681,1698]},"AggregatedSumExpr",[]],["app",{"sourceInterval":[1701,1718]},"AggregatedMinExpr",[]],["app",{"sourceInterval":[1721,1738]},"AggregatedMaxExpr",[]]]],"AggregatedCountExpr":["define",{"sourceInterval":[1746,1782]},null,[],["seq",{"sourceInterval":[1768,1782]},["app",{"sourceInterval":[1768,1777]},"countWord",[]],["terminal",{"sourceInterval":[1778,1782]},"()"]]],"AggregatedSumExpr":["define",{"sourceInterval":[1790,1842]},null,[],["seq",{"sourceInterval":[1810,1842]},["app",{"sourceInterval":[1810,1817]},"sumWord",[]],["terminal",{"sourceInterval":[1818,1821]},"("],["app",{"sourceInterval":[1822,1838]},"propertySequence",[]],["terminal",{"sourceInterval":[1839,1842]},")"]]],"AggregatedMinExpr":["define",{"sourceInterval":[1850,1902]},null,[],["seq",{"sourceInterval":[1870,1902]},["app",{"sourceInterval":[1870,1877]},"minWord",[]],["terminal",{"sourceInterval":[1878,1881]},"("],["app",{"sourceInterval":[1882,1898]},"propertySequence",[]],["terminal",{"sourceInterval":[1899,1902]},")"]]],"AggregatedMaxExpr":["define",{"sourceInterval":[1910,1962]},null,[],["seq",{"sourceInterval":[1930,1962]},["app",{"sourceInterval":[1930,1937]},"maxWord",[]],["terminal",{"sourceInterval":[1938,1941]},"("],["app",{"sourceInterval":[1942,1958]},"propertySequence",[]],["terminal",{"sourceInterval":[1959,1962]},")"]]],"PropertiesSelectExpr":["define",{"sourceInterval":[1970,2032]},null,[],["alt",{"sourceInterval":[1993,2032]},["app",{"sourceInterval":[1993,2007]},"PropertiesExpr",[]],["app",{"sourceInterval":[2010,2032]},"PropertyIdentifierExpr",[]]]],"PropertiesExpr":["define",{"sourceInterval":[2040,2109]},null,[],["seq",{"sourceInterval":[2057,2109]},["app",{"sourceInterval":[2057,2079]},"PropertyIdentifierExpr",[]],["star",{"sourceInterval":[2080,2109]},["seq",{"sourceInterval":[2081,2107]},["terminal",{"sourceInterval":[2081,2084]},","],["app",{"sourceInterval":[2085,2107]},"PropertyIdentifierExpr",[]]]]]],"PropertyIdentifierExpr":["define",{"sourceInterval":[2117,2196]},null,[],["alt",{"sourceInterval":[2151,2196]},["app",{"sourceInterval":[2151,2168]},"NamedPropertyExpr",[]],["app",{"sourceInterval":[2180,2196]},"propertySequence",[]]]],"NamedPropertyExpr":["define",{"sourceInterval":[2204,2270]},null,[],["seq",{"sourceInterval":[2224,2270]},["app",{"sourceInterval":[2224,2240]},"propertySequence",[]],["app",{"sourceInterval":[2241,2247]},"asWord",[]],["app",{"sourceInterval":[2248,2270]},"propertyNameIdentifier",[]]]],"propertyNameIdentifier":["define",{"sourceInterval":[2278,2320]},null,[],["plus",{"sourceInterval":[2303,2320]},["alt",{"sourceInterval":[2304,2318]},["app",{"sourceInterval":[2304,2310]},"letter",[]],["app",{"sourceInterval":[2313,2318]},"digit",[]]]]],"propertySequence":["define",{"sourceInterval":[2328,2372]},null,[],["alt",{"sourceInterval":[2347,2372]},["app",{"sourceInterval":[2347,2355]},"property",[]],["app",{"sourceInterval":[2358,2372]},"directProperty",[]]]],"property_ofPropertySequence":["define",{"sourceInterval":[2422,2482]},null,[],["seq",{"sourceInterval":[2422,2461]},["app",{"sourceInterval":[2422,2438]},"propertySequence",[]],["terminal",{"sourceInterval":[2439,2442]},"."],["app",{"sourceInterval":[2443,2461]},"categoryOrProperty",[]]]],"property_ofDirectAnyPropertySequence":["define",{"sourceInterval":[2494,2572]},null,[],["seq",{"sourceInterval":[2494,2542]},["app",{"sourceInterval":[2494,2519]},"directAnyPropertySequence",[]],["terminal",{"sourceInterval":[2520,2523]},"."],["app",{"sourceInterval":[2524,2542]},"categoryOrProperty",[]]]],"property_ofDirectAny":["define",{"sourceInterval":[2584,2638]},null,[],["seq",{"sourceInterval":[2584,2624]},["app",{"sourceInterval":[2584,2601]},"directAnyProperty",[]],["terminal",{"sourceInterval":[2602,2605]},"."],["app",{"sourceInterval":[2606,2624]},"categoryOrProperty",[]]]],"property":["define",{"sourceInterval":[2400,2638]},null,[],["alt",{"sourceInterval":[2422,2638]},["app",{"sourceInterval":[2422,2461]},"property_ofPropertySequence",[]],["app",{"sourceInterval":[2494,2542]},"property_ofDirectAnyPropertySequence",[]],["app",{"sourceInterval":[2584,2624]},"property_ofDirectAny",[]]]],"directProperty_ofCategory":["define",{"sourceInterval":[2693,2747]},null,[],["seq",{"sourceInterval":[2693,2734]},["app",{"sourceInterval":[2693,2711]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[2712,2715]},"."],["app",{"sourceInterval":[2716,2734]},"categoryOrProperty",[]]]],"directProperty_ofAnyProperty":["define",{"sourceInterval":[2759,2809]},null,[],["seq",{"sourceInterval":[2759,2793]},["app",{"sourceInterval":[2759,2770]},"anyProperty",[]],["terminal",{"sourceInterval":[2771,2774]},"."],["app",{"sourceInterval":[2775,2793]},"categoryOrProperty",[]]]],"directProperty":["define",{"sourceInterval":[2666,2809]},null,[],["alt",{"sourceInterval":[2693,2809]},["app",{"sourceInterval":[2693,2734]},"directProperty_ofCategory",[]],["app",{"sourceInterval":[2759,2793]},"directProperty_ofAnyProperty",[]]]],"directAnyPropertySequence":["define",{"sourceInterval":[2825,2885]},null,[],["seq",{"sourceInterval":[2853,2885]},["app",{"sourceInterval":[2853,2869]},"propertySequence",[]],["terminal",{"sourceInterval":[2870,2873]},"."],["app",{"sourceInterval":[2874,2885]},"anyProperty",[]]]],"directAnyProperty_sequenced":["define",{"sourceInterval":[2921,2966]},null,[],["seq",{"sourceInterval":[2921,2954]},["app",{"sourceInterval":[2921,2938]},"directAnyProperty",[]],["terminal",{"sourceInterval":[2939,2942]},"."],["app",{"sourceInterval":[2943,2954]},"anyProperty",[]]]],"directAnyProperty_ofCategory":["define",{"sourceInterval":[2978,3025]},null,[],["seq",{"sourceInterval":[2978,3012]},["app",{"sourceInterval":[2978,2996]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[2997,3000]},"."],["app",{"sourceInterval":[3001,3012]},"anyProperty",[]]]],"directAnyProperty_ofAny":["define",{"sourceInterval":[3037,3072]},null,[],["seq",{"sourceInterval":[3037,3064]},["app",{"sourceInterval":[3037,3048]},"anyProperty",[]],["terminal",{"sourceInterval":[3049,3052]},"."],["app",{"sourceInterval":[3053,3064]},"anyProperty",[]]]],"directAnyProperty":["define",{"sourceInterval":[2901,3072]},null,[],["alt",{"sourceInterval":[2921,3072]},["app",{"sourceInterval":[2921,2954]},"directAnyProperty_sequenced",[]],["app",{"sourceInterval":[2978,3012]},"directAnyProperty_ofCategory",[]],["app",{"sourceInterval":[3037,3064]},"directAnyProperty_ofAny",[]]]],"exactElement_ofPropertySequence":["define",{"sourceInterval":[3103,3144]},null,[],["seq",{"sourceInterval":[3103,3123]},["app",{"sourceInterval":[3103,3119]},"propertySequence",[]],["terminal",{"sourceInterval":[3120,3123]},"!"]]],"exactElement_ofCategory":["define",{"sourceInterval":[3156,3191]},null,[],["seq",{"sourceInterval":[3156,3178]},["app",{"sourceInterval":[3156,3174]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[3175,3178]},"!"]]],"exactElement":["define",{"sourceInterval":[3088,3191]},null,[],["alt",{"sourceInterval":[3103,3191]},["app",{"sourceInterval":[3103,3123]},"exactElement_ofPropertySequence",[]],["app",{"sourceInterval":[3156,3178]},"exactElement_ofCategory",[]]]],"categoryOrProperty_inBrackets":["define",{"sourceInterval":[3264,3298]},null,[],["seq",{"sourceInterval":[3264,3285]},["terminal",{"sourceInterval":[3264,3267]},"["],["app",{"sourceInterval":[3268,3281]},"identificator",[]],["terminal",{"sourceInterval":[3282,3285]},"]"]]],"categoryOrProperty_value":["define",{"sourceInterval":[3311,3325]},null,[],["plus",{"sourceInterval":[3311,3317]},["app",{"sourceInterval":[3311,3316]},"alnum",[]]]],"categoryOrProperty":["define",{"sourceInterval":[3203,3325]},"element category or property",[],["alt",{"sourceInterval":[3264,3325]},["app",{"sourceInterval":[3264,3285]},"categoryOrProperty_inBrackets",[]],["app",{"sourceInterval":[3311,3317]},"categoryOrProperty_value",[]]]],"maxWord":["define",{"sourceInterval":[3333,3365]},null,[],["app",{"sourceInterval":[3343,3365]},"caseInsensitive",[["terminal",{"sourceInterval":[3359,3364]},"max"]]]],"minWord":["define",{"sourceInterval":[3373,3405]},null,[],["app",{"sourceInterval":[3383,3405]},"caseInsensitive",[["terminal",{"sourceInterval":[3399,3404]},"min"]]]],"sumWord":["define",{"sourceInterval":[3413,3445]},null,[],["app",{"sourceInterval":[3423,3445]},"caseInsensitive",[["terminal",{"sourceInterval":[3439,3444]},"sum"]]]],"countWord":["define",{"sourceInterval":[3453,3489]},null,[],["app",{"sourceInterval":[3465,3489]},"caseInsensitive",[["terminal",{"sourceInterval":[3481,3488]},"count"]]]],"asWord":["define",{"sourceInterval":[3497,3527]},null,[],["app",{"sourceInterval":[3506,3527]},"caseInsensitive",[["terminal",{"sourceInterval":[3522,3526]},"as"]]]],"nonEqualSign":["define",{"sourceInterval":[3535,3561]},null,[],["alt",{"sourceInterval":[3550,3561]},["terminal",{"sourceInterval":[3550,3554]},"<>"],["terminal",{"sourceInterval":[3557,3561]},"!="]]],"andOperation":["define",{"sourceInterval":[3577,3612]},null,[],["alt",{"sourceInterval":[3592,3612]},["app",{"sourceInterval":[3592,3599]},"andWord",[]],["terminal",{"sourceInterval":[3602,3606]},"&&"],["terminal",{"sourceInterval":[3609,3612]},"&"]]],"andWord":["define",{"sourceInterval":[3620,3652]},null,[],["app",{"sourceInterval":[3630,3652]},"caseInsensitive",[["terminal",{"sourceInterval":[3646,3651]},"and"]]]],"orOperation":["define",{"sourceInterval":[3664,3697]},null,[],["alt",{"sourceInterval":[3678,3697]},["app",{"sourceInterval":[3678,3684]},"orWord",[]],["terminal",{"sourceInterval":[3687,3691]},"||"],["terminal",{"sourceInterval":[3694,3697]},"|"]]],"orWord":["define",{"sourceInterval":[3705,3735]},null,[],["app",{"sourceInterval":[3714,3735]},"caseInsensitive",[["terminal",{"sourceInterval":[3730,3734]},"or"]]]],"likeWord":["define",{"sourceInterval":[3743,3777]},null,[],["app",{"sourceInterval":[3754,3777]},"caseInsensitive",[["terminal",{"sourceInterval":[3770,3776]},"like"]]]],"anyProperty":["define",{"sourceInterval":[3789,3806]},null,[],["terminal",{"sourceInterval":[3803,3806]},"*"]],"identificator":["define",{"sourceInterval":[3818,3850]},null,[],["plus",{"sourceInterval":[3834,3850]},["seq",{"sourceInterval":[3835,3848]},["not",{"sourceInterval":[3835,3839]},["terminal",{"sourceInterval":[3836,3839]},"]"]],["not",{"sourceInterval":[3840,3844]},["terminal",{"sourceInterval":[3841,3844]},"["]],["app",{"sourceInterval":[3845,3848]},"any",[]]]]],"expressionConst":["define",{"sourceInterval":[3862,3898]},null,[],["alt",{"sourceInterval":[3880,3898]},["app",{"sourceInterval":[3880,3889]},"textConst",[]],["app",{"sourceInterval":[3892,3898]},"number",[]]]],"startsWithConst":["define",{"sourceInterval":[3906,3957]},null,[],["seq",{"sourceInterval":[3933,3957]},["terminal",{"sourceInterval":[3933,3937]},"\""],["app",{"sourceInterval":[3938,3951]},"likeTextValue",[]],["terminal",{"sourceInterval":[3952,3957]},"%\""]]],"endsWithConst":["define",{"sourceInterval":[3965,4014]},null,[],["seq",{"sourceInterval":[3990,4014]},["terminal",{"sourceInterval":[3990,3995]},"\"%"],["app",{"sourceInterval":[3996,4009]},"likeTextValue",[]],["terminal",{"sourceInterval":[4010,4014]},"\""]]],"textConst":["define",{"sourceInterval":[4026,4086]},"target text value",[],["seq",{"sourceInterval":[4067,4086]},["terminal",{"sourceInterval":[4067,4071]},"\""],["app",{"sourceInterval":[4072,4081]},"textValue",[]],["terminal",{"sourceInterval":[4082,4086]},"\""]]],"textValue":["define",{"sourceInterval":[4102,4123]},null,[],["star",{"sourceInterval":[4114,4123]},["app",{"sourceInterval":[4114,4122]},"textChar",[]]]],"likeTextValue":["define",{"sourceInterval":[4131,4160]},null,[],["star",{"sourceInterval":[4147,4160]},["app",{"sourceInterval":[4147,4159]},"likeTextChar",[]]]],"textChar":["define",{"sourceInterval":[4172,4221]},null,[],["alt",{"sourceInterval":[4192,4221]},["terminal",{"sourceInterval":[4192,4198]},"\\\""],["seq",{"sourceInterval":[4210,4221]},["not",{"sourceInterval":[4211,4216]},["terminal",{"sourceInterval":[4212,4216]},"\""]],["app",{"sourceInterval":[4217,4220]},"any",[]]]]],"likeTextChar":["define",{"sourceInterval":[4229,4307]},null,[],["alt",{"sourceInterval":[4253,4307]},["terminal",{"sourceInterval":[4253,4259]},"\\\""],["terminal",{"sourceInterval":[4271,4276]},"\\%"],["seq",{"sourceInterval":[4288,4307]},["not",{"sourceInterval":[4289,4302]},["alt",{"sourceInterval":[4291,4301]},["terminal",{"sourceInterval":[4291,4295]},"\""],["terminal",{"sourceInterval":[4298,4301]},"%"]]],["app",{"sourceInterval":[4303,4306]},"any",[]]]]],"number":["define",{"sourceInterval":[4323,4377]},null,[],["alt",{"sourceInterval":[4339,4377]},["app",{"sourceInterval":[4339,4353]},"positiveNumber",[]],["app",{"sourceInterval":[4363,4377]},"negativeNumber",[]]]],"negativeNumber":["define",{"sourceInterval":[4391,4426]},null,[],["seq",{"sourceInterval":[4408,4426]},["terminal",{"sourceInterval":[4408,4411]},"-"],["app",{"sourceInterval":[4412,4426]},"positiveNumber",[]]]],"positiveNumber":["define",{"sourceInterval":[4438,4481]},null,[],["alt",{"sourceInterval":[4455,4481]},["app",{"sourceInterval":[4455,4465]},"realNumber",[]],["app",{"sourceInterval":[4468,4481]},"integerNumber",[]]]],"integerNumber":["define",{"sourceInterval":[4495,4517]},null,[],["plus",{"sourceInterval":[4511,4517]},["app",{"sourceInterval":[4511,4516]},"digit",[]]]],"realNumber":["define",{"sourceInterval":[4529,4559]},null,[],["seq",{"sourceInterval":[4542,4559]},["star",{"sourceInterval":[4542,4548]},["app",{"sourceInterval":[4542,4547]},"digit",[]]],["terminal",{"sourceInterval":[4549,4552]},"."],["plus",{"sourceInterval":[4553,4559]},["app",{"sourceInterval":[4553,4558]},"digit",[]]]]]}]);module.exports=result;