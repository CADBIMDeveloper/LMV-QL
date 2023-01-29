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

    it('must tokenize simple condition', () => {
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
    });

    it('must tokenize numbers with following brackets', () => {
        const filter = "([Category].[Property] >= 57)";

        const tokens = tokenize(filter);

        const lastToken = tokens[tokens.length - 1];

        assert.equal(lastToken.type, ")");
    });

    it('must fail tokenizing non-closed property tag', () => {
        const filter = "[Category].[Property";

        assert.throws(() => tokenize(filter), TokenizationFailureException, 'Missing enclosing "]"');
    });

    it('must tokenize complex condition', () => {
        const filter = '([C1].[Property] >= 1) AND ([C2].[Property1] = "T" OR [C2].[Property2] = 7 OR [C3].*)';

        const tokens = tokenize(filter);

        const validTokens = [
            { raw: "(", type: "(" },
            { raw: "[C1]", type: "category-or-property" },
            { raw: ".", type: "." },
            { raw: "[Property]", type: "category-or-property" },
            { raw: ">=", type: ">=" },
            { raw: "1", type: "number" },
            { raw: ")", type: ")" },
            { raw: 'AND', type: "and" },
            { raw: "(", type: "(" },
            { raw: "[C2]", type: "category-or-property" },
            { raw: ".", type: "." },
            { raw: "[Property1]", type: "category-or-property" },
            { raw: '=', type: '=' },
            { raw: '"T"', type: "string" },
            { raw: 'OR', type: 'or' },
            { raw: "[C2]", type: "category-or-property" },
            { raw: ".", type: "." },
            { raw: "[Property2]", type: "category-or-property" },
            { raw: '=', type: '=' },
            { raw: '7', type: "number" },
            { raw: 'OR', type: 'or' },
            { raw: "[C3]", type: "category-or-property" },
            { raw: ".", type: "." },
            { raw: '*', type: "allow-any" },
            { raw: ")", type: ")" },
        ];

        assert.equal(tokens.length, validTokens.length);

        for (let i = 0; i < tokens.length; ++i) {
            assert.equal(tokens[i].type, validTokens[i].type);
            assert.equal(tokens[i].raw, validTokens[i].raw);
        }
    });

    it('must fail tokenizing non-closed string', () => {
        const filter = '[Category].[Property] = "aa';

        assert.throws(() => tokenize(filter), TokenizationFailureException, "Missing enclosing quote");
    });

    it('must fail to tokenize property/category name with "[" symbol', () => {
        const filter = "[Walls].[Ca[tegory].Property = 5"

        assert.throws(() => tokenize(filter), TokenizationFailureException, "Invalid character");
    });

    it('must fail to tokenize empty or whitespace filter', () => {
        assert.throws(() => tokenize(""), TokenizationFailureException, "Filter string is empty");
        assert.throws(() => tokenize(" "), TokenizationFailureException, "Filter string is empty");
    });
})