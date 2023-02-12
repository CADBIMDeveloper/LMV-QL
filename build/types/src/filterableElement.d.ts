export interface IFilterableElement {
    get categoriesList(): string[];
    getPropertyValue(propertyName: string, categories: string[]): string | number | undefined;
}
