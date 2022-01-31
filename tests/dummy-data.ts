export const applicationUsername = '1E6676C70C123AA18222EF001120CAE1';
export const getCustomerPurchasesResultData = {
  applicationUsername: applicationUsername,
  purchases: {
    "apple:monthly_subcscription": {
      productId: "apple:monthly_subcscription",
      platform: "apple",
      sandbox: true,
      purchaseId: "apple:1000000532000112",
      purchaseDate: "2019-07-29T17:14:00.000Z",
      expirationDate: "2019-07-29T17:19:00.000Z",
      cancelationReason: "Customer",
      renewalIntent: "Lapse"
    },
    "google:monthly_subcscription": {
      productId: "google:monthly_subcscription",
      purchaseId: "google:GPA.0000-3444-1111-54570",
      sandbox: true,
      platform: "google",
      purchaseDate: "2019-06-21T16:00:00.000Z",
      expirationDate: "2019-06-21T16:08:00.000Z",
      cancelationReason: "Customer.Cost",
      renewalIntent: "Lapse",
      renewalIntentChangeDate: "2019-06-21T16:05:00.000Z",
      isExpired: true
    }
  }
};

export const getCustomersBulkInfoResultData = {
  paging: {
    skip: 0,
    limit: 4,
    total: 129
  },
  rows: [
    {
      applicationUsername: "alice",
      customerInfo: {
        lastPurchaseDate: "2020-07-30T05:55:52.579Z",
        expirationDate: "2020-08-06T07:54:53.393Z",
        renewalIntent: "Renew",
        activeSubscriber: true
      },
      receiptIds: [
        "google:1"
      ]
    },
    {
      applicationUsername: "bob",
      customerInfo: {
        lastPurchaseDate: "2020-07-30T05:52:02.638Z",
        expirationDate: "2020-08-06T07:51:43.983Z",
        renewalIntent: "Lapse",
        activeSubscriber: true
      },
      receiptIds: [
        "google:2"
      ]
    },
    {
      applicationUsername: "charles",
      customerInfo: {
        lastPurchaseDate: "2020-07-30T05:51:50.000Z",
        lastRenewalDate: "2020-07-30T05:51:49.000Z",
        expirationDate: "2020-08-06T05:51:49.000Z",
        renewalIntent: "Renew",
        activeSubscriber: true
      },
      receiptIds: [
        "apple:1"
      ]
    },
    {
      applicationUsername: "dany",
      customerInfo: {},
      receiptIds: []
    }
  ]
}
