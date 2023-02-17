import { PropertyDatabase, AttributeDefinition } from "../../propertyDatabase";

export const pdb: PropertyDatabase = {
    findParent: function (dbId: number): number | null {
        return 2 <= dbId && dbId <= 4 ? dbId - 1 : null;
    },
    enumAttributes: function (callBack: (attrId: number, attrDef: AttributeDefinition) => void): void {
        callBack(1, { name: "name", category: "__name__", dataType: 20, displayName: null });
        callBack(2, { name: "element type property", category: "props", dataType: 20, displayName: null });
        callBack(3, { name: "element property", category: "props", dataType: 20, displayName: null });
        callBack(4, { name: "instanceof_objid", category: "__instanceof__", dataType: 11, displayName: null });
        callBack(5, { name: "instance property", category: "props", dataType: 20, displayName: null });
        callBack(6, { name: "Level", category: "__internalref__", dataType: 11, displayName: null })
    },
    enumObjectProperties: function (dbId: number, callBack: (attrId: number, attrValueId: number) => void): void {
        if (dbId === 1) // root
            callBack(1, 1); // name

        if (dbId === 2) // Category
            callBack(1, 2); // name

        if (dbId === 3) { // SubCategory
            callBack(1, 3); // name
            callBack(2, 5); // element type property
            callBack(4, 7); // instanceof_objid
        }

        if (dbId === 4) { // Element
            callBack(1, 4); // name
            callBack(3, 6); // element property
            callBack(4, 7); // instanceof_objid
            callBack(6, 9); // Level
        }

        if (dbId === 5) { // Instance (common for element and subcategory)
            callBack(5, 8); // instance property
        }

        if (dbId === 6) {
            callBack(1, 10); // level name
        }
    },
    getAttrValue: function (attrId: number, attrValueId: number): string | number {
        if (attrId === 1) { // name
            switch (attrValueId) {
                case 1:
                    return "root";
                case 2:
                    return "Category";
                case 3:
                    return "SubCategory [13]";
                case 4:
                    return "Element [57]";

                case 10:
                    return "Level 1";

                default:
                    throw new Error("Values is not supported");
            }
        }
        if (attrId === 2 && attrValueId === 5)
            return 1.3; // type property value

        if (attrId === 3 && attrValueId === 6)
            return 5.7; // element property value

        if (attrId === 4 && attrValueId === 7)
            return 5; // instanceof_objid element id

        if (attrId === 5 && attrValueId === 8)
            return "instance property value"

        if (attrId === 6 && attrValueId === 9)
            return 6; // level element id

        throw new Error('Values is not supported');
    },
    enumObjects: function (callBack: (dbId: number) => void): void {
        for (let i = 1; i <= 4; ++i)
            callBack(i);
    },
    getNodeNameAndChildren: function (query: { dbId: number; }): { dbId: number; parent: number; }[] | undefined {
        if (1 <= query.dbId && query.dbId <= 3) {
            return [{
                dbId: query.dbId + 1,
                parent: query.dbId
            }]
        }
        return undefined;
    }
}