export const validateParam = (param, paramName, expectedType, additionalCheck = () => true) => {
  if (typeof param !== expectedType || !additionalCheck(param)) {
    throw new Error(`Invalid ${paramName}. Expected a valid ${expectedType}.`);
  }
};

export const isValidString = (str) => typeof str === 'string' && str.trim() !== '';
export const isValidInteger = (num) =>
  Number.isInteger(num) || (num.trim() !== '' && !Number.isNaN(Number(num)));
