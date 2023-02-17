import { PropertyDatabase } from "../propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";

export const findRootNodes = (pdb: PropertyDatabase, attributesCollection: PropertyDatabaseAttributesCollection): number[] => {
    const rootNodes: number[] = [];

    const modelRoots = pdb.findRootNodes();

    for (const dbId of modelRoots) {
        const modelRootNodeName = getNodeName(dbId, pdb, attributesCollection);

        const children = pdb.getNodeNameAndChildren({ dbId })!;

        if (children.length === 1 && modelRootNodeName === getNodeName(children[0].dbId, pdb, attributesCollection))
            rootNodes.push(children[0].dbId);
        else
            rootNodes.push(dbId);
    }

    return rootNodes;
}

const getNodeName = (dbId: number, pdb: PropertyDatabase, attributesCollection: PropertyDatabaseAttributesCollection) => {
    let name = "";

    pdb.enumObjectProperties(dbId, (attrId, attrValueId) => {
        if (attrId === attributesCollection.nameAttributeId) {
            name = pdb.getAttrValue(attrId, attrValueId) as string;

            return true;
        }
    });

    return name;
}