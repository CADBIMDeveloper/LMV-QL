import { PropertyDatabase } from "../propertyDatabase";
import { PropertyValue } from "./queryableElement";
import { PropertyDatabaseAttributesCollection } from "./propertyDatabaseAttributesCollection";

export class PropertyValuesQueryFactory {
    private readonly propertiesValuesCache = new Map<number, Map<number, PropertyValue>>();

    constructor(private readonly propertyDatabase: PropertyDatabase,
        readonly attributes: PropertyDatabaseAttributesCollection,
        private readonly rootNodes: number[]) {

    }

    getNodePropertyValue(dbId: number, attributeId: number): PropertyValue {
        const cachedValue = this.findCachedPropertyValue(dbId, attributeId);

        if (cachedValue)
            return cachedValue;

        const attribute = this.attributes.findAttribute(attributeId)!;

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
                value = this.getNodePropertyValue(value, this.attributes.nameAttributeId).value;

                const nodePropertyValue = { value, attribute };

                this.storeInCache(dbId, attributeId, nodePropertyValue);

                return nodePropertyValue;
            } else {
                const nodePropertyValue = { value: undefined, attribute };

                this.storeInCache(dbId, attributeId, nodePropertyValue);

                return nodePropertyValue;
            }
        }

        if (value === undefined && typeof instanceDbId === "number")
            value = this.getNodePropertyValue(instanceDbId, attributeId).value;

        if (attributeId === this.attributes.nameAttributeId)
            value = getName(value);

        const nodePropertyValue = { value, attribute };

        this.storeInCache(dbId, attributeId, nodePropertyValue);

        return nodePropertyValue;
    }

    getCategories(dbId: number) {
        const categories: number[] = [];

        let currentNodeDbId: number | null = dbId;

        while (currentNodeDbId !== null && this.rootNodes.findIndex(x => x === currentNodeDbId) < 0) {
            const parentDbId = this.propertyDatabase.findParent(currentNodeDbId);

            if (parentDbId !== null)
                categories.push(currentNodeDbId);

            currentNodeDbId = parentDbId;
        }

        return categories.reverse();
    }

    private findCachedPropertyValue(dbId: number, attributeId: number): PropertyValue | undefined {
        const nodeCache = this.propertiesValuesCache.get(dbId);

        if (!nodeCache)
            return undefined;

        return nodeCache.get(attributeId);
    }

    private storeInCache(dbId: number, attributeId: number, value: PropertyValue) {
        const nodeCache = this.propertiesValuesCache.get(dbId) || new Map<number, PropertyValue>();

        nodeCache.set(attributeId, value);

        this.propertiesValuesCache.set(dbId, nodeCache);
    }
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