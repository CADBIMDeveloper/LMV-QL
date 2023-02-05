export const compareCategories = (elementCategories: string[], templateCategories: string[]): boolean => {
    if (templateCategories.length > elementCategories.length)
        return false;

    for (let i = 0; i < templateCategories.length; i++) {
        if (elementCategories[i] !== templateCategories[i])
            return false;

    }
    return true;
}