# Iaptic-Client

# Client library to access iaptic

## Retrieve customer purchases

Parameters:

  - `applicationUsername` (`string`, required) — application username ;

Will retrieve the customer purchases from the billing api.

### client code: getCustomerPurchases

A Subscription Status object:

``` js
  const client = new PurchasesClient({
    protocol: 'http',
    hostname: 'some-url-billing.com',
    port: 80,
    pathnamePrefix: '/v2/customers',
    clientId: 'test',
    secret: 'api_secret'
  });
  
  client.getCustomerPurchases('1318941389914023yrewru2r3r', (err, data) => {
    //access data here and check for errors.
  });
```


## Retrieve bulk information about your customers.

Parameters:

  - `applicationUsername` (`string[]`, optional) — Comma separated list of URL-encoded application usernames.
Example: my%20user,alice,bob.
skip and limit are disregarded when this query parameter is specified.
  - `skip` (`number`, optional) - Number of rows to skip in the output.
  - `limit` (`number`, optional) - Maximal number of rows to return.

its either limit & skip are defined, or the applicationUsername.

Will retrieve basic information about the customers from the billing api.

### client code: getCustomersBulkInfo

A Subscription Status object:

``` js
  const client = new PurchasesClient({
    protocol: 'http',
    hostname: 'some-url-billing.com',
    port: 80,
    pathnamePrefix: '/v2/customers',
    clientId: 'test',
    secret: 'api_secret'
  });
  
  client.getCustomersBulkInfo({limit: 10, skip: 0}, (err, data) => {
    //access data here and check for errors.
  });
```

MIT License.
