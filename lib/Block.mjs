import SHA256 from "crypto-js/sha256";

export class Block {
    constructor(timestamp, transactions = [], previousHash = null) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;

        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        let difficultyTask = "0".repeat(difficulty);

        while (this.hash.substring(0, difficulty) !== difficultyTask) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

    static createGenisis() {
        return new Block(Date.now());
    }
}