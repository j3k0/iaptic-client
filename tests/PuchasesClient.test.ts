import { PurchasesClient } from '../src/clients/PuchasesClient';
import td from 'testdouble';
import { expect } from 'chai';
import {
  ApplicationUsername, GetCustomerPurchasesResultData,
  GetCustomersBulkInfoResult_data
} from './dummy-data'


describe('PurchasesClient', () => {

  const createClient = () => new PurchasesClient({
    protocol: 'http',
    hostname: 'some-url-billing.com',
    port: 80,
    pathnamePrefix: '/v2/customers',
    clientId: 'test',
    secret: 'api_secret'
  });

  describe("getCustomerPurchases", () => {

    it('requires userId', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains({
        path: '/v2/customers/1E6676C70C123AA18222EF001120CAE1/purchases'
      });

      td.replace(client.api, 'get', td.function());

      td.when(client.api.get(validPath, td.matchers.anything()))
        .thenDo((path: string, cb: (e: Error | null, req: unknown, res: unknown, obj: any) => void) => {
          cb(null, null, null, {});
        });

      client.getCustomerPurchases('', (err, data) => {
        expect(err).to.be.not.null;
        expect(err).to.be.instanceOf(Error);
        expect(data).to.be.undefined;
        done();
      });

    });

    it('request purchases', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains({
        path: '/v2/customers/1E6676C70C123AA18222EF001120CAE1/purchases'
      });

      td.replace(client.api, 'get', td.function());

      td.when(client.api.get(validPath, td.matchers.anything()))
        .thenDo((path: string, cb: (e: Error | null, req: unknown, res: unknown, obj: any) => void) => {
          cb(null, null, null, GetCustomerPurchasesResultData);
        });

      client.getCustomerPurchases(ApplicationUsername, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.eql(GetCustomerPurchasesResultData);
        done();
      });

    });
  });



  describe('getCustomersBulkInfo', () => {

    it('requires limit&skip or applicationusernames', (done) => {

      const client = createClient();
      const validPath = td.matchers.contains({
        path: '/v2/customers/'
      });

      td.replace(client.api, 'get', td.function());

      td.when(client.api.get(validPath, td.matchers.anything()))
        .thenDo((path: string, cb: (e: Error | null, req: unknown, res: unknown, obj: any) => void) => {
          cb(null, null, null, {});
        });

      client.getCustomersBulkInfo({}, (err, data) => {
        expect(err).to.be.not.null;
        expect(err).to.be.instanceOf(Error);
        expect(data).to.be.undefined;
        done();
      });
    });

    it('disregard limit&skip when applicationusernames is specified', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains({
        path: '/v2/customers/?applicationUsername=bob%2520kal%2Calice%2Cjeko'
      });

      td.replace(client.api, 'get', td.function());

      td.when(client.api.get(validPath, td.matchers.anything()))
        .thenDo((path: string, cb: (e: Error | null, req: unknown, res: unknown, obj: any) => void) => {
          cb(null, null, null, GetCustomersBulkInfoResult_data);
        });

      client.getCustomersBulkInfo({ limit: 10, skip: 1, applicationUsername: ['bob kal', 'alice', 'jeko'] }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.be.eql(GetCustomersBulkInfoResult_data);
        done();
      });
    });

    it('requests bulk customers purchases', (done) => {

      const client = createClient();
      const validPath = td.matchers.contains({
        path: '/v2/customers/?limit=10&skip=1'
      });

      td.replace(client.api, 'get', td.function());

      td.when(client.api.get(validPath, td.matchers.anything()))
        .thenDo((path: string, cb: (e: Error | null, req: unknown, res: unknown, obj: any) => void) => {
          cb(null, null, null, GetCustomersBulkInfoResult_data);
        });

      client.getCustomersBulkInfo({ limit: 10, skip: 1 }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.be.eql(GetCustomersBulkInfoResult_data);
        done();
      });
    });

  })




});
