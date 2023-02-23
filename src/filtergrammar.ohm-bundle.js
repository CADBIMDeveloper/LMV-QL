'use strict';const ohm=require('ohm-js');const result=ohm.makeRecipe(["grammar",{"source":"Filter {\r\n    Expr \r\n        = FilterWithSelectExpr\r\n        | FilterWithGroupedAggregedSelectExpr\r\n        | FilterWithAggregatedSelectExpr\r\n        | AggregatedSelectionClause\r\n        | FilterExpr\r\n        | PropertiesSelectExpr\r\n    \r\n    FilterWithSelectExpr = FilterExpr \"->\" PropertiesSelectExpr\r\n\r\n    FilterWithAggregatedSelectExpr = FilterExpr \"->\" AggregatedSelectionClause\r\n    \r\n    FilterWithGroupedAggregedSelectExpr = FilterExpr \"->\" AggregatedSelectionClause groupedBy PropertiesSelectExpr\r\n\r\n    FilterExpr = BoolOr\r\n    \r\n    BoolOr\r\n        = BoolOr orOperation BoolAnd -- or\r\n        | BoolAnd\r\n\r\n    BoolAnd \r\n        = BoolAnd andOperation PriExp  --and\r\n        | PriExp\r\n        \r\n    PriExp \r\n        = \"(\" FilterExpr \")\" -- paren\r\n        | ComparisonExp\r\n\r\n    ComparisonExp = EqualityExpr | LessThanExpr | MoreThanExpr | LessThanOrEqualExpr | MoreThanOrEqualExpr | NonEqualityExpr | StartsWithExpr | EndsWithExpr | exactElement\r\n\r\n    EqualityExpr = propertySequence \"=\" expressionConst\r\n    \r\n    LessThanExpr = propertySequence \"<\" expressionConst\r\n    \r\n    MoreThanExpr = propertySequence \">\" expressionConst\r\n    \r\n    LessThanOrEqualExpr = propertySequence \"<=\" expressionConst\r\n    \r\n    MoreThanOrEqualExpr = propertySequence \">=\" expressionConst\r\n\r\n    NonEqualityExpr = propertySequence nonEqualSign expressionConst\r\n\r\n    StartsWithExpr = propertySequence likeWord startsWithConst\r\n\r\n    EndsWithExpr = propertySequence likeWord endsWithConst\r\n\r\n    AggregatedSelectionClause = AggregatedFuncsExpr | AnyAggregatedFuncExpr\r\n\r\n    AggregatedFuncsExpr = AnyAggregatedFuncExpr (\",\" AnyAggregatedFuncExpr)*\r\n\r\n    AnyAggregatedFuncExpr = AggregatedNamedFuncExpr | AggregatedFuncExpr\r\n\r\n    AggregatedNamedFuncExpr = AggregatedFuncExpr asWord propertyNameIdentifier\r\n\r\n    AggregatedFuncExpr = AggregatedCountExpr | AggregatedSumExpr | AggregatedMinExpr | AggregatedMaxExpr | AggregatedAvgExpr\r\n\r\n    AggregatedCountExpr = countWord \"()\"\r\n\r\n    AggregatedSumExpr = sumWord \"(\" propertySequence \")\"\r\n\r\n    AggregatedMinExpr = minWord \"(\" propertySequence \")\"\r\n\r\n    AggregatedMaxExpr = maxWord \"(\" propertySequence \")\"\r\n\r\n    AggregatedAvgExpr = avgWord \"(\" propertySequence \")\"\r\n\r\n    PropertiesSelectExpr = PropertiesExpr | PropertyIdentifierExpr\r\n\r\n    PropertiesExpr = PropertyIdentifierExpr (\",\" PropertyIdentifierExpr)*\r\n\r\n    PropertyIdentifierExpr\r\n        = NamedPropertyExpr\r\n        | propertySequence\r\n\r\n    NamedPropertyExpr = propertySequence asWord propertyNameIdentifier\r\n\r\n    propertyNameIdentifier = (letter | digit | \"_\")+\r\n\r\n    propertySequence = property | directProperty\r\n                    \r\n    property \r\n        =  propertySequence \".\" categoryOrProperty --ofPropertySequence\r\n        | directAnyPropertySequence \".\" categoryOrProperty --ofDirectAnyPropertySequence\r\n        | directAnyProperty \".\" categoryOrProperty --ofDirectAny\r\n                    \r\n    directProperty \r\n        = categoryOrProperty \".\" categoryOrProperty --ofCategory\r\n        | anyProperty \".\" categoryOrProperty --ofAnyProperty\r\n        \r\n    directAnyPropertySequence = propertySequence \".\" anyProperty\r\n        \r\n    directAnyProperty = directAnyProperty \".\" anyProperty --sequenced\r\n        | categoryOrProperty \".\" anyProperty --ofCategory\r\n        | anyProperty \".\" anyProperty --ofAny\r\n        \r\n    exactElement = propertySequence \"!\" --ofPropertySequence\r\n        | categoryOrProperty \"!\" --ofCategory\r\n    \r\n    categoryOrProperty (element category or property)\r\n        = \"[\" identificator \"]\" --inBrackets \r\n        | alnum+ --value\r\n\r\n    groupedBy = caseInsensitive<\"group by\">\r\n\r\n    avgWord = caseInsensitive<\"avg\">\r\n\r\n    maxWord = caseInsensitive<\"max\">\r\n\r\n    minWord = caseInsensitive<\"min\">\r\n\r\n    sumWord = caseInsensitive<\"sum\">\r\n\r\n    countWord = caseInsensitive<\"count\">\r\n\r\n    asWord = caseInsensitive<\"as\">\r\n\r\n    nonEqualSign = \"<>\" | \"!=\"\r\n        \r\n    andOperation = andWord | \"&&\" | \"&\"\r\n\r\n    andWord = caseInsensitive<\"and\">\r\n    \r\n    orOperation = orWord | \"||\" | \"|\"\r\n\r\n    orWord = caseInsensitive<\"or\">\r\n\r\n    likeWord = caseInsensitive<\"like\">\r\n    \r\n    anyProperty = \"*\"\r\n    \r\n    identificator = (~\"]\" ~\"[\" any)+\r\n    \r\n    expressionConst = textConst | number\r\n\r\n    startsWithConst\r\n        = \"\\\"\" likeTextValue \"%\\\"\"\r\n\r\n    endsWithConst\r\n        = \"\\\"%\" likeTextValue \"\\\"\"\r\n    \r\n    textConst (target text value)\r\n        = \"\\\"\" textValue \"\\\"\"\r\n        \r\n    textValue = textChar*\r\n\r\n    likeTextValue = likeTextChar*\r\n    \r\n    textChar\r\n        = \"\\\\\\\"\"\r\n        | (~\"\\\"\" any)\r\n\r\n    likeTextChar\r\n        = \"\\\\\\\"\"\r\n        | \"\\\\%\"\r\n        | (~(\"\\\"\" | \"%\") any)\r\n        \r\n    number\r\n      = positiveNumber\r\n      | negativeNumber\r\n      \r\n    negativeNumber = \"-\" positiveNumber\r\n    \r\n    positiveNumber = realNumber | integerNumber\r\n      \r\n    integerNumber = digit+\r\n    \r\n    realNumber = digit* \".\" digit+\r\n}"},"Filter",null,"Expr",{"Expr":["define",{"sourceInterval":[14,231]},null,[],["alt",{"sourceInterval":[31,231]},["app",{"sourceInterval":[31,51]},"FilterWithSelectExpr",[]],["app",{"sourceInterval":[63,98]},"FilterWithGroupedAggregedSelectExpr",[]],["app",{"sourceInterval":[110,140]},"FilterWithAggregatedSelectExpr",[]],["app",{"sourceInterval":[152,177]},"AggregatedSelectionClause",[]],["app",{"sourceInterval":[189,199]},"FilterExpr",[]],["app",{"sourceInterval":[211,231]},"PropertiesSelectExpr",[]]]],"FilterWithSelectExpr":["define",{"sourceInterval":[243,302]},null,[],["seq",{"sourceInterval":[266,302]},["app",{"sourceInterval":[266,276]},"FilterExpr",[]],["terminal",{"sourceInterval":[277,281]},"->"],["app",{"sourceInterval":[282,302]},"PropertiesSelectExpr",[]]]],"FilterWithAggregatedSelectExpr":["define",{"sourceInterval":[310,384]},null,[],["seq",{"sourceInterval":[343,384]},["app",{"sourceInterval":[343,353]},"FilterExpr",[]],["terminal",{"sourceInterval":[354,358]},"->"],["app",{"sourceInterval":[359,384]},"AggregatedSelectionClause",[]]]],"FilterWithGroupedAggregedSelectExpr":["define",{"sourceInterval":[396,506]},null,[],["seq",{"sourceInterval":[434,506]},["app",{"sourceInterval":[434,444]},"FilterExpr",[]],["terminal",{"sourceInterval":[445,449]},"->"],["app",{"sourceInterval":[450,475]},"AggregatedSelectionClause",[]],["app",{"sourceInterval":[476,485]},"groupedBy",[]],["app",{"sourceInterval":[486,506]},"PropertiesSelectExpr",[]]]],"FilterExpr":["define",{"sourceInterval":[514,533]},null,[],["app",{"sourceInterval":[527,533]},"BoolOr",[]]],"BoolOr_or":["define",{"sourceInterval":[563,595]},null,[],["seq",{"sourceInterval":[563,589]},["app",{"sourceInterval":[563,569]},"BoolOr",[]],["app",{"sourceInterval":[570,581]},"orOperation",[]],["app",{"sourceInterval":[582,589]},"BoolAnd",[]]]],"BoolOr":["define",{"sourceInterval":[545,614]},null,[],["alt",{"sourceInterval":[563,614]},["app",{"sourceInterval":[563,589]},"BoolOr_or",[]],["app",{"sourceInterval":[607,614]},"BoolAnd",[]]]],"BoolAnd_and":["define",{"sourceInterval":[642,676]},null,[],["seq",{"sourceInterval":[642,669]},["app",{"sourceInterval":[642,649]},"BoolAnd",[]],["app",{"sourceInterval":[650,662]},"andOperation",[]],["app",{"sourceInterval":[663,669]},"PriExp",[]]]],"BoolAnd":["define",{"sourceInterval":[622,694]},null,[],["alt",{"sourceInterval":[642,694]},["app",{"sourceInterval":[642,669]},"BoolAnd_and",[]],["app",{"sourceInterval":[688,694]},"PriExp",[]]]],"PriExp_paren":["define",{"sourceInterval":[729,756]},null,[],["seq",{"sourceInterval":[729,747]},["terminal",{"sourceInterval":[729,732]},"("],["app",{"sourceInterval":[733,743]},"FilterExpr",[]],["terminal",{"sourceInterval":[744,747]},")"]]],"PriExp":["define",{"sourceInterval":[710,781]},null,[],["alt",{"sourceInterval":[729,781]},["app",{"sourceInterval":[729,747]},"PriExp_paren",[]],["app",{"sourceInterval":[768,781]},"ComparisonExp",[]]]],"ComparisonExp":["define",{"sourceInterval":[789,956]},null,[],["alt",{"sourceInterval":[805,956]},["app",{"sourceInterval":[805,817]},"EqualityExpr",[]],["app",{"sourceInterval":[820,832]},"LessThanExpr",[]],["app",{"sourceInterval":[835,847]},"MoreThanExpr",[]],["app",{"sourceInterval":[850,869]},"LessThanOrEqualExpr",[]],["app",{"sourceInterval":[872,891]},"MoreThanOrEqualExpr",[]],["app",{"sourceInterval":[894,909]},"NonEqualityExpr",[]],["app",{"sourceInterval":[912,926]},"StartsWithExpr",[]],["app",{"sourceInterval":[929,941]},"EndsWithExpr",[]],["app",{"sourceInterval":[944,956]},"exactElement",[]]]],"EqualityExpr":["define",{"sourceInterval":[964,1015]},null,[],["seq",{"sourceInterval":[979,1015]},["app",{"sourceInterval":[979,995]},"propertySequence",[]],["terminal",{"sourceInterval":[996,999]},"="],["app",{"sourceInterval":[1000,1015]},"expressionConst",[]]]],"LessThanExpr":["define",{"sourceInterval":[1027,1078]},null,[],["seq",{"sourceInterval":[1042,1078]},["app",{"sourceInterval":[1042,1058]},"propertySequence",[]],["terminal",{"sourceInterval":[1059,1062]},"<"],["app",{"sourceInterval":[1063,1078]},"expressionConst",[]]]],"MoreThanExpr":["define",{"sourceInterval":[1090,1141]},null,[],["seq",{"sourceInterval":[1105,1141]},["app",{"sourceInterval":[1105,1121]},"propertySequence",[]],["terminal",{"sourceInterval":[1122,1125]},">"],["app",{"sourceInterval":[1126,1141]},"expressionConst",[]]]],"LessThanOrEqualExpr":["define",{"sourceInterval":[1153,1212]},null,[],["seq",{"sourceInterval":[1175,1212]},["app",{"sourceInterval":[1175,1191]},"propertySequence",[]],["terminal",{"sourceInterval":[1192,1196]},"<="],["app",{"sourceInterval":[1197,1212]},"expressionConst",[]]]],"MoreThanOrEqualExpr":["define",{"sourceInterval":[1224,1283]},null,[],["seq",{"sourceInterval":[1246,1283]},["app",{"sourceInterval":[1246,1262]},"propertySequence",[]],["terminal",{"sourceInterval":[1263,1267]},">="],["app",{"sourceInterval":[1268,1283]},"expressionConst",[]]]],"NonEqualityExpr":["define",{"sourceInterval":[1291,1354]},null,[],["seq",{"sourceInterval":[1309,1354]},["app",{"sourceInterval":[1309,1325]},"propertySequence",[]],["app",{"sourceInterval":[1326,1338]},"nonEqualSign",[]],["app",{"sourceInterval":[1339,1354]},"expressionConst",[]]]],"StartsWithExpr":["define",{"sourceInterval":[1362,1420]},null,[],["seq",{"sourceInterval":[1379,1420]},["app",{"sourceInterval":[1379,1395]},"propertySequence",[]],["app",{"sourceInterval":[1396,1404]},"likeWord",[]],["app",{"sourceInterval":[1405,1420]},"startsWithConst",[]]]],"EndsWithExpr":["define",{"sourceInterval":[1428,1482]},null,[],["seq",{"sourceInterval":[1443,1482]},["app",{"sourceInterval":[1443,1459]},"propertySequence",[]],["app",{"sourceInterval":[1460,1468]},"likeWord",[]],["app",{"sourceInterval":[1469,1482]},"endsWithConst",[]]]],"AggregatedSelectionClause":["define",{"sourceInterval":[1490,1561]},null,[],["alt",{"sourceInterval":[1518,1561]},["app",{"sourceInterval":[1518,1537]},"AggregatedFuncsExpr",[]],["app",{"sourceInterval":[1540,1561]},"AnyAggregatedFuncExpr",[]]]],"AggregatedFuncsExpr":["define",{"sourceInterval":[1569,1641]},null,[],["seq",{"sourceInterval":[1591,1641]},["app",{"sourceInterval":[1591,1612]},"AnyAggregatedFuncExpr",[]],["star",{"sourceInterval":[1613,1641]},["seq",{"sourceInterval":[1614,1639]},["terminal",{"sourceInterval":[1614,1617]},","],["app",{"sourceInterval":[1618,1639]},"AnyAggregatedFuncExpr",[]]]]]],"AnyAggregatedFuncExpr":["define",{"sourceInterval":[1649,1717]},null,[],["alt",{"sourceInterval":[1673,1717]},["app",{"sourceInterval":[1673,1696]},"AggregatedNamedFuncExpr",[]],["app",{"sourceInterval":[1699,1717]},"AggregatedFuncExpr",[]]]],"AggregatedNamedFuncExpr":["define",{"sourceInterval":[1725,1799]},null,[],["seq",{"sourceInterval":[1751,1799]},["app",{"sourceInterval":[1751,1769]},"AggregatedFuncExpr",[]],["app",{"sourceInterval":[1770,1776]},"asWord",[]],["app",{"sourceInterval":[1777,1799]},"propertyNameIdentifier",[]]]],"AggregatedFuncExpr":["define",{"sourceInterval":[1807,1927]},null,[],["alt",{"sourceInterval":[1828,1927]},["app",{"sourceInterval":[1828,1847]},"AggregatedCountExpr",[]],["app",{"sourceInterval":[1850,1867]},"AggregatedSumExpr",[]],["app",{"sourceInterval":[1870,1887]},"AggregatedMinExpr",[]],["app",{"sourceInterval":[1890,1907]},"AggregatedMaxExpr",[]],["app",{"sourceInterval":[1910,1927]},"AggregatedAvgExpr",[]]]],"AggregatedCountExpr":["define",{"sourceInterval":[1935,1971]},null,[],["seq",{"sourceInterval":[1957,1971]},["app",{"sourceInterval":[1957,1966]},"countWord",[]],["terminal",{"sourceInterval":[1967,1971]},"()"]]],"AggregatedSumExpr":["define",{"sourceInterval":[1979,2031]},null,[],["seq",{"sourceInterval":[1999,2031]},["app",{"sourceInterval":[1999,2006]},"sumWord",[]],["terminal",{"sourceInterval":[2007,2010]},"("],["app",{"sourceInterval":[2011,2027]},"propertySequence",[]],["terminal",{"sourceInterval":[2028,2031]},")"]]],"AggregatedMinExpr":["define",{"sourceInterval":[2039,2091]},null,[],["seq",{"sourceInterval":[2059,2091]},["app",{"sourceInterval":[2059,2066]},"minWord",[]],["terminal",{"sourceInterval":[2067,2070]},"("],["app",{"sourceInterval":[2071,2087]},"propertySequence",[]],["terminal",{"sourceInterval":[2088,2091]},")"]]],"AggregatedMaxExpr":["define",{"sourceInterval":[2099,2151]},null,[],["seq",{"sourceInterval":[2119,2151]},["app",{"sourceInterval":[2119,2126]},"maxWord",[]],["terminal",{"sourceInterval":[2127,2130]},"("],["app",{"sourceInterval":[2131,2147]},"propertySequence",[]],["terminal",{"sourceInterval":[2148,2151]},")"]]],"AggregatedAvgExpr":["define",{"sourceInterval":[2159,2211]},null,[],["seq",{"sourceInterval":[2179,2211]},["app",{"sourceInterval":[2179,2186]},"avgWord",[]],["terminal",{"sourceInterval":[2187,2190]},"("],["app",{"sourceInterval":[2191,2207]},"propertySequence",[]],["terminal",{"sourceInterval":[2208,2211]},")"]]],"PropertiesSelectExpr":["define",{"sourceInterval":[2219,2281]},null,[],["alt",{"sourceInterval":[2242,2281]},["app",{"sourceInterval":[2242,2256]},"PropertiesExpr",[]],["app",{"sourceInterval":[2259,2281]},"PropertyIdentifierExpr",[]]]],"PropertiesExpr":["define",{"sourceInterval":[2289,2358]},null,[],["seq",{"sourceInterval":[2306,2358]},["app",{"sourceInterval":[2306,2328]},"PropertyIdentifierExpr",[]],["star",{"sourceInterval":[2329,2358]},["seq",{"sourceInterval":[2330,2356]},["terminal",{"sourceInterval":[2330,2333]},","],["app",{"sourceInterval":[2334,2356]},"PropertyIdentifierExpr",[]]]]]],"PropertyIdentifierExpr":["define",{"sourceInterval":[2366,2445]},null,[],["alt",{"sourceInterval":[2400,2445]},["app",{"sourceInterval":[2400,2417]},"NamedPropertyExpr",[]],["app",{"sourceInterval":[2429,2445]},"propertySequence",[]]]],"NamedPropertyExpr":["define",{"sourceInterval":[2453,2519]},null,[],["seq",{"sourceInterval":[2473,2519]},["app",{"sourceInterval":[2473,2489]},"propertySequence",[]],["app",{"sourceInterval":[2490,2496]},"asWord",[]],["app",{"sourceInterval":[2497,2519]},"propertyNameIdentifier",[]]]],"propertyNameIdentifier":["define",{"sourceInterval":[2527,2575]},null,[],["plus",{"sourceInterval":[2552,2575]},["alt",{"sourceInterval":[2553,2573]},["app",{"sourceInterval":[2553,2559]},"letter",[]],["app",{"sourceInterval":[2562,2567]},"digit",[]],["terminal",{"sourceInterval":[2570,2573]},"_"]]]],"propertySequence":["define",{"sourceInterval":[2583,2627]},null,[],["alt",{"sourceInterval":[2602,2627]},["app",{"sourceInterval":[2602,2610]},"property",[]],["app",{"sourceInterval":[2613,2627]},"directProperty",[]]]],"property_ofPropertySequence":["define",{"sourceInterval":[2677,2737]},null,[],["seq",{"sourceInterval":[2677,2716]},["app",{"sourceInterval":[2677,2693]},"propertySequence",[]],["terminal",{"sourceInterval":[2694,2697]},"."],["app",{"sourceInterval":[2698,2716]},"categoryOrProperty",[]]]],"property_ofDirectAnyPropertySequence":["define",{"sourceInterval":[2749,2827]},null,[],["seq",{"sourceInterval":[2749,2797]},["app",{"sourceInterval":[2749,2774]},"directAnyPropertySequence",[]],["terminal",{"sourceInterval":[2775,2778]},"."],["app",{"sourceInterval":[2779,2797]},"categoryOrProperty",[]]]],"property_ofDirectAny":["define",{"sourceInterval":[2839,2893]},null,[],["seq",{"sourceInterval":[2839,2879]},["app",{"sourceInterval":[2839,2856]},"directAnyProperty",[]],["terminal",{"sourceInterval":[2857,2860]},"."],["app",{"sourceInterval":[2861,2879]},"categoryOrProperty",[]]]],"property":["define",{"sourceInterval":[2655,2893]},null,[],["alt",{"sourceInterval":[2677,2893]},["app",{"sourceInterval":[2677,2716]},"property_ofPropertySequence",[]],["app",{"sourceInterval":[2749,2797]},"property_ofDirectAnyPropertySequence",[]],["app",{"sourceInterval":[2839,2879]},"property_ofDirectAny",[]]]],"directProperty_ofCategory":["define",{"sourceInterval":[2948,3002]},null,[],["seq",{"sourceInterval":[2948,2989]},["app",{"sourceInterval":[2948,2966]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[2967,2970]},"."],["app",{"sourceInterval":[2971,2989]},"categoryOrProperty",[]]]],"directProperty_ofAnyProperty":["define",{"sourceInterval":[3014,3064]},null,[],["seq",{"sourceInterval":[3014,3048]},["app",{"sourceInterval":[3014,3025]},"anyProperty",[]],["terminal",{"sourceInterval":[3026,3029]},"."],["app",{"sourceInterval":[3030,3048]},"categoryOrProperty",[]]]],"directProperty":["define",{"sourceInterval":[2921,3064]},null,[],["alt",{"sourceInterval":[2948,3064]},["app",{"sourceInterval":[2948,2989]},"directProperty_ofCategory",[]],["app",{"sourceInterval":[3014,3048]},"directProperty_ofAnyProperty",[]]]],"directAnyPropertySequence":["define",{"sourceInterval":[3080,3140]},null,[],["seq",{"sourceInterval":[3108,3140]},["app",{"sourceInterval":[3108,3124]},"propertySequence",[]],["terminal",{"sourceInterval":[3125,3128]},"."],["app",{"sourceInterval":[3129,3140]},"anyProperty",[]]]],"directAnyProperty_sequenced":["define",{"sourceInterval":[3176,3221]},null,[],["seq",{"sourceInterval":[3176,3209]},["app",{"sourceInterval":[3176,3193]},"directAnyProperty",[]],["terminal",{"sourceInterval":[3194,3197]},"."],["app",{"sourceInterval":[3198,3209]},"anyProperty",[]]]],"directAnyProperty_ofCategory":["define",{"sourceInterval":[3233,3280]},null,[],["seq",{"sourceInterval":[3233,3267]},["app",{"sourceInterval":[3233,3251]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[3252,3255]},"."],["app",{"sourceInterval":[3256,3267]},"anyProperty",[]]]],"directAnyProperty_ofAny":["define",{"sourceInterval":[3292,3327]},null,[],["seq",{"sourceInterval":[3292,3319]},["app",{"sourceInterval":[3292,3303]},"anyProperty",[]],["terminal",{"sourceInterval":[3304,3307]},"."],["app",{"sourceInterval":[3308,3319]},"anyProperty",[]]]],"directAnyProperty":["define",{"sourceInterval":[3156,3327]},null,[],["alt",{"sourceInterval":[3176,3327]},["app",{"sourceInterval":[3176,3209]},"directAnyProperty_sequenced",[]],["app",{"sourceInterval":[3233,3267]},"directAnyProperty_ofCategory",[]],["app",{"sourceInterval":[3292,3319]},"directAnyProperty_ofAny",[]]]],"exactElement_ofPropertySequence":["define",{"sourceInterval":[3358,3399]},null,[],["seq",{"sourceInterval":[3358,3378]},["app",{"sourceInterval":[3358,3374]},"propertySequence",[]],["terminal",{"sourceInterval":[3375,3378]},"!"]]],"exactElement_ofCategory":["define",{"sourceInterval":[3411,3446]},null,[],["seq",{"sourceInterval":[3411,3433]},["app",{"sourceInterval":[3411,3429]},"categoryOrProperty",[]],["terminal",{"sourceInterval":[3430,3433]},"!"]]],"exactElement":["define",{"sourceInterval":[3343,3446]},null,[],["alt",{"sourceInterval":[3358,3446]},["app",{"sourceInterval":[3358,3378]},"exactElement_ofPropertySequence",[]],["app",{"sourceInterval":[3411,3433]},"exactElement_ofCategory",[]]]],"categoryOrProperty_inBrackets":["define",{"sourceInterval":[3519,3553]},null,[],["seq",{"sourceInterval":[3519,3540]},["terminal",{"sourceInterval":[3519,3522]},"["],["app",{"sourceInterval":[3523,3536]},"identificator",[]],["terminal",{"sourceInterval":[3537,3540]},"]"]]],"categoryOrProperty_value":["define",{"sourceInterval":[3566,3580]},null,[],["plus",{"sourceInterval":[3566,3572]},["app",{"sourceInterval":[3566,3571]},"alnum",[]]]],"categoryOrProperty":["define",{"sourceInterval":[3458,3580]},"element category or property",[],["alt",{"sourceInterval":[3519,3580]},["app",{"sourceInterval":[3519,3540]},"categoryOrProperty_inBrackets",[]],["app",{"sourceInterval":[3566,3572]},"categoryOrProperty_value",[]]]],"groupedBy":["define",{"sourceInterval":[3588,3627]},null,[],["app",{"sourceInterval":[3600,3627]},"caseInsensitive",[["terminal",{"sourceInterval":[3616,3626]},"group by"]]]],"avgWord":["define",{"sourceInterval":[3635,3667]},null,[],["app",{"sourceInterval":[3645,3667]},"caseInsensitive",[["terminal",{"sourceInterval":[3661,3666]},"avg"]]]],"maxWord":["define",{"sourceInterval":[3675,3707]},null,[],["app",{"sourceInterval":[3685,3707]},"caseInsensitive",[["terminal",{"sourceInterval":[3701,3706]},"max"]]]],"minWord":["define",{"sourceInterval":[3715,3747]},null,[],["app",{"sourceInterval":[3725,3747]},"caseInsensitive",[["terminal",{"sourceInterval":[3741,3746]},"min"]]]],"sumWord":["define",{"sourceInterval":[3755,3787]},null,[],["app",{"sourceInterval":[3765,3787]},"caseInsensitive",[["terminal",{"sourceInterval":[3781,3786]},"sum"]]]],"countWord":["define",{"sourceInterval":[3795,3831]},null,[],["app",{"sourceInterval":[3807,3831]},"caseInsensitive",[["terminal",{"sourceInterval":[3823,3830]},"count"]]]],"asWord":["define",{"sourceInterval":[3839,3869]},null,[],["app",{"sourceInterval":[3848,3869]},"caseInsensitive",[["terminal",{"sourceInterval":[3864,3868]},"as"]]]],"nonEqualSign":["define",{"sourceInterval":[3877,3903]},null,[],["alt",{"sourceInterval":[3892,3903]},["terminal",{"sourceInterval":[3892,3896]},"<>"],["terminal",{"sourceInterval":[3899,3903]},"!="]]],"andOperation":["define",{"sourceInterval":[3919,3954]},null,[],["alt",{"sourceInterval":[3934,3954]},["app",{"sourceInterval":[3934,3941]},"andWord",[]],["terminal",{"sourceInterval":[3944,3948]},"&&"],["terminal",{"sourceInterval":[3951,3954]},"&"]]],"andWord":["define",{"sourceInterval":[3962,3994]},null,[],["app",{"sourceInterval":[3972,3994]},"caseInsensitive",[["terminal",{"sourceInterval":[3988,3993]},"and"]]]],"orOperation":["define",{"sourceInterval":[4006,4039]},null,[],["alt",{"sourceInterval":[4020,4039]},["app",{"sourceInterval":[4020,4026]},"orWord",[]],["terminal",{"sourceInterval":[4029,4033]},"||"],["terminal",{"sourceInterval":[4036,4039]},"|"]]],"orWord":["define",{"sourceInterval":[4047,4077]},null,[],["app",{"sourceInterval":[4056,4077]},"caseInsensitive",[["terminal",{"sourceInterval":[4072,4076]},"or"]]]],"likeWord":["define",{"sourceInterval":[4085,4119]},null,[],["app",{"sourceInterval":[4096,4119]},"caseInsensitive",[["terminal",{"sourceInterval":[4112,4118]},"like"]]]],"anyProperty":["define",{"sourceInterval":[4131,4148]},null,[],["terminal",{"sourceInterval":[4145,4148]},"*"]],"identificator":["define",{"sourceInterval":[4160,4192]},null,[],["plus",{"sourceInterval":[4176,4192]},["seq",{"sourceInterval":[4177,4190]},["not",{"sourceInterval":[4177,4181]},["terminal",{"sourceInterval":[4178,4181]},"]"]],["not",{"sourceInterval":[4182,4186]},["terminal",{"sourceInterval":[4183,4186]},"["]],["app",{"sourceInterval":[4187,4190]},"any",[]]]]],"expressionConst":["define",{"sourceInterval":[4204,4240]},null,[],["alt",{"sourceInterval":[4222,4240]},["app",{"sourceInterval":[4222,4231]},"textConst",[]],["app",{"sourceInterval":[4234,4240]},"number",[]]]],"startsWithConst":["define",{"sourceInterval":[4248,4299]},null,[],["seq",{"sourceInterval":[4275,4299]},["terminal",{"sourceInterval":[4275,4279]},"\""],["app",{"sourceInterval":[4280,4293]},"likeTextValue",[]],["terminal",{"sourceInterval":[4294,4299]},"%\""]]],"endsWithConst":["define",{"sourceInterval":[4307,4356]},null,[],["seq",{"sourceInterval":[4332,4356]},["terminal",{"sourceInterval":[4332,4337]},"\"%"],["app",{"sourceInterval":[4338,4351]},"likeTextValue",[]],["terminal",{"sourceInterval":[4352,4356]},"\""]]],"textConst":["define",{"sourceInterval":[4368,4428]},"target text value",[],["seq",{"sourceInterval":[4409,4428]},["terminal",{"sourceInterval":[4409,4413]},"\""],["app",{"sourceInterval":[4414,4423]},"textValue",[]],["terminal",{"sourceInterval":[4424,4428]},"\""]]],"textValue":["define",{"sourceInterval":[4444,4465]},null,[],["star",{"sourceInterval":[4456,4465]},["app",{"sourceInterval":[4456,4464]},"textChar",[]]]],"likeTextValue":["define",{"sourceInterval":[4473,4502]},null,[],["star",{"sourceInterval":[4489,4502]},["app",{"sourceInterval":[4489,4501]},"likeTextChar",[]]]],"textChar":["define",{"sourceInterval":[4514,4563]},null,[],["alt",{"sourceInterval":[4534,4563]},["terminal",{"sourceInterval":[4534,4540]},"\\\""],["seq",{"sourceInterval":[4552,4563]},["not",{"sourceInterval":[4553,4558]},["terminal",{"sourceInterval":[4554,4558]},"\""]],["app",{"sourceInterval":[4559,4562]},"any",[]]]]],"likeTextChar":["define",{"sourceInterval":[4571,4649]},null,[],["alt",{"sourceInterval":[4595,4649]},["terminal",{"sourceInterval":[4595,4601]},"\\\""],["terminal",{"sourceInterval":[4613,4618]},"\\%"],["seq",{"sourceInterval":[4630,4649]},["not",{"sourceInterval":[4631,4644]},["alt",{"sourceInterval":[4633,4643]},["terminal",{"sourceInterval":[4633,4637]},"\""],["terminal",{"sourceInterval":[4640,4643]},"%"]]],["app",{"sourceInterval":[4645,4648]},"any",[]]]]],"number":["define",{"sourceInterval":[4665,4719]},null,[],["alt",{"sourceInterval":[4681,4719]},["app",{"sourceInterval":[4681,4695]},"positiveNumber",[]],["app",{"sourceInterval":[4705,4719]},"negativeNumber",[]]]],"negativeNumber":["define",{"sourceInterval":[4733,4768]},null,[],["seq",{"sourceInterval":[4750,4768]},["terminal",{"sourceInterval":[4750,4753]},"-"],["app",{"sourceInterval":[4754,4768]},"positiveNumber",[]]]],"positiveNumber":["define",{"sourceInterval":[4780,4823]},null,[],["alt",{"sourceInterval":[4797,4823]},["app",{"sourceInterval":[4797,4807]},"realNumber",[]],["app",{"sourceInterval":[4810,4823]},"integerNumber",[]]]],"integerNumber":["define",{"sourceInterval":[4837,4859]},null,[],["plus",{"sourceInterval":[4853,4859]},["app",{"sourceInterval":[4853,4858]},"digit",[]]]],"realNumber":["define",{"sourceInterval":[4871,4901]},null,[],["seq",{"sourceInterval":[4884,4901]},["star",{"sourceInterval":[4884,4890]},["app",{"sourceInterval":[4884,4889]},"digit",[]]],["terminal",{"sourceInterval":[4891,4894]},"."],["plus",{"sourceInterval":[4895,4901]},["app",{"sourceInterval":[4895,4900]},"digit",[]]]]]}]);module.exports=result;