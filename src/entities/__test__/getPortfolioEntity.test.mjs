import { faker, expect } from './../../../__test__/index.mjs';
import { expectCodeThrow } from './../../../__test__/expectError.mjs';
import { INVALID_PARAM_ERROR } from '../../constants/errors.mjs';
import { getPortfolioEntity } from '../index.mjs';

describe('getPortfolioEntity', () => {
  it('should throw an error if the accountNumber is not a valid integer', () => {
    const accountNumber = faker.lorem.word();
    const method = () => getPortfolioEntity({ accountNumber });
    expectCodeThrow({ method, errorMessage: INVALID_PARAM_ERROR });
  });
  it('should return an error if neither the accountNumber is passed', () => {
    const method = () => getPortfolioEntity({});
    expectCodeThrow({ method, errorMessage: INVALID_PARAM_ERROR });
  });
  it('should return the accountNumber if it is a valid integer', () => {
    const accountNumber = faker.random.number();
    const response = getPortfolioEntity({ accountNumber });
    expect(response).to.have.property('accountNumber', accountNumber);
  });
});
