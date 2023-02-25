import 'mocha';
import { assert, expect } from 'chai';
import { PropertyDatabaseQueryableElement } from '../src/propertyDatabaseQueryableElement';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';
import { pdb } from './mocks/propertyDatabaseMock';
import { doubleRootPdb } from './mocks/doubleRootPropertyDatabaseMock';
import { findRootNodes } from '../src/rootsNodesFactory';
import { PropertyValuesQueryFactory } from '../src/propertyValuesQueryFactory';

describe("Property database filterable element tests", () => {
    const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

    const rootNodes = findRootNodes(pdb, attributesCollection);

    const propertyValuesQueryFactory = new PropertyValuesQueryFactory(pdb, attributesCollection, rootNodes);

    it("must get element categories", () => {
        const element = new PropertyDatabaseQueryableElement(4, propertyValuesQueryFactory);

        expect(element.categoriesList).to.eql(["Category", "SubCategory", "Element"]);

        const type = new PropertyDatabaseQueryableElement(3, propertyValuesQueryFactory);

        expect(type.categoriesList).to.eql(["Category", "SubCategory"]);

        const cat = new PropertyDatabaseQueryableElement(2, propertyValuesQueryFactory);

        expect(cat.categoriesList).to.eql(["Category"]);

        const root = new PropertyDatabaseQueryableElement(1, propertyValuesQueryFactory);

        expect(root.categoriesList).to.eql([]);
    });

    it("must get property values", () => {
        const element = new PropertyDatabaseQueryableElement(4, propertyValuesQueryFactory);

        const elementPropertyValue = element.getPropertyValue("element property", ["Category", "SubCategory", "Element"]).value;

        assert.equal(elementPropertyValue, 5.7);

        const typePropertyValue = element.getPropertyValue("element type property", ["Category", "SubCategory"]).value;

        assert.equal(typePropertyValue, 1.3);
    });

    it("must get instances property values", () => {
        const element = new PropertyDatabaseQueryableElement(4, propertyValuesQueryFactory);

        const elementPropertyValue = element.getPropertyValue("instance property", ["Category", "SubCategory", "Element"]).value;

        assert.equal(elementPropertyValue, "instance property value");
    });

    it("must get internal ref property value", () => {
        const element = new PropertyDatabaseQueryableElement(4, propertyValuesQueryFactory);

        const levelPropertyValue = element.getPropertyValue("Level", ["Category", "SubCategory", "Element"]).value;

        assert.equal(levelPropertyValue, "Level 1");
    });

    it("must get double-rooted model element property value", () => {
        const doubleRootedModelAttributeCollection = new PropertyDatabaseAttributesCollection(doubleRootPdb, true);

        const roots = findRootNodes(doubleRootPdb, attributesCollection);

        const doubleRootedPropertyValuesQueryFactory = new PropertyValuesQueryFactory(doubleRootPdb, doubleRootedModelAttributeCollection, roots);

        const element = new PropertyDatabaseQueryableElement(3, doubleRootedPropertyValuesQueryFactory);

        const propertyValue = element.getPropertyValue("element property", ["Element"]).value;

        assert.equal(propertyValue, 5.7);
    });
});