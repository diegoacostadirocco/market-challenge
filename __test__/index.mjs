import 'mocha';
import * as chai from 'chai';
import Fakerator from 'fakerator';

const expect = chai.expect;

const faker = Fakerator('es-ES');

export { expect, faker };
