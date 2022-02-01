/**
 * Query parameters for a paginated HTTP request
 */
export interface PagerQuery {

  /** Max number of rows to return in the response (optional) */
  limit?: string;

  /** Number of rows to skip in the response (optional) */
  skip?: string;  
}

/**
 * Query parameters for an HTTP request that requires the applicationUsername
 */
export interface ApplicationUsernameQuery {

  /** The application username (optional) */
  applicationUsername?: string;
}

export interface CustomerQuery {
  /** The application username */
  applicationUsername: string;
}

export interface ReceiptQuery {
  /** The receipt identifier */
  receiptId: string;
}

/**
 * Query parameters for an HTTP request that accepts a date range
 */
export interface DateRangeQuery {
  
  /** Start date, in ISO 8601 */
  startdate?: string;

  /** End date, in ISO 8601 */
  enddate?: string;
}

export interface ProductPriceQuery {
  storeProductId: string;
  currency?: string;
}
