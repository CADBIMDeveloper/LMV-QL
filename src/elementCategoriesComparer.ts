import { expandTemplateCategories } from "./expandedWildcategoriesFactory";

export const compareCategories = (elementCategories: string[], templateCategories: string[]): boolean => {
    if (templateCategories.length > elementCategories.length)
        return false;

    const expandedTemplates = expandTemplateCategories(templateCategories, elementCategories.length);

    for (const template of expandedTemplates)
        if (validate(elementCategories, template))
            return true;

    return false;
}

const validate = (elementCategories: string[], templateCategories: string[]) => {
    for (let i = 0; i < templateCategories.length; i++) {
        if (templateCategories[i] !== "*" && elementCategories[i] !== templateCategories[i])
            return false;
    }

    return true;
}