export interface ServiceError extends Error {
  response: ServiceErrorResponse
}

export interface ServiceErrorResponse {
  statusCode: number,
  message:  string[],
  error: string,
}