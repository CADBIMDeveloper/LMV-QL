import grammar from "../src/filtergrammar.ohm-bundle";
import { ElementPropertyValueQuery, getPropertyDefinition, getPropertyValue, PropertyDefinition } from "./filterOperations";
import { ParsingError } from "./parsingError";

export class ElementPropertyValueQueryFactory {
    private readonly semantics = grammar.createSemantics();

    constructor() {
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<ElementPropertyValueQuery>("getPropertyValue", getPropertyValue);
    }

    createPropertyQuery(propertyQuery: string): ElementPropertyValueQuery {
        const match = grammar.match(propertyQuery, "propertySequence");

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return node.getPropertyValue();
    }
}