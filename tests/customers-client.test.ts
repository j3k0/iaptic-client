import td from 'testdouble';
import { expect } from 'chai';
import {
  applicationUsername, getCustomerPurchasesResultData,
  getCustomersBulkInfoResultData
} from './dummy-data'
import { GetCustomersBulkInfoParams } from '../src/types';
import { CustomersClient } from '../src/v2/clients/CustomersClient';
import got, { Got, GotRequestFunction, OptionsOfJSONResponseBody } from 'got';

const calledOnce = { times: 1, ignoreExtraArgs: true };

describe('PurchasesClient', () => {

  const createClient = () => new CustomersClient({
    appName: 'test',
    secretKey: 'api_secret'
  });

  afterEach(() => {
    td.reset();
  });

  describe('constructor', () => {
    it('sets the default URL to https://validator.fovea.cc', () => {

      const client = createClient();
      expect(client.baseUrl).to.be.eql('https://validator.fovea.cc');
    });
  });

  describe("getCustomerPurchases", () => {

    it('requires userId', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains(`/v2/customers/${applicationUsername}/purchases`);

      td.replace(client.api, 'get', td.func());
      td.when(client.api.get<object>(validPath, td.matchers.anything()))
        .thenResolve({ body: undefined, statusCode: 400 });

      client.getCustomerPurchases('', (err, data) => {
        expect(err).to.be.not.null;
        expect(err).to.be.instanceOf(Error);
        expect(data).to.be.undefined;
        done();
      });

    });

    it('request purchases', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains(`/v2/customers/${applicationUsername}/purchases`);

      td.replace(client.api, 'get', td.func());
      td.when(client.api.get<object>(validPath, td.matchers.anything()))
        .thenResolve({ body: getCustomerPurchasesResultData, statusCode: 200 });

      client.getCustomerPurchases(applicationUsername, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.eql(getCustomerPurchasesResultData);
        done();
      });

    });
  });



  describe('getCustomersBulkInfo', () => {

    it('requires limit&skip or applicationusernames', (done) => {

      const client = createClient();
      const validPath = td.matchers.contains('/v2/customers/');

      td.replace(client.api, 'get', td.func());
      td.when(client.api.get<object>(validPath, td.matchers.anything()))
        .thenResolve({ body: {}, statusCode: 200 });

      client.getCustomersBulkInfo({} as GetCustomersBulkInfoParams, (err, data) => {
        expect(err).to.be.not.null;
        expect(err).to.be.instanceOf(Error);
        expect(data).to.be.undefined;
        done();
      });
    });

    it('disregard limit&skip when applicationusernames is specified', (done) => {
      const client = createClient();
      const validPath = td.matchers.contains('/v2/customers/?applicationUsername=bob%2520kal%2Calice%2Cjeko');

      td.replace(client.api, 'get', td.func());
      td.when(client.api.get<object>(validPath, td.matchers.anything()))
        .thenResolve({ body: getCustomersBulkInfoResultData, statusCode: 200 });

      client.getCustomersBulkInfo({ limit: 10, skip: 1, applicationUsername: ['bob kal', 'alice', 'jeko'] }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.be.eql(getCustomersBulkInfoResultData);
        done();
      });
    });

    it('requests bulk customers purchases', (done) => {

      const client = createClient();
      const validPath = td.matchers.contains('/v2/customers/?limit=10&skip=1');

      td.replace(client.api, 'get', td.func());
      td.when(client.api.get<object>(validPath, td.matchers.anything()))
        .thenResolve({ body: getCustomersBulkInfoResultData, statusCode: 200 });


      client.getCustomersBulkInfo({ limit: 10, skip: 1 }, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.be.eql(getCustomersBulkInfoResultData);
        done();
      });
    });

  });


  describe('Errors', () => {

    it('return "appName and apiKey do not match" when invalid', (done) => {
      const client = createClient();

      client.getCustomerPurchases('dummy-app-id', (err, data) => {
        expect(err).to.be.not.null;
        expect(err?.message).to.be.eql('Error: appName and apiKey do not match');
        expect(data).to.be.undefined;
        done();
      });

    });

    it('return invalid credentials when appname and secretkey are not provided', (done) => {
      const client = new CustomersClient({
        appName: '',
        secretKey: ''
      });
      client.getCustomerPurchases('dummy-app-id', (err, data) => {
        expect(err).to.be.not.null;
        expect(err?.message).to.be.eql('Error: Invalid credentials');
        expect(data).to.be.undefined;
        done();
      });

    });

    it('check for page other than the billing api ', (done) => {

      const client = new CustomersClient({
        appName: 'app-name',
        secretKey: 'secret-key',
        url: 'https://billing.fovea.cc'
      });
      client.getCustomerPurchases('dummy-app-id', (err, data) => {
        expect(err).to.be.not.null;
        expect(err?.message).to.be.eql('Response code 404 (Not Found)');
        done();
      });
    })


  });

});
