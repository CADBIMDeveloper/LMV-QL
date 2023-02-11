import 'mocha';
import { assert, expect } from 'chai';
import { PropertyDatabaseFilterableElement } from '../src/propertyDatabaseFilterableElement';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';
import { pdb } from './mocks/propertyDatabaseMock';

describe("Property database filterable element tests", () => {
    const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

    it("must get element categories", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection);

        expect(element.categoriesList).to.eql(["Category", "SubCategory", "Element"]);

        const type = new PropertyDatabaseFilterableElement(3, pdb, attributesCollection);

        expect(type.categoriesList).to.eql(["Category", "SubCategory"]);

        const cat = new PropertyDatabaseFilterableElement(2, pdb, attributesCollection);

        expect(cat.categoriesList).to.eql(["Category"]);

        const root = new PropertyDatabaseFilterableElement(1, pdb, attributesCollection);

        expect(root.categoriesList).to.eql([]);
    });

    it("must get property values", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection);

        const elementPropertyValue = element.getPropertyValue("element property", ["Category", "SubCategory", "Element"]);

        assert.equal(elementPropertyValue, 5.7);

        const typePropertyValue = element.getPropertyValue("element type property", ["Category", "SubCategory"]);

        assert.equal(typePropertyValue, 1.3);
    });
});