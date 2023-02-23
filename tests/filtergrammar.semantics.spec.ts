import 'mocha';
import { assert } from 'chai';
import grammar from "../src/filtergrammar.ohm-bundle";

describe("Filter grammar semantics tests", () => {
    const assertIsValidFilterString = (filterString: string) => assert.isTrue(grammar.match(filterString).succeeded());
    const assertIsInvalidFilterString = (filterString: string) => assert.isTrue(grammar.match(filterString).failed());

    it("entire top category filter", () => assertIsValidFilterString("Cat!"));

    it("entire sub category filter", () => assertIsValidFilterString("[Cat].[Subcat]!"));

    it("entire category can't participate in comparison", () => {
        assertIsInvalidFilterString("Cat! = 5");
        assertIsInvalidFilterString("Cat.Subcat! > 7")
        assertIsInvalidFilterString("Cat.*! > 7")
        assertIsInvalidFilterString("Cat.Subcat.*! > 7")
    })

    it("string property equality comparison filter", () => assertIsValidFilterString("c1.e1.p1.value = \"test\""));

    it("string property greater comparison filter", () => assertIsValidFilterString("c1.e1.p1.value > \"test\""));

    it("string property greater or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value >= \"test\""));

    it("string property less comparison filter", () => assertIsValidFilterString("c1.e1.p1.value < \"test\""));

    it("string property less or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value <= \"test\""));

    it("string property not equal comparison filter", () => {
        assertIsValidFilterString("c1.e1.p1.value <> \"test\"")
        assertIsValidFilterString("c1.e1.p1.value != \"test\"")
    });

    it("number property equality comparison filter", () => assertIsValidFilterString("c1.e1.p1.value = 5.7"));

    it("number property greater comparison filter", () => assertIsValidFilterString("c1.e1.p1.value > 5.7"));

    it("number property greater or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value >= 5.7"));

    it("number property less comparison filter", () => assertIsValidFilterString("c1.e1.p1.value < 5.7"));

    it("number property less or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value <= 5.7"));

    it("number property non-equality comparison filter", () => {
        assertIsValidFilterString("c1.e1.p1.value != 5.7");
        assertIsValidFilterString("c1.e1.p1.value <> 5.7");
    });

    it("negative number property equality comparison filter", () => assertIsValidFilterString("c1.e1.p1.value = -5.7"));

    it("negative number property greater comparison filter", () => assertIsValidFilterString("c1.e1.p1.value > -5.7"));

    it("negative number property greater or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value >= -5.7"));

    it("negative number property less comparison filter", () => assertIsValidFilterString("c1.e1.p1.value < -5.7"));

    it("negative number property less or equal comparison filter", () => assertIsValidFilterString("c1.e1.p1.value <= -5.7"));
    
    it("negative number non-equality comparison filter", () => {
        assertIsValidFilterString("c1.e1.p1.value != -5.7");
        assertIsValidFilterString("c1.e1.p1.value <> -5.7");
    });

    it("can replace category with an asterisk", () => {
        assertIsValidFilterString("cat.*.prop = 5.7");
        assertIsValidFilterString("cat.subcat.*.prop = 5.7");
    });

    it("can replace top category with an asterisk", () => assertIsValidFilterString("*.p = 5.7"));

    it("can replace multiple categories with an asterisk", () => {
        assertIsValidFilterString("*.*.prop = 5.7");
        assertIsValidFilterString("*.s.*.p = 5.7");
    });

    it("prop can't be an asterisk", () => {
        assertIsInvalidFilterString("cat.* = 5.7");
        assertIsInvalidFilterString("cat.subcat.* = 5.7");
        assertIsInvalidFilterString("*.* = 5.7");
    });

    it("grouped single expression filter", () => assertIsValidFilterString("(c1.sc1.v >= -57)"));

    it("simple logical and filter", () => {
        assertIsValidFilterString("c1.e3 = 5.7 and c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 And c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 AND c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 & c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 && c1.e4 = 87");
    });

    it("simple logical or filter", () => {
        assertIsValidFilterString("c1.e3 = 5.7 or c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 Or c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 OR c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 | c1.e4 = 87");
        assertIsValidFilterString("c1.e3 = 5.7 || c1.e4 = 87");
    });

    it("category filter can be a part of logical filter", () => assertIsValidFilterString("c1! || c2.subc2! && c3.elem.prop = 5.7"));

    it("multiple logical filters combinations", () => {
        assertIsValidFilterString("c1.e2 = \"ss\" and c1.e3 = 5.7 and c1.e4 = 87");
        assertIsValidFilterString("c1.e2 = \"ss\" or c1.e3 = 5.7 or c1.e4 = 87");
        assertIsValidFilterString("c1.e2 = \"ss\" and c1.e3 = 5.7 or c1.e4 = 87");
        assertIsValidFilterString("c1.e2 = \"ss\" or c1.e3 = 5.7 and c1.e4 = 87");
    });

    it("grouped filters", () => {
        assertIsValidFilterString("c1.el1.prop = 57 and (c2.el2.prop >= 57 or c1.el1.prop1 > 0)");
        assertIsValidFilterString("(c1.el1.prop = 57 or c2.el2.prop >= 57) and c1.el1.prop = 57");
    });

    it("nested grouped filters", () => {
        assertIsValidFilterString("((a.b = 5 or a.c = 7) and (b.a = 1 or b.c = 3)) or x.c = 1");
        assertIsValidFilterString("x.c = 1 or ((a.b = 5 or a.c = 7) and (b.a = 1 or b.c = 3))");
    });

    it("like (starts with) filters", () => {
        assertIsValidFilterString("c1.prop like \"some text%\"");
    });

    it("like (ends with) filters", () => {
        assertIsValidFilterString("c1.prop Like \"%some text\"");
    });

    it("filter with % sign in the middle of constraint must be invalid", () => {
        assertIsInvalidFilterString("c1.prop like \"some % text\"");
    });

    it('filter with "\\%" sign in the middle of constraint must be invalid', () => {
        assertIsValidFilterString("c1.prop like \"%some \\% text\"");
    });

    it("must support property expressions", () => {
        assertIsValidFilterString("*.property");
    });

    it("must support simple named property expressions", () => {
        assertIsValidFilterString("*.property as name");
    });

    it("must support properties list expressions", () => {
        assertIsValidFilterString("*.prop1, Cat.prop2");
        assertIsValidFilterString("*.prop1 as name1, Cat.prop2");
        assertIsValidFilterString("*.prop1 as name1, Cat.prop2 as name2");
    });

    it("must support filter -> select", () => {
        assertIsValidFilterString("category! -> *.property");
        assertIsValidFilterString("category! -> *.property as name");
        assertIsValidFilterString("category! -> *.property1 as name1, *.property as name2");
        assertIsValidFilterString("category.Element.property = 5.7 -> *.property1 as name1, *.property as name2");
    });

    it("must support simple aggregated expressions", () => {
        assertIsValidFilterString("count()");
        assertIsValidFilterString("sum(*.property)");
        assertIsValidFilterString("min(*.property)");
    });

    it("must support named aggregated expressions", () => {
        assertIsValidFilterString("count() as cnt");
        assertIsValidFilterString("sum(*.property) as sum");
        assertIsValidFilterString("min(*.property) as min");
    });

    it("must support filter -> aggregated functions", () => {
        assertIsValidFilterString("category! -> count()");
        assertIsValidFilterString("category! -> count() as cnt");

        assertIsValidFilterString("category! -> sum(*.property)");
        assertIsValidFilterString("category! -> sum(*.property) as sum");

        assertIsValidFilterString("category.Element.property = 5.7 -> count(), sum(*.property) as sum, min(*.property) as min")
    })
});