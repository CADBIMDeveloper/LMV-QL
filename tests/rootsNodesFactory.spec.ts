import 'mocha';
import { expect } from 'chai';
import { pdb } from './mocks/propertyDatabaseMock';
import { findRootNodes } from '../src/rootsNodesFactory';
import { doubleRootPdb } from './mocks/doubleRootPropertyDatabaseMock';
import { PropertyDatabaseAttributesCollection } from '../src/propertyDatabaseAttributesCollection';

describe("Root nodes factory", () => {
    it("must get ordinary property database root nodes", () => {
        const rootNodes = findRootNodes(pdb, new PropertyDatabaseAttributesCollection(pdb, true));

        expect(rootNodes).to.eql([1]);
    });

    it("must get double-rooted model property database roots", () => {
        const rootNodes = findRootNodes(doubleRootPdb, new PropertyDatabaseAttributesCollection(doubleRootPdb, true));

        expect(rootNodes).to.eql([2]);
    });
});