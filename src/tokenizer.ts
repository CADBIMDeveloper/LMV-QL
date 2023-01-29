import { Token } from "./token";
import { TokenizationFailureException } from "./tokenizerExceptions";

export const tokenize = (filter: string): Token[] => {
    const tokens: Token[] = [];

    let position = 0;

    let currentToken: Token | null = null;

    while (position < filter.length) {
        const currentSymbol = filter[position];

        if (currentToken?.type === "category-or-property") {
            currentToken.raw += currentSymbol;
            if (currentSymbol === "[")
                throw new TokenizationFailureException(filter, "Invalid character", position);

            if (currentSymbol !== "]")
                currentToken.formatted += currentSymbol;
            else
                currentToken = null;
        } else if (currentToken?.type === "string") {
            currentToken.raw += currentSymbol;

            if (currentSymbol !== '"')
                currentToken.formatted += currentSymbol;
            else
                currentToken = null;
        } else if (currentToken?.type === "number") {
            if (currentSymbol === " ")
                currentToken = null
            else if (48 <= currentSymbol.charCodeAt(0) && currentSymbol.charCodeAt(0) <= 57) {
                currentToken.raw += currentSymbol;
                currentToken.formatted += currentSymbol;
            } else
                throw new TokenizationFailureException(filter, "Invalid character", position);
        } else if (currentSymbol !== " ") {
            if (currentSymbol === "(")
                tokens.push({ type: "(", raw: "(", startPosition: position });
            else if (currentSymbol === ")")
                tokens.push({ type: "(", raw: "(", startPosition: position });
            else if (currentSymbol === ".")
                tokens.push({ type: ".", raw: ".", startPosition: position });
            else if (currentSymbol === "*")
                tokens.push({ type: "allow-any", raw: "*", startPosition: position });
            else if (currentSymbol === "[") {
                currentToken = { type: "category-or-property", raw: "[", formatted: "", startPosition: position };

                tokens.push(currentToken);
            }
            else if (currentSymbol === '"') {
                currentToken = { type: "string", raw: '"', formatted: "", startPosition: position };

                tokens.push(currentToken);
            }
            else if (48 <= currentSymbol.charCodeAt(0) && currentSymbol.charCodeAt(0) <= 57) {
                currentToken = { type: "number", raw: currentSymbol, formatted: currentSymbol, startPosition: position };

                tokens.push(currentToken);
            }
            else if (filter.indexOf("OR", position) === position) {
                tokens.push({ type: "or", raw: "OR", startPosition: position });

                position += 2;
                continue;
            } else if (filter.indexOf("AND", position) === position) {
                tokens.push({ type: "and", raw: "AND", startPosition: position });

                position += 3;
                continue;
            } else if (filter.indexOf("!=", position) === position) {
                tokens.push({ type: "!=", raw: "!=", startPosition: position });

                position += 2;
                continue;
            } else if (filter.indexOf(">=", position) === position) {
                tokens.push({ type: ">=", raw: ">=", startPosition: position });

                position += 2;
                continue;
            } else if (filter.indexOf("<=", position) === position) {
                tokens.push({ type: "<=", raw: "<=", startPosition: position });

                position += 2;
                continue;
            } else if (currentSymbol === "=")
                tokens.push({ type: "=", raw: "=", startPosition: position });
            else if (currentSymbol === ">")
                tokens.push({ type: ">", raw: ">", startPosition: position });
            else if (currentSymbol === "<")
                tokens.push({ type: "<", raw: "<", startPosition: position });
            else if (currentSymbol === "!")
                tokens.push({ type: "use-exact", raw: "!", startPosition: position });
            else
                throw new TokenizationFailureException(filter, "Invalid character", position);
        }

        ++position;
    }

    if (tokens.length === 0)
        throw new TokenizationFailureException(filter, "Filter string is empty", filter.length);

    const lastToken = tokens[tokens.length - 1];

    if (lastToken.type === "category-or-property" && lastToken.raw[lastToken.raw.length - 1] !== "]")
        throw new TokenizationFailureException(filter, "Missing enclosing \"]\"", lastToken.startPosition + lastToken.raw.length);

    if (lastToken.type === "string" && lastToken.raw[lastToken.raw.length - 1] !== '"')
        throw new TokenizationFailureException(filter, "Missing enclosing quote", lastToken.startPosition + lastToken.raw.length);

    return tokens;
}
