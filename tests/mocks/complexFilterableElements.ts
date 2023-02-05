import { IFilterableElement } from "../../src/filterableElement";

type Props = {
    [key: string]: number | string;
}

type Category = {
    name: string;
    props: Props;
}

export class ComplexFilterableElements implements IFilterableElement {
    private readonly categories: Category[];
    private readonly categoryNames: string[];

    constructor(...categories: Category[]) {
        this.categories = categories;
        this.categoryNames = categories.map(x => x.name);
    }
    get categoriesList(): string[] {
        return this.categoryNames;
    }

    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined {
        if (!this.compareCategories(categories))
            return undefined;

        const values = this.categories[categories.length - 1];

        return values.props[propertyName];
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }
}