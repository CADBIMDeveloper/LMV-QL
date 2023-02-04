import grammar from "../src/filtergrammar.ohm-bundle";
import { compile, Filter, getPropertyDefinition, PropertyDefinition } from "./filterOperations";
import { ParsingError } from "./parsingError";

export class FilterFactory {
    private readonly semantics = grammar.createSemantics();

    constructor() {
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<Filter>("compile", compile);
    }

    createFilter(filterString: string): Filter {
        const match = grammar.match(filterString);

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return node.compile();
    }
}