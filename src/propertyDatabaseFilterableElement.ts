import { IFilterableElement, PropertyValue } from "./filterableElement";
import { PropertyValuesQueryFactory } from "./propertyValuesQueryFactory";

export class PropertyDatabaseFilterableElement implements IFilterableElement {
    private readonly categoryNodesDbIds: number[];

    constructor(dbId: number, private readonly propertyValuesQueryFactory: PropertyValuesQueryFactory) {
        this.categoryNodesDbIds = propertyValuesQueryFactory.getCategories(dbId);
        this.categoriesList = this.categoryNodesDbIds.map(x => this.getNodePropertyValue(x, this.propertyValuesQueryFactory.attributes.nameAttributeId).value as string);
    }

    categoriesList: string[];

    getPropertyValue(propertyName: string, categories: string[]): PropertyValue {
        if (!this.compareCategories(categories))
            return { value: undefined, attribute: undefined };

        const dbId = this.categoryNodesDbIds[categories.length - 1];

        const value = this.propertyValuesQueryFactory.attributes.findAttributesIdsByName(propertyName)
            .map(x => this.getNodePropertyValue(dbId, x))
            .find(x => x.value !== undefined);

        return { value: value?.value, attribute: value?.attribute }
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }

    private getNodePropertyValue(dbId: number, attributeId: number): PropertyValue {
        return this.propertyValuesQueryFactory.getNodePropertyValue(dbId, attributeId);
    }
}