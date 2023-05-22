/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { Platform, PlatformInterface } from "../Platform";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_GoodsID",
        type: "bytes32",
      },
    ],
    name: "Buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_GoodsID",
        type: "bytes32",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_Id",
        type: "bytes32",
      },
    ],
    name: "checkIDExistence",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "check_buyer",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_choice",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "_GoodsID",
        type: "bytes32",
      },
    ],
    name: "confirmation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "dealsinfo",
    outputs: [
      {
        internalType: "address payable",
        name: "Buyer",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "Seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "item",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "deleteItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProducts",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "Seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "item",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct Exchange.UploadGoods[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_item",
        type: "string",
      },
    ],
    name: "getGoodsByItem",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "Seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "item",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct Exchange.UploadGoods[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserDeals",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "Buyer",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "Seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "item",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct Exchange.Dealsinfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserSellings",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "Seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "item",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct Exchange.UploadGoods[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getwaitinglist",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_item",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "record",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uploadgoods",
    outputs: [
      {
        internalType: "address payable",
        name: "Seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "item",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "waiting_for_trading",
    outputs: [
      {
        internalType: "address payable",
        name: "Seller",
        type: "address",
      },
      {
        internalType: "string",
        name: "item",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "waiting_list",
    outputs: [
      {
        internalType: "address payable",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class Platform__factory {
  static readonly abi = _abi;
  static createInterface(): PlatformInterface {
    return new Interface(_abi) as PlatformInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Platform {
    return new Contract(address, _abi, runner) as unknown as Platform;
  }
}
