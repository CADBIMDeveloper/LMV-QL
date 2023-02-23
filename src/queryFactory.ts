import grammar from "./filtergrammar.ohm-bundle";
import { compileFilter, compileSelect, ElementQuery, Filter, getPropertyDefinition, getPropertyValue, PropertyDefinition, PropertyValueQuery, SelectValueQuery } from "./filterOperations";
import { FilterSettings } from "./filterSettings";
import { ParsingError } from "../parsingError";

export class QueryFactory {
    private readonly semantics = grammar.createSemantics();
    private readonly settings: FilterSettings;

    constructor(settings?: FilterSettings) {
        this.settings = settings || { tolerance: 1e-5, stringCaseSensitive: true, displayUnits: "", displayUnitsPrecision: "" };
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<Filter>("compileFilter", compileFilter);
        this.semantics.addOperation<SelectValueQuery[]>("compileSelect", compileSelect)
    }

    createQuery(filterString: string): ElementQuery {
        const match = grammar.match(filterString);

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return {
            filter: node.compileFilter().bind(null, this.settings),
            selectProperties: node.compileSelect()
        };
    }
}