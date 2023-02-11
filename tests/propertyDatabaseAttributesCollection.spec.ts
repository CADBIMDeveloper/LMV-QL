import 'mocha';
import { assert, expect } from 'chai';
import { AttributeDefinition, ObjectProperties, PropertyDatabase, PropertyValue } from '../src/propertyDatabase';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';

describe("Attributes collection tests", () => {
    const pdb: PropertyDatabase = {
        enumAttributes: (callBack: (attrId: number, attrDef: AttributeDefinition) => void) => {
            callBack(1, { name: "a", category: "cat", dataType: 20, displayName: null });
            callBack(2, { name: "A", category: "cat", dataType: 20, displayName: null });
            callBack(3, { name: "b", category: "cat", dataType: 20, displayName: null });
            callBack(4, { name: "mult", category: "cat", dataType: 20, displayName: null });
            callBack(5, { name: "mult", category: "cat", dataType: 20, displayName: null });
            callBack(6, { name: "name", category: "__name__", dataType: 20, displayName: null });
        },

        findRootNodes: function (): number[] {
            throw new Error('Function not implemented.');
        },
        findParent: function (_dbId: number): number | null {
            throw new Error('Function not implemented.');
        },
        enumObjects: function (_callBack: (dbId: number, fromId?: number | undefined, toId?: number | undefined) => void): void {
            throw new Error('Function not implemented.');
        },
        enumObjectProperties: function (_dbId: number, _callBack: (attrId: number, attrValueId: number) => void): void {
            throw new Error('Function not implemented.');
        },
        getNodeNameAndChildren: function (_query: { dbId: number; }): { dbId: number; parent: number; }[] {
            throw new Error('Function not implemented.');
        },
        getObjectProperties: function (_dbId: number): ObjectProperties {
            throw new Error('Function not implemented.');
        },
        getAttrValue: function (_attrId: number, _attrValueId: number): string | number {
            throw new Error('Function not implemented.');
        },
        _getObjectProperty: function (_attrId: number, _attrValueId: number): PropertyValue {
            throw new Error('Function not implemented.');
        }
    }

    it("must find attribute by name", () => {
        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

        expect(attributesCollection.findAttributesIdsByName("a")).to.eql([1]);
        expect(attributesCollection.findAttributesIdsByName("A")).to.eql([2]);
        expect(attributesCollection.findAttributesIdsByName("b")).to.eql([3]);
    });

    it("must find attributes by name", () => {
        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

        expect(attributesCollection.findAttributesIdsByName("mult")).to.eql([4, 5]);
    });

    it("must find attributes by name case insensitive", () => {
        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, false);

        expect(attributesCollection.findAttributesIdsByName("a")).to.eql([1, 2]);
    });

    it ("must setup nameAttributeId", () => {
        const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

        assert.equal(attributesCollection.nameAttributeId, 6);
    })
});