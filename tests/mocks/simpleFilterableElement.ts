import { IQueryableElement, PropertyValue } from "../../src/queryableElement";

type Props = {
    [key: string]: number | string;
}

export class SimpleFilterableElement implements IQueryableElement {
    constructor(private readonly values: Props, public readonly categoriesList: string[]) {

    }

    getPropertyValue(propertyName: string, categories: string[]): PropertyValue {
        if (!this.compareCategories(categories))
            return { value: undefined, attribute: undefined };

        return { value: this.values[propertyName], attribute: undefined };
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }
}