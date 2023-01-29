export type OperationToken = "." | "=" | "<" | ">" | "<=" | ">=" | "!=" | "or" | "and";
export type ModelToken = "category-or-property" | "allow-any" | "use-exact";
export type GroupToken = "(" | ")";
export type ValueToken = "string" | "number";
export type FormattedTokenType = "category-or-property" | ValueToken
export type TokenType = OperationToken | ModelToken | ValueToken;

export type BasicToken = {
    type: Omit<TokenType, FormattedTokenType>;
    raw: string;
    startPosition: number;
}

export type FormattedToken = {
    type: FormattedTokenType;
    raw: string;
    formatted: string;
    startPosition: number;
}

export type Token = BasicToken | FormattedToken;