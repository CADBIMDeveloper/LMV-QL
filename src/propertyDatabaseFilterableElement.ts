import { IFilterableElement } from "./filterableElement";
import { PropertyDatabase } from "../propertyDatabase";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";

export class PropertyDatabaseFilterableElement implements IFilterableElement {
    private readonly categoryNodesDbIds: number[];
    private readonly valuesCache = new Map<string, string | number | undefined>();

    constructor(public readonly dbId: number, private readonly propertyDatabase: PropertyDatabase, 
        private readonly attributes: PropertyDatabaseAttributesCollection, rootNodes: number[]) {
        this.categoryNodesDbIds = getCategories(dbId, propertyDatabase, rootNodes);
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
        if (this.hasCachedValue(dbId, attributeId))
            return this.getCachedValue(dbId, attributeId);

        let value: string | number | undefined = undefined;

        let instanceDbId: number | string | undefined = undefined;

        this.propertyDatabase.enumObjectProperties(dbId, (attrId, attrValueId) => {
            if (attrId === attributeId) {
                value = this.propertyDatabase.getAttrValue(attrId, attrValueId);

                return true;
            }

            if (value === undefined && attrId === this.attributes.instanceOfAttributeId)
                instanceDbId = this.propertyDatabase.getAttrValue(attrId, attrValueId);
        });

        if (attributeId !== this.attributes.nameAttributeId && this.attributes.isInternalRefAttribute(attributeId)) {
            if (typeof value === "number") {
                value = this.getNodePropertyValue(value, this.attributes.nameAttributeId);

                this.cacheValue(dbId, attributeId, value);

                return value;
            }
            else {
                this.cacheValue(dbId, attributeId, undefined);

                return undefined;
            }
        }

        if (value === undefined && typeof instanceDbId === "number")
            value = this.getNodePropertyValue(instanceDbId, attributeId);

        if (attributeId === this.attributes.nameAttributeId)
            value = getName(value);

        this.cacheValue(dbId, attributeId, value);

        return value;
    }

    private hasCachedValue(dbId: number, attributeId: number): boolean {
        return this.valuesCache.has(this.getCacheKey(dbId, attributeId));
    }

    private getCachedValue(dbId: number, attributeId: number) {
        return this.valuesCache.get(this.getCacheKey(dbId, attributeId));
    }

    private cacheValue(dbId: number, attributeId: number, value: string | number | undefined) {
        this.valuesCache.set(this.getCacheKey(dbId, attributeId), value);
    }

    private getCacheKey(dbId: number, attributeId: number): string {
        return `${dbId}#${attributeId}`;
    }
}

const getCategories = (dbId: number, propertyDatabase: PropertyDatabase, rootNodes: number[]) => {
    const categories: number[] = [];

    let currentNodeDbId: number | null = dbId;

    while (currentNodeDbId !== null && rootNodes.findIndex(x => x === currentNodeDbId) < 0) {
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