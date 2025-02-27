/**
 * Represents an HTTP error with a status code, description, and optional details.
 */
export default class HttpError {
    public description: string;

    public details: string | undefined;

    public status: number;

    constructor(statusText: string, error: string, status: number) {
        this.description = statusText;
        this.details = error ?? undefined;
        this.status = status;
    }
}
