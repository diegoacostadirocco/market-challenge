import { expect } from './index.mjs';

const expectCodeThrow = ({ method, errorMessage }) => {
  try {
    const response = method();
    expect(response).to.be.an('Error');
  } catch (error) {
    expect(error).to.be.an('Error');
    expect(error.message).to.equal(errorMessage);
    return error;
  }
};

const expectCodeThrowAsync = async ({ method, errorMessage }) => {
  try {
    const response = await method();
    expect(response).to.be.an('Error');
  } catch (error) {
    expect(error).to.be.an('Error');
    expect(error.message).to.equal(errorMessage);
    return error;
  }
};

export { expectCodeThrow, expectCodeThrowAsync };
