export class TokenizationFailureException extends Error {
    constructor(public readonly filter: string, public readonly message: string, public readonly position: number) {
        const trimLength = 15;

        const trimmedOnStart = position + 1 - trimLength > 0;

        const errorMessage = `${(trimmedOnStart ? "..." : "") + filter.substring(position, position + trimLength)}${position + trimLength < filter.length ? "..." : ""}`;

        const offset = (trimmedOnStart ? 3 : 0) + Math.min(trimLength, position);

        let offsetString = "";

        for (let i = 0; i < offset; ++i) offsetString += " ";

        const targetMessage = `${errorMessage}\n${offsetString}^ ${message}`;

        super(targetMessage);
    }
}