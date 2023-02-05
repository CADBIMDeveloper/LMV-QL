import { IFilterableElement } from "../../src/filterableElement";

type Props = {
    [key: string]: number | string;
}

export class SimpleFilterableElement implements IFilterableElement {
    constructor(private readonly values: Props, public readonly categoriesList: string[]) {

    }

    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined {
        if (!this.compareCategories(categories))
            return undefined;

        return this.values[propertyName];
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }
}