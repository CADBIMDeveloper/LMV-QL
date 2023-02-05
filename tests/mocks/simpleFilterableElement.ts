import { IFilterableElement } from "../../src/filterableElement";

type Props = {
    [key: string]: number | string;
}

export class SimpleFilterableElement implements IFilterableElement {
    constructor(private readonly values: Props, public readonly categoriesList: string[]) {

    }

    getPropertyValue(propertyName: string, _categories: string[]): string | number | undefined {
        return this.values[propertyName];
    }
}