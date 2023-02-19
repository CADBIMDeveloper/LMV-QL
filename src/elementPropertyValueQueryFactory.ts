import grammar from "../src/filtergrammar.ohm-bundle";
import { PropertyValueQuery, getPropertyDefinition, getPropertyValue, PropertyDefinition, ElementPropertyValueQuery } from "./filterOperations";
import { ParsingError } from "../parsingError";
import { ComputeExpressionSettings } from "./computeExpressionSettings";

export class ElementPropertyValueQueryFactory {
    private readonly semantics = grammar.createSemantics();
    private readonly settings: ComputeExpressionSettings;

    constructor(settings?: ComputeExpressionSettings) {
        this.settings = settings || { attributesCaseSensitive: true, displayUnits: "", displayUnitsPrecision: "" }
        this.semantics.addOperation<PropertyDefinition>("getPropertyDefinition", getPropertyDefinition);
        this.semantics.addOperation<PropertyValueQuery>("getPropertyValue", getPropertyValue);
    }

    createPropertyQuery(propertyQuery: string): ElementPropertyValueQuery {
        const match = grammar.match(propertyQuery, "propertySequence");

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return node.getPropertyValue().bind(null, this.settings);
    }
}