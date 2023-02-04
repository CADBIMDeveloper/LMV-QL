export interface IFilterableElement {
    get categoriesList(): string[];
    
    getPropertyValue(propertyName: string): string | number | undefined;
}