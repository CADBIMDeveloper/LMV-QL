import { IQueryableElement, PropertyValue } from "../../src/queryableElement";

type Props = {
    [key: string]: number | string;
}

type Category = {
    name: string;
    props: Props;
}

export class ComplexFilterableElements implements IQueryableElement {
    private readonly categories: Category[];
    private readonly categoryNames: string[];

    constructor(...categories: Category[]) {
        this.categories = categories;
        this.categoryNames = categories.map(x => x.name);
    }
    get categoriesList(): string[] {
        return this.categoryNames;
    }

    getPropertyValue(propertyName: string, categories: string[]): PropertyValue {
        if (!this.compareCategories(categories))
            return { value: undefined };

        const values = this.categories[categories.length - 1];

        return { value: values.props[propertyName] };
    }

    getObjectProperties(): PropertyValue[] {
        const objectProperties: PropertyValue[] = [];

        const attributeNames = new Set<string>();

        for (let i = this.categories.length - 1; i >= 0; --i) {
            const values = this.categories[i].props;

            for (const propertyName in values) {
                if (Object.prototype.hasOwnProperty.call(values, propertyName) && !attributeNames.has(propertyName))
                    objectProperties.push({ value: values[propertyName] });

                attributeNames.add(propertyName);
            }
        }

        return objectProperties;
    }

    private compareCategories(categories: string[]) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] !== "*" && this.categoriesList[i] !== categories[i])
                return false;
        }

        return true;
    }
}