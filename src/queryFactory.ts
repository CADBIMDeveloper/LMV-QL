import grammar from "./grammar.ohm-bundle";
import { AggregatedValueQuery, compileAggregate, compileFilter, compileSelect, ElementQuery, Filter, getPropertyDefinition, PropertyDefinition, SelectValueQuery } from "./operations";
import { QuerySettings } from "./querySettings";
import { ParsingError } from "../parsingError";

export class QueryFactory {
    private readonly semantics = grammar.createSemantics();
    private readonly settings: QuerySettings;

    constructor(settings?: QuerySettings) {
        this.settings = settings || { tolerance: 1e-5, stringCaseSensitive: true, displayUnits: "", displayUnitsPrecision: "" };
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<Filter>("compileFilter", compileFilter);
        this.semantics.addOperation<SelectValueQuery[]>("compileSelect", compileSelect);
        this.semantics.addOperation<AggregatedValueQuery[]>("compileAggregate", compileAggregate);
    }

    createQuery(filterString: string): ElementQuery {
        const match = grammar.match(filterString);

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return {
            filter: node.compileFilter().bind(null, this.settings),
            selectProperties: node.compileSelect(),
            aggregateProperties: node.compileAggregate()
        };
    }
}