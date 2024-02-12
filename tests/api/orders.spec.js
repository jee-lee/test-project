import 'dotenv/config';
import { expect } from 'chai';
import { postAuthentication } from '../../src/api/authentication.js';
import { getOrder } from '../../src/api/orders.js';

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

describe('Get Orders', async () => {
  // TODO: Update this to be part of the configuration.
  const validOrderNumber = '29a43e12-d5ab-4ab1-9b8f-8563428f3c98';
  let token;
  let getOrderResponse;

  before(async () => {
    expect(publicKey).to.a('string', 'PUBLIC_KEY environment variable was not found.')
      .and.not.empty;
    expect(privateKey).to.be.a('string', 'PRIVATE_KEY environment variable was not found.')
      .and.not.empty;
    const response = await postAuthentication({ public_key: publicKey, secret_key: privateKey });
    expect(response.status).to.eq(200, `Error Response: ${JSON.stringify(response.data, null, 2)}`);
    token = response.data.token;
  });

  context('A valid order number with a valid token', () => {
    before(async () => {
      getOrderResponse = await getOrder(
        validOrderNumber,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      expect(getOrderResponse.status).to.eq(200);
    });

    it('should have a subtotal equal to the sum of the item costs', () => {
      const itemCostSum = getOrderResponse.data.items.reduce((acc, current) => acc + current.cost, 0);
      expect(getOrderResponse.data.subtotal).to.eq(itemCostSum);
    });

    it('should have policy numbers in the "TGFS-*" format', () => {
      getOrderResponse.data.policies.forEach((policy) => {
        expect(policy.policy_number).to.match(/TGFS-\S+/);
      });
    });

    it('should have the same customer id across the order and its items', () => {
      const topLevelCustomerId = getOrderResponse.data.customer.id;
      getOrderResponse.data.items.forEach((item) => {
        expect(item.customer.id).to.eq(topLevelCustomerId);
      });
    });

    it('should have an associated policy for each item', () => {
      getOrderResponse.data.items
        .map((item) => item.reference_number)
        .forEach((referenceNumber) => {
          expect(referenceNumber).to.be.oneOf(getOrderResponse.data.policies.map((policy) => policy.item.reference_number));
        });
    });
  });
});
