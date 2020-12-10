
class RepositoryError extends Error {
    constructor (message:string) {
        super(message);
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}

export default RepositoryError;