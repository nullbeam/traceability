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
export const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"lotId","type":"uint256"},{"indexed":true,"internalType":"uint8","name":"processId","type":"uint8"},{"indexed":false,"internalType":"address","name":"sender","type":"address"}],"name":"NewLotProccess","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"companies","outputs":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanies","outputs":[{"components":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct Traceability.Company[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getLotById","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint8","name":"currentProcess","type":"uint8"},{"internalType":"address","name":"createdBy","type":"address"},{"internalType":"bool","name":"isValid","type":"bool"}],"internalType":"struct Traceability.Lot","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getLotProccessByCompany","outputs":[{"components":[{"internalType":"uint8","name":"processId","type":"uint8"},{"internalType":"string","name":"companyId","type":"string"},{"internalType":"uint256","name":"operationStartDate","type":"uint256"},{"internalType":"uint256","name":"operationEndDate","type":"uint256"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"additionalInformation","type":"string"},{"internalType":"address","name":"addedBy","type":"address"},{"internalType":"uint256","name":"lotId","type":"uint256"},{"internalType":"bool","name":"isValid","type":"bool"}],"internalType":"struct Traceability.LotProcess[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getLotProccessById","outputs":[{"components":[{"internalType":"uint8","name":"processId","type":"uint8"},{"internalType":"string","name":"companyId","type":"string"},{"internalType":"uint256","name":"operationStartDate","type":"uint256"},{"internalType":"uint256","name":"operationEndDate","type":"uint256"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"additionalInformation","type":"string"},{"internalType":"address","name":"addedBy","type":"address"},{"internalType":"uint256","name":"lotId","type":"uint256"},{"internalType":"bool","name":"isValid","type":"bool"}],"internalType":"struct Traceability.LotProcess","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"insertCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_currentProcess","type":"uint8"},{"internalType":"string","name":"_companyId","type":"string"},{"internalType":"uint256","name":"_operationStartDate","type":"uint256"},{"internalType":"uint256","name":"_operationEndDate","type":"uint256"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"string","name":"_additionalInformation","type":"string"},{"internalType":"uint256","name":"_lotId","type":"uint256"}],"name":"insertLotProcess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lotMap","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint8","name":"currentProcess","type":"uint8"},{"internalType":"address","name":"createdBy","type":"address"},{"internalType":"bool","name":"isValid","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"lotProcessByCompanyMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"lotProcessMap","outputs":[{"internalType":"uint8","name":"processId","type":"uint8"},{"internalType":"string","name":"companyId","type":"string"},{"internalType":"uint256","name":"operationStartDate","type":"uint256"},{"internalType":"uint256","name":"operationEndDate","type":"uint256"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"additionalInformation","type":"string"},{"internalType":"address","name":"addedBy","type":"address"},{"internalType":"uint256","name":"lotId","type":"uint256"},{"internalType":"bool","name":"isValid","type":"bool"}],"stateMutability":"view","type":"function"}];
export const CONTRACT_ADDRESS = '0x3F0Ce9df51af9EB3E7a115f0B6dc3FEB004A0Ed6';

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
        } catch (error: any) {
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