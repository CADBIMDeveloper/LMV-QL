export const compareCategories = (elementCategories: string[], templateCategories: string[]): boolean => {
    for (let i = 0; i < templateCategories.length; i++) {
        if (elementCategories[i] !== templateCategories[i])
            return false;
        
    }
    return true;
}