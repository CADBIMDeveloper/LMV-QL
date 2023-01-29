import 'mocha';
import { assert } from 'chai';

import { helloWorld } from '../index';

describe('Hello world!', () => {
    it ('setup test', () => {
        assert.equal(helloWorld(), "Hello World!");
    })
});