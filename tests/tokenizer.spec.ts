import 'mocha';
import { assert } from 'chai';
import { tokenize } from '../src/tokenizer';
import { FormattedToken } from '../src/token';
import { TokenizationFailureException } from '../src/tokenizerExceptions';

describe("Tokenizer test", () => {
    it('must tokenize exact value', () => {
        const filter = "[Level1]!";

        const tokens = tokenize(filter);
        
        assert.equal(tokens.length, 2);

        const categoryToken = tokens[0] as FormattedToken;

        assert.equal(categoryToken.type, "category-or-property");
        assert.equal(categoryToken.formatted, "Level1");

        assert.equal(tokens[1].type, "use-exact");
    });

    it ('must tokenize simple condition', () => {
        const filter = "[Walls].[Subcategory].[Property] <= 57";

        const tokens = tokenize(filter);

        const categoryToken = tokens[0] as FormattedToken;

        assert.equal(categoryToken.type, "category-or-property");
        assert.equal(categoryToken.formatted, "Walls");

        assert.equal(tokens[1].type, ".");

        const subCategoryToken = tokens[2] as FormattedToken;

        assert.equal(subCategoryToken.type, "category-or-property");
        assert.equal(subCategoryToken.formatted, "Subcategory");

        assert.equal(tokens[3].type, ".");

        const propertyToken = tokens[4] as FormattedToken;

        assert.equal(propertyToken.type, "category-or-property");
        assert.equal(propertyToken.formatted, "Property");

        assert.equal(tokens[5].type, "<=");
        assert.equal(tokens[6].type, "number")
        assert.equal(tokens[6].raw, "57");
    });

    it('must tokenize string condition', () => {
        const filter = '[Category].[Property] = "test"'

        const tokens = tokenize(filter);

        const categoryToken = tokens[0] as FormattedToken;

        assert.equal(categoryToken.type, "category-or-property");
        assert.equal(categoryToken.formatted, "Category");

        assert.equal(tokens[1].type, ".");

        const propertyToken = tokens[2] as FormattedToken;

        assert.equal(propertyToken.type, "category-or-property");
        assert.equal(propertyToken.formatted, "Property");

        assert.equal(tokens[3].type, "=");

        const valueToken = tokens[4] as FormattedToken;

        assert.equal(valueToken.formatted, "test");
    })

    it('must fail to tokenize property/category name with "[" symbol', () => {
        const filter = "[Walls].[Ca[tegory].Property = 5"

        assert.throws(() => tokenize(filter), TokenizationFailureException, "Invalid character");
    });

    it('must fail to tokenize empty or whitespace filter', () => {
        assert.throws(() => tokenize(""), TokenizationFailureException, "Filter string is empty");
        assert.throws(() => tokenize(" "), TokenizationFailureException, "Filter string is empty");
    });
})