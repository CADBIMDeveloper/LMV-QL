type Template = string[];

export const expandTemplateCategories = (templateCategories: Template, targetLength: number): Template[] => {
    if (templateCategories.length > targetLength)
        throw new Error("Template categories count should not exceed target categories array");

    const templates: Template[] = [];

    expand(templates, [], templateCategories, 0, targetLength);

    return templates.sort(compareTemplates);
}

export const expandTemplateCategoriesForValue = (templateCategories: Template, targetLength: number) => {
    let templates: Template[] = [];

    for (let i = templateCategories.length; i <= targetLength; i++)
        templates = templates.concat(expandTemplateCategories(templateCategories, i));

    return templates;
}

const expand = (templates: Template[], currentTemplate: Template, templateCategories: Template, currentIndex: number, targetLength: number) => {
    if (currentTemplate.length === targetLength) {
        if (currentIndex === templateCategories.length)
            templates.push(currentTemplate);

        return;
    }

    if (currentIndex < templateCategories.length && templateCategories[currentIndex] !== "*") {
        currentTemplate.push(templateCategories[currentIndex]);

        expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);

        return;
    }

    if (currentIndex >= templateCategories.length) {
        currentTemplate.push("*");

        expand(templates, currentTemplate, templateCategories, currentIndex, targetLength);

        return;
    }

    if (templateCategories[currentIndex] === "*") {
        const maxInsertsCount = targetLength - currentTemplate.length;

        for (let i = 2; i < maxInsertsCount; ++i) {
            const template = [...currentTemplate];

            for (let j = 0; j < i; ++j)
                template.push("*");

            expand(templates, template, templateCategories, currentIndex + 1, targetLength);
        }

        currentTemplate.push("*");

        expand(templates, currentTemplate, templateCategories, currentIndex + 1, targetLength);
    }
}

const compareTemplates = (a: Template, b: Template) => computeTemplateScore(a) - computeTemplateScore(b);

const computeTemplateScore = (template: Template): number => template.map((x, i) => x === "*" ? i : 0).reduce((acc, elem) => acc + elem, 0);