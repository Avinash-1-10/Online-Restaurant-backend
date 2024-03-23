// ApiResponse class represents a standardized response format for API endpoints.

export class ApiResponse {
  /**
   * Constructor to create a new ApiResponse object.
   * @param {number} status - The HTTP status code of the response.
   * @param {any} data - The data to be included in the response body.
   * @param {string} message - A message describing the result of the operation.
   */
  constructor(status, data, message) {
    this.status = status; // HTTP status code
    this.data = data; // Response data
    this.message = message; // Message describing the result
  }
}
