import { Utils } from '../utils';
import { ethers } from 'ethers';
import { CantEstimatedGas, ContractAddressRequired, InsufficientBalance } from '../errors';
import Web3 from 'web3';

type Options = {
    chainId: number
    gasPrice: number
    timeout?: number
    gasLimitMultiplier: number
}

type Header = {
    name: string
    value: string
}
export interface IEthCore {
    host: string
    privateKey?: string
    headers?: Array<Header>
    options?: Options
}

export const DEFAULT_TIMEOUT = 30000;
export const ABI = [{"inputs":[{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"uint8","name":"_abono","type":"uint8"},{"internalType":"string","name":"_dotacion","type":"string"},{"internalType":"string","name":"_madurez","type":"string"},{"internalType":"uint8","name":"_size","type":"uint8"}],"name":"insertHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_packageId","type":"uint256"},{"internalType":"uint256","name":"_incomeDate","type":"uint256"},{"internalType":"string","name":"incomePlace","type":"string"},{"internalType":"uint256","name":"_exitDate","type":"uint256"},{"internalType":"string","name":"_exitPlace","type":"string"}],"name":"insertLogistic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"uint8","name":"_typeSeed","type":"uint8"},{"internalType":"string","name":"_rotation","type":"string"},{"internalType":"uint32","name":"_lotNumber","type":"uint32"}],"name":"insertSown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_packageNumber","type":"uint32"},{"internalType":"uint256","name":"_incomeDate","type":"uint256"},{"internalType":"uint256","name":"_exitDate","type":"uint256"},{"internalType":"uint8","name":"_temperature","type":"uint8"}],"name":"insertStored","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getHarvest","outputs":[{"components":[{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint8","name":"abono","type":"uint8"},{"internalType":"string","name":"dotacion","type":"string"},{"internalType":"string","name":"madurez","type":"string"},{"internalType":"uint8","name":"size","type":"uint8"}],"internalType":"struct Traceability.Harvest[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLogistic","outputs":[{"components":[{"internalType":"uint256","name":"packageId","type":"uint256"},{"internalType":"uint256","name":"incomeDate","type":"uint256"},{"internalType":"string","name":"incomePlace","type":"string"},{"internalType":"uint256","name":"exitDate","type":"uint256"},{"internalType":"string","name":"exitPlace","type":"string"}],"internalType":"struct Traceability.Logistic[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSown","outputs":[{"components":[{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint8","name":"typeSeed","type":"uint8"},{"internalType":"string","name":"rotation","type":"string"},{"internalType":"uint32","name":"lotNumber","type":"uint32"}],"internalType":"struct Traceability.Sown[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStored","outputs":[{"components":[{"internalType":"uint32","name":"packageNumber","type":"uint32"},{"internalType":"uint256","name":"incomeDate","type":"uint256"},{"internalType":"uint256","name":"exitDate","type":"uint256"},{"internalType":"uint8","name":"temperature","type":"uint8"}],"internalType":"struct Traceability.Stored[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"harvestArr","outputs":[{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint8","name":"abono","type":"uint8"},{"internalType":"string","name":"dotacion","type":"string"},{"internalType":"string","name":"madurez","type":"string"},{"internalType":"uint8","name":"size","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"logisticArr","outputs":[{"internalType":"uint256","name":"packageId","type":"uint256"},{"internalType":"uint256","name":"incomeDate","type":"uint256"},{"internalType":"string","name":"incomePlace","type":"string"},{"internalType":"uint256","name":"exitDate","type":"uint256"},{"internalType":"string","name":"exitPlace","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sownArr","outputs":[{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint8","name":"typeSeed","type":"uint8"},{"internalType":"string","name":"rotation","type":"string"},{"internalType":"uint32","name":"lotNumber","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"storedArr","outputs":[{"internalType":"uint32","name":"packageNumber","type":"uint32"},{"internalType":"uint256","name":"incomeDate","type":"uint256"},{"internalType":"uint256","name":"exitDate","type":"uint256"},{"internalType":"uint8","name":"temperature","type":"uint8"}],"stateMutability":"view","type":"function"}];
export const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';

export class EthCore {

    public readonly chainId: number | string | undefined;
    public readonly gasLimitMultiplier: number;
    public readonly gasPrice: number;
    // public web3Instance: Web3;
    public web3Instance: {[key: string]: any};
    // public web3WsInstance: {[key: string]: any};
    private privateKey: string;

    /**
     * @constructor
     * @param host Connection URL to Blockchain node
     * @param privateKey Private key for transactions
     * @param headers Optional headers that are sent to the Blockchain node
     * @param timeout Timeout for the connection
     */
    constructor(props: IEthCore) {
        const { host, privateKey = null, options = {} as Options } = props;
        if (!options.timeout) options.timeout = DEFAULT_TIMEOUT;
        this.gasLimitMultiplier = options.gasLimitMultiplier || 2;
        this.gasPrice = options.gasPrice || 0;
        this.chainId = options.chainId;
        this.web3Instance = new Web3(new Web3.providers.HttpProvider(host));
        this.web3Instance.eth.handleRevert = true;
        if (!privateKey) console.info('no private key present, using a random generated');
        this.privateKey = privateKey ? Utils.formatPrivateKey(privateKey) : Utils.generatePrivateKey();
    }

    /**
     * @description Returns the current private key
     */
    getPrivateKey(): string {
        return this.privateKey;
    }

    /**
     * @description Returns the address of the private key established
     */
    getAddress(): string {
        return Utils.privateToAddress(this.privateKey);
    }

    /**
     * @description Returns a smart contract instance
     * @param abi Contract Application Binary Interface
     * @param contractAddress Address of the contract to instantiate
     */
    getInstanceContract(abi: object, contractAddress: string): any {
        if (!contractAddress) throw new ContractAddressRequired('a contract address is required');
        return new this.web3Instance.eth.Contract(abi, contractAddress);
    }

    /**
     * @description Sends a signed transaction from the execution of a function of a contract
     * @param toContract Address of the contract which will run the function
     * @param methodToExecute Reference of the method to execute. Required to get first using "getInstanceContract"
     * @param gasLimitMultiplier Multiplying factor to set the gas limit
     */
    async sendTransaction(toContract: string, methodToExecute: {[key: string]: any}, value: number = 0): Promise<{[key: string]: any}> {
        const address = Utils.privateToAddress(this.privateKey);
        const totalTransactionsAddress = await this.web3Instance.eth.getTransactionCount(address);
        const data = methodToExecute.encodeABI();
        const gasEstimated = await this.estimateGas(address, data, toContract);
        const gasLimit = Math.round(gasEstimated * this.gasLimitMultiplier);
        // const gasLimit = (this.web3Instance.eth.getBlock("latest") as any).gasLimit;
        const cost = Math.round((gasLimit * this.gasPrice) + value);
        const balance = await this.web3Instance.eth.getBalance(address);
        if(balance < cost) {
            throw new InsufficientBalance(`Gas Price: ${this.gasPrice}\nGas Cost: ${cost}\nBalance: ${balance}`);
        }
        const rawTx: any = {
            from: address,
            gasPrice: Utils.toHex(this.gasPrice),
            gasLimit: Utils.toHex(gasLimit),
            nonce: Utils.toHex(totalTransactionsAddress),
            data,
            to: toContract,
            value: Utils.toHex(value)
        };
        if(this.chainId) rawTx.chainId = this.chainId;
        const receipt = await this.sendRawTransaction(rawTx);
        return receipt;
    }

    public async estimateGas(from: string, data: string, to: string): Promise<any> {
        try {
            return await this.web3Instance.eth.estimateGas({ from, data, to });
        } catch (error) {
            throw new CantEstimatedGas(error.message);
        }
    }

    /**
     * @description Sign and send a transaction object
     * @param rawTx Transaction object
     */
    private async sendRawTransaction(rawTx: object): Promise<{[key: string]: any}> {
        const signedTx = await this.signTransaction(rawTx);
        const txHash = await Utils.waitForEventName(() => this.web3Instance.eth.sendSignedTransaction(signedTx), 'transactionHash');
        const receipt = await this.waitForTransactionReceipt(txHash);
        console.info(JSON.stringify(receipt, null, ' '));
        return receipt;
    }

    /**
     * @description Sign a transaction object
     * @param rawTx 
     */
    async signTransaction(rawTx: object): Promise<string> {
        const wallet = new ethers.Wallet(this.privateKey);
        return await wallet.signTransaction(rawTx);
    }

    /**
     * @description Wait for the transaction receipt
     * @param txHash Transaction hash
     * @param _tries Number of attempts to obtain the transaction receipt
     */
    waitForTransactionReceipt(txHash: string, _tries = 30): Promise<{[key: string]: any}> {
        return new Promise((resolve, reject) => {
            var tries = _tries;
            var interval = setInterval(() => {
            this.web3Instance.eth.getTransactionReceipt(
                txHash,
                (error: Error, txReceipt?: {[key: string]: any}) => {
                    if (error) {
                        clearInterval(interval);
                        reject(error);
                    } else {
                        if (txReceipt && txReceipt['transactionHash'] == txHash && txReceipt['blockNumber']) {
                            clearInterval(interval);
                            resolve(txReceipt);
                        } else if (tries > 0) {
                            tries--;
                        } else {
                            clearInterval(interval);
                            reject(txReceipt);
                        }
                    }
                }
            )}, 1000);
        });
    }

    /**
     * @description Get the network identifier
     */
    async getNetworkId(): Promise<BigInt> {
        return await this.web3Instance.eth.net.getId();
    }
}