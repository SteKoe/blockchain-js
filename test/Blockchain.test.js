import { Blockchain } from "../lib/Blockchain";
import { Transaction } from "../lib/Transaction";

const FROM_ADDRESS = "9909890236";
const TO_ADDRESS = "8058588993";

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    test('creates a proper GenisisBlock.', () => {
        const genisisBlock = blockchain.chain[0];
        expect(genisisBlock.previousHash).toBe(null);
    });

    test('latestBlock', () => {
        let latestBlock = blockchain.latestBlock();
        expect(latestBlock.previousHash).toBe(null);
    });

    test('actually rewards mining', () => {
        blockchain.createTransaction(new Transaction(FROM_ADDRESS, TO_ADDRESS, 100));

        expect(blockchain.getBalanceOfAddress(TO_ADDRESS)).toBe(0);
        blockchain.minePendingTransactions(FROM_ADDRESS);
        expect(blockchain.getBalanceOfAddress(TO_ADDRESS)).toBe(100);
    });

    test.only('is able to validate blockchain', () => {
        blockchain.minePendingTransactions(TO_ADDRESS);
        expect(blockchain.isValid()).toBe(true);

        // Uh... oh... someone tried to manipulate the block!
        blockchain.chain[1].transactions = [new Transaction(FROM_ADDRESS, TO_ADDRESS, 100000)];
        expect(blockchain.isValid()).toBe(false);
    });
});