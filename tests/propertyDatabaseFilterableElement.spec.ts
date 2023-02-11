import 'mocha';
import { assert, expect } from 'chai';
import { AttributeDefinition, ObjectProperties, PropertyDatabase, PropertyValue } from '../src/propertyDatabase';
import { PropertyModelFilterableElement } from '../src/propertyDatabaseFilterableElement';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';

describe("Property database filterable element tests", () => {
    /* 1 (root) -> 2 (Category) -> 3 (SubCategory) -> 4 (Element) */
    /*
    attrId = 1: name
    attrValueId = 1..4 -> names
    attrId = 2: element type property value. Only subcategory has it. attrValueId = 5
    attrId = 3: element property value. Only element has it. attrValueId = 6
    */

    const pdb: PropertyDatabase = {
        findRootNodes: function (): number[] {
            return [1];
        },
        findParent: function (dbId: number): number | null {
            return 2 <= dbId && dbId <= 4 ? dbId - 1 : null;
        },
        enumAttributes: function (callBack: (attrId: number, attrDef: AttributeDefinition) => void): void {
            callBack(1, { name: "name", category: "__name__", dataType: 20, displayName: null });
            callBack(2, { name: "element type property", category: "props", dataType: 20, displayName: null });
            callBack(3, { name: "element property", category: "props", dataType: 20, displayName: null });
        },
        enumObjects: function (_callBack: (dbId: number, fromId?: number | undefined, toId?: number | undefined) => void): void {
            throw new Error('Function not implemented.');
        },
        enumObjectProperties: function (dbId: number, callBack: (attrId: number, attrValueId: number) => void): void {
            if (dbId === 1) // root
                callBack(1, 1);

            if (dbId === 2) // Category
                callBack(1, 2);

            if (dbId === 3) { // SubCategory
                callBack(1, 3);
                callBack(2, 5);
            }

            if (dbId === 4) { // Element
                callBack(1, 4);
                callBack(3, 6);
            }
        },
        getNodeNameAndChildren: function (_query: { dbId: number; }): { dbId: number; parent: number; }[] {
            throw new Error('Function not implemented.');
        },
        getObjectProperties: function (_dbId: number): ObjectProperties {
            throw new Error('Function not implemented.');
        },
        getAttrValue: function (attrId: number, attrValueId: number): string | number {
            if (attrId === 1) { // name
                switch (attrValueId) {
                    case 1:
                        return "root";
                    case 2:
                        return "Category";
                    case 3:
                        return "SubCategory"
                    case 4:
                        return "Element";

                    default:
                        throw new Error("Values is not supported");
                }
            }
            if (attrId === 2 && attrValueId === 5)
                return 1.3;

            if (attrId === 3 && attrValueId === 6)
                return 5.7;

            throw new Error('Values is not supported');
        },
        _getObjectProperty: function (_attrId: number, _attrValueId: number): PropertyValue {
            throw new Error('Function not implemented.');
        }
    }

    const attributesCollection = new PropertyDatabaseAttributesCollection(pdb, true);

    it("must get element categories", () => {
        const element = new PropertyModelFilterableElement(4, pdb, attributesCollection);

        expect(element.categoriesList).to.eql(["Category", "SubCategory", "Element"]);

        const type = new PropertyModelFilterableElement(3, pdb, attributesCollection);

        expect(type.categoriesList).to.eql(["Category", "SubCategory"]);

        const cat = new PropertyModelFilterableElement(2, pdb, attributesCollection);

        expect(cat.categoriesList).to.eql(["Category"]);

        const root = new PropertyModelFilterableElement(1, pdb, attributesCollection);

        expect(root.categoriesList).to.eql([]);
    });
});