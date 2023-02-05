import 'mocha';
import { assert } from 'chai';
import { expandTemplateCategories } from '../src/expandedWildcategoriesFactory';

describe("Wildcards expander", () => {
    it("must expand non-wildcards sequence to target length", () => {
        assert.equal(expandTemplateCategories(["a", "b"], 3).length, 1);
        assert.equal(expandTemplateCategories(["a", "b"], 3)[0].join("."), "a.b.*");
        
        assert.equal(expandTemplateCategories(["a", "b"], 4).length, 1);
        assert.equal(expandTemplateCategories(["a", "b"], 4)[0].join("."), "a.b.*.*");
    });

    it("must expand single sequence with single wildcard", () => {
        const sequences3 = expandTemplateCategories(["*", "a"], 3).map(x => x.join("."));

        assert.equal(sequences3.length, 2);

        assert.isTrue(sequences3.indexOf("*.*.a") >= 0);
        assert.isTrue(sequences3.indexOf("*.a.*") >= 0);

        const sequences4 = expandTemplateCategories(["*", "a"], 4).map(x => x.join("."));

        assert.equal(sequences4.length, 3);

        assert.isTrue(sequences4.indexOf("*.*.*.a") >= 0);
        assert.isTrue(sequences4.indexOf("*.*.a.*") >= 0);
        assert.isTrue(sequences4.indexOf("*.a.*.*") >= 0);
    });

    it("must expand sequences with multiple wildcards", () => {
        const sourceCategories = ["*", "a", "*", "b"];

        const preservedSingleSequence = expandTemplateCategories(sourceCategories, 4).map(x => x.join("."));

        assert.equal(preservedSingleSequence.length, 1);
        assert.equal(preservedSingleSequence[0], "*.a.*.b");

        const sequences5 = expandTemplateCategories(sourceCategories, 5).map(x => x.join("."));

        assert.equal(sequences5.length, 3);

        assert.isTrue(sequences5.indexOf("*.a.*.b.*") >= 0);
        assert.isTrue(sequences5.indexOf("*.a.*.*.b") >= 0);
        assert.isTrue(sequences5.indexOf("*.*.a.*.b") >= 0);

        const sequences6 = expandTemplateCategories(sourceCategories, 6).map(x => x.join("."));

        assert.equal(sequences6.length, 6);

        assert.isTrue(sequences6.indexOf("*.a.*.b.*.*") >= 0);
        assert.isTrue(sequences6.indexOf("*.a.*.*.b.*") >= 0);
        assert.isTrue(sequences6.indexOf("*.a.*.*.*.b") >= 0);
        assert.isTrue(sequences6.indexOf("*.*.a.*.b.*") >= 0);
        assert.isTrue(sequences6.indexOf("*.*.a.*.*.b") >= 0);
        assert.isTrue(sequences6.indexOf("*.*.*.a.*.b") >= 0);
    });
});