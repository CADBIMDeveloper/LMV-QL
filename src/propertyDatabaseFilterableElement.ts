import { IFilterableElement } from "./filterableElement";
import { PropertyDatabase } from "./propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";

export class PropertyModelFilterableElement implements IFilterableElement {
    private readonly categoryNodesDbIds: number[];

    constructor(public readonly dbId: number, private readonly propertyDatabase: PropertyDatabase, private readonly attributes: PropertyDatabaseAttributesCollection) {
        this.categoryNodesDbIds = getCategories(dbId, propertyDatabase);
    }

    get categoriesList(): string[] {
        return this.categoryNodesDbIds.map(x => this.getNodePropertyValue(x, this.attributes.nameAttributeId) as string);
    }

    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined {
        throw new Error("Method not implemented.");
    }

    private getNodePropertyValue(dbId: number, attributeId: number): string | number | undefined {
        let value: string | number | undefined = undefined;

        this.propertyDatabase.enumObjectProperties(dbId, (attrId, attrValueId) => {
            if (attrId === attributeId)
                value = this.propertyDatabase.getAttrValue(attrId, attrValueId);
        });

        return value;
    }
}

const getCategories = (dbId: number, propertyDatabase: PropertyDatabase) => {
    const categories: number[] = [];

    let currentNodeDbId = propertyDatabase.findParent(dbId);

    while (currentNodeDbId !== null) {
        const parentDbId = propertyDatabase.findParent(currentNodeDbId);

        if (parentDbId !== null)
            categories.push(currentNodeDbId);

        currentNodeDbId = parentDbId;
    }

    return categories.reverse();
}