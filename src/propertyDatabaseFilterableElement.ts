import { IFilterableElement } from "./filterableElement";
import { PropertyDatabase } from "../propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";

export class PropertyDatabaseFilterableElement implements IFilterableElement {
    private readonly categoryNodesDbIds: number[];

    constructor(public readonly dbId: number, private readonly propertyDatabase: PropertyDatabase, private readonly attributes: PropertyDatabaseAttributesCollection) {
        this.categoryNodesDbIds = getCategories(dbId, propertyDatabase);
        this.categoriesList = this.categoryNodesDbIds.map(x => this.getNodePropertyValue(x, this.attributes.nameAttributeId) as string);
    }

    categoriesList: string[];

    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined {
        if (!this.compareCategories(categories))
            return undefined;

        const dbId = this.categoryNodesDbIds[categories.length - 1];

        return this.attributes.findAttributesIdsByName(propertyName)
            .map(x => this.getNodePropertyValue(dbId, x))
            .find(x => x !== undefined);
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }

    private getNodePropertyValue(dbId: number, attributeId: number): string | number | undefined {
        let value: string | number | undefined = undefined;

        let instanceDbId: number | string | undefined = undefined;

        this.propertyDatabase.enumObjectProperties(dbId, (attrId, attrValueId) => {
            if (attrId === attributeId)
                value = this.propertyDatabase.getAttrValue(attrId, attrValueId);

            if (value === undefined && attrId === this.attributes.instanceOfAttributeId)
                instanceDbId = this.propertyDatabase.getAttrValue(attrId, attrValueId);
        });

        if (attributeId !== this.attributes.nameAttributeId && this.attributes.isInternalRefAttribute(attributeId)) {
            if (typeof value === "number")
                return this.getNodePropertyValue(value, this.attributes.nameAttributeId);
            else
                return undefined;
        }

        if (value === undefined && typeof instanceDbId === "number")
            value = this.getNodePropertyValue(instanceDbId, attributeId);

        if (attributeId === this.attributes.nameAttributeId)
            return getName(value);

        return value;
    }
}

const getCategories = (dbId: number, propertyDatabase: PropertyDatabase) => {
    const categories: number[] = [];

    let currentNodeDbId: number | null = dbId;

    while (currentNodeDbId !== null) {
        const parentDbId = propertyDatabase.findParent(currentNodeDbId);

        if (parentDbId !== null)
            categories.push(currentNodeDbId);

        currentNodeDbId = parentDbId;
    }

    return categories.reverse();
}

const nameWithIdExpression = /^(?<name>.*) \[\d+\]$/

const getName = (value: number | string | undefined) => {
    if (typeof value !== "string")
        return value;

    const match = value.match(nameWithIdExpression);

    if (match === null)
        return value;

    return match.groups!["name"];
}