import { IFilterableElement } from "./filterableElement";
import { FilterActionDict } from "./filtergrammar.ohm-bundle";

export type Filter = (element: IFilterableElement) => boolean;

export const compile: FilterActionDict<Filter> = {

}