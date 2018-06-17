import { Block } from "../lib/Block";

describe('Block', () => {
    test('creates a proper GenisisBlock.', () => {
        const genisisBlock = Block.createGenisis();
        expect(genisisBlock.transactions).toEqual([]);
        expect(genisisBlock.previousHash).toBe(null);
    });

    test('creates a proper hash', () => {
        let block = new Block(5418972000);
        expect(block.hash).toBe('82e8ffada74d63c494e6b71ef6242fb4f7f6dd3130d9ccc5ca3ac108c92aa663')
    });

    test('creates a block having a specified difficulty', () => {
        let block = new Block(Date.now());
        block.mineBlock(2);

        expect(block.hash.indexOf("00")).toBe(0);
    });
});