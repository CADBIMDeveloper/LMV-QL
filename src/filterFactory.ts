import grammar from "../src/filtergrammar.ohm-bundle";
import { IFilterableElement } from "./filterableElement";
import { ParsingError } from "./parsingError";

type Filter = (element: IFilterableElement) => boolean;

export class FilterFactory {
    private readonly semantics = grammar.createSemantics();

    constructor() {
        this.semantics.addOperation<Filter>("compile", {

        });
    }
    
    createFilter(filterString: string): Filter {
        const match = grammar.match(filterString);

        if (match.failed())
            throw new ParsingError(match.message!, match.shortMessage!);

        const node = this.semantics(match);

        return node.compile();
    }
}