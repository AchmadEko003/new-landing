export interface IResponse<T> {
  /**
   * Metadata about the response.
   */
  meta: {
    /** HTTP status code of the response. */
    status: boolean;
    /** Message detailing the response status. */
    message: string;
    /** Total number of items available (for paginated responses). */
    totalItem: number;
  };

  /**
   * The response payload, which can be a single object or an array of objects.
   */
  data: T | undefined;
}

export interface IResponseList<T> {
  /**
   * Metadata about the response.
   */
  meta: {
    /** HTTP status code of the response. */
    status: boolean;
    /** Message detailing the response status. */
    message: string;
    /** Total number of items available (for paginated responses). */
    totalItem: number;
  };

  /**
   * The response payload, which can be a single object or an array of objects.
   */
  data: T[] | undefined;
}
