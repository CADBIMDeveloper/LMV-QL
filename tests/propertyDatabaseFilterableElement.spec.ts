import 'mocha';
import { assert, expect } from 'chai';
import { PropertyDatabaseFilterableElement } from '../src/propertyDatabaseFilterableElement';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';
import { pdb } from './mocks/propertyDatabaseMock';
import { doubleRootPdb } from './mocks/doubleRootPropertyDatabaseMock';
import { findRootNodes } from '../src/rootsNodesFactory';

describe("Property database filterable element tests", () => {
    const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

    const rootNodes = findRootNodes(pdb, attributesCollection);

    it("must get element categories", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection, rootNodes);

        expect(element.categoriesList).to.eql(["Category", "SubCategory", "Element"]);

        const type = new PropertyDatabaseFilterableElement(3, pdb, attributesCollection, rootNodes);

        expect(type.categoriesList).to.eql(["Category", "SubCategory"]);

        const cat = new PropertyDatabaseFilterableElement(2, pdb, attributesCollection, rootNodes);

        expect(cat.categoriesList).to.eql(["Category"]);

        const root = new PropertyDatabaseFilterableElement(1, pdb, attributesCollection, rootNodes);

        expect(root.categoriesList).to.eql([]);
    });

    it("must get property values", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection, rootNodes);

        const elementPropertyValue = element.getPropertyValue("element property", ["Category", "SubCategory", "Element"]);

        assert.equal(elementPropertyValue, 5.7);

        const typePropertyValue = element.getPropertyValue("element type property", ["Category", "SubCategory"]);

        assert.equal(typePropertyValue, 1.3);
    });

    it("must get instances property values", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection, rootNodes);

        const elementPropertyValue = element.getPropertyValue("instance property", ["Category", "SubCategory", "Element"]);

        assert.equal(elementPropertyValue, "instance property value");
    });

    it("must get internal ref property value", () => {
        const element = new PropertyDatabaseFilterableElement(4, pdb, attributesCollection, rootNodes);

        const levelPropertyValue = element.getPropertyValue("Level", ["Category", "SubCategory", "Element"]);

        assert.equal(levelPropertyValue, "Level 1");
    });

    it("must get double-rooted model element property value", () => {
        const doubleRootedModelAttributeCollection = new PropertyDatabaseAttributesCollection(doubleRootPdb, true);

        const roots = findRootNodes(doubleRootPdb, attributesCollection)

        const element = new PropertyDatabaseFilterableElement(3, doubleRootPdb, doubleRootedModelAttributeCollection, roots);

        const propertyValue = element.getPropertyValue("element property", ["Element"]);

        assert.equal(propertyValue, 5.7);
    });
});