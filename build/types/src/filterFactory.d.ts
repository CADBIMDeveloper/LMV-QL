import { ElementFilter } from "./filterOperations";
import { FilterSettings } from "./filterSettings";
export declare class FilterFactory {
    private readonly semantics;
    private readonly settings;
    constructor(settings?: FilterSettings);
    createFilter(filterString: string): ElementFilter;
}
