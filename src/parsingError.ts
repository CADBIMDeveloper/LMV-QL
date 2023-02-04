export class ParsingError extends Error {
    constructor(message: string, public readonly shortMessage: string) {
        super(message);
    }
}