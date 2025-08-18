export class UnauthorizedEroor extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "Uniauthorized";
  }
}
