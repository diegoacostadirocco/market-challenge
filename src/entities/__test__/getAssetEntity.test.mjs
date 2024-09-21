import { faker, expect } from './../../../__test__/index.mjs';
import { expectCodeThrow } from './../../../__test__/expectError.mjs';
import { INVALID_PARAM_ERROR } from '../../constants/errors.mjs';
import { getAssetEntity } from '../index.mjs';

describe('getAssetEntity', () => {
  it('should throw an error if the ticker is not a valid string', () => {
    const ticker = faker.random.number();
    const method = () => getAssetEntity({ ticker });
    expectCodeThrow({ method, errorMessage: INVALID_PARAM_ERROR });
  });
  it('should return an error if neither the ticker nor the name are passed', () => {
    const method = () => getAssetEntity({});
    expectCodeThrow({ method, errorMessage: INVALID_PARAM_ERROR });
  });

  it('should return the name if it is a valid string', () => {
    const name = 'name';
    const response = getAssetEntity({ name });
    expect(response).to.have.property('name', name);
  });
  it('should return the ticker if it is a valid string', () => {
    const ticker = 'ticker';
    const response = getAssetEntity({ ticker });
    expect(response).to.have.property('ticker', ticker);
  });

  it('should return the name and ticker if they are valid strings', () => {
    const name = 'name';
    const ticker = 'ticker';
    const response = getAssetEntity({ name, ticker });
    expect(response).to.have.property('name', name);
    expect(response).to.have.property('ticker', ticker);
  });
});
