import grammar from "../src/filtergrammar.ohm-bundle";
import { compile, ElementFilter, Filter, getPropertyDefinition, PropertyDefinition } from "./filterOperations";
import { FilterSettings } from "./filterSettings";
import { ParsingError } from "../parsingError";

export class FilterFactory {
    private readonly semantics = grammar.createSemantics();
    private readonly settings: FilterSettings;

    constructor(settings?: FilterSettings) {
        this.settings = settings || { tolerance: 1e-5, stringCaseSensitive: true, displayUnits: "", displayUnitsPrecision: "" };
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<Filter>("compile", compile);
    }

    createFilter(filterString: string): ElementFilter {
        const match = grammar.match(filterString);

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return node.compile().bind(null, this.settings);
    }
}