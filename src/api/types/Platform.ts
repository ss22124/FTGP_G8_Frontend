/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Exchange {
  export type UploadGoodsStruct = {
    Seller: AddressLike;
    item: string;
    price: BigNumberish;
    id: BytesLike;
  };

  export type UploadGoodsStructOutput = [
    Seller: string,
    item: string,
    price: bigint,
    id: string
  ] & { Seller: string; item: string; price: bigint; id: string };

  export type DealsinfoStruct = {
    Buyer: AddressLike;
    Seller: AddressLike;
    item: string;
    price: BigNumberish;
    id: BytesLike;
  };

  export type DealsinfoStructOutput = [
    Buyer: string,
    Seller: string,
    item: string,
    price: bigint,
    id: string
  ] & {
    Buyer: string;
    Seller: string;
    item: string;
    price: bigint;
    id: string;
  };

  export type Waiting_listStruct = {
    seller: AddressLike;
    buyer: AddressLike;
    id: BytesLike;
    item: string;
    price: BigNumberish;
  };

  export type Waiting_listStructOutput = [
    seller: string,
    buyer: string,
    id: string,
    item: string,
    price: bigint
  ] & {
    seller: string;
    buyer: string;
    id: string;
    item: string;
    price: bigint;
  };
}

export interface PlatformInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "Buy"
      | "cancel"
      | "checkIDExistence"
      | "check_buyer"
      | "check_status"
      | "confirmation"
      | "dealsinfo"
      | "deleteItem"
      | "getAllProducts"
      | "getGoodsByItem"
      | "getUserDeals"
      | "getUserSellings"
      | "get_whether_can_be_cancelled"
      | "getwaitinglist"
      | "mergeArrays"
      | "record"
      | "uploadgoods"
      | "waiting_for_trading"
      | "waiting_list"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "Buy", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "cancel", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "checkIDExistence",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "check_buyer",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "check_status",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmation",
    values: [boolean, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "dealsinfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteItem",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllProducts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGoodsByItem",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserDeals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserSellings",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "get_whether_can_be_cancelled",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getwaitinglist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mergeArrays",
    values: [Exchange.UploadGoodsStruct[], Exchange.UploadGoodsStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "record",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uploadgoods",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "waiting_for_trading",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "waiting_list",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "Buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkIDExistence",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "check_buyer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "check_status",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dealsinfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deleteItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllProducts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGoodsByItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserDeals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserSellings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_whether_can_be_cancelled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getwaitinglist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mergeArrays",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "record", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "uploadgoods",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "waiting_for_trading",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "waiting_list",
    data: BytesLike
  ): Result;
}

export interface Platform extends BaseContract {
  connect(runner?: ContractRunner | null): BaseContract;
  attach(addressOrName: AddressLike): this;
  deployed(): Promise<this>;

  interface: PlatformInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  Buy: TypedContractMethod<[_GoodsID: BytesLike], [void], "payable">;

  cancel: TypedContractMethod<[_GoodsID: BytesLike], [void], "nonpayable">;

  checkIDExistence: TypedContractMethod<[_Id: BytesLike], [bigint], "view">;

  check_buyer: TypedContractMethod<[arg0: BytesLike], [string], "view">;

  check_status: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  confirmation: TypedContractMethod<
    [_choice: boolean, _GoodsID: BytesLike],
    [void],
    "nonpayable"
  >;

  dealsinfo: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, bigint, string] & {
        Buyer: string;
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;

  deleteItem: TypedContractMethod<[id: BytesLike], [void], "nonpayable">;

  getAllProducts: TypedContractMethod<
    [],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;

  getGoodsByItem: TypedContractMethod<
    [_item: string],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;

  getUserDeals: TypedContractMethod<
    [],
    [Exchange.DealsinfoStructOutput[]],
    "view"
  >;

  getUserSellings: TypedContractMethod<
    [],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;

  get_whether_can_be_cancelled: TypedContractMethod<
    [_GoodsID: BytesLike],
    [boolean],
    "view"
  >;

  getwaitinglist: TypedContractMethod<
    [],
    [Exchange.Waiting_listStructOutput[]],
    "view"
  >;

  mergeArrays: TypedContractMethod<
    [arr1: Exchange.UploadGoodsStruct[], arr2: Exchange.UploadGoodsStruct[]],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;

  record: TypedContractMethod<
    [_item: string, _price: BigNumberish],
    [void],
    "nonpayable"
  >;

  uploadgoods: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, bigint, string] & {
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;

  waiting_for_trading: TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint, string] & {
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;

  waiting_list: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, bigint] & {
        seller: string;
        buyer: string;
        id: string;
        item: string;
        price: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "Buy"
  ): TypedContractMethod<[_GoodsID: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "cancel"
  ): TypedContractMethod<[_GoodsID: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "checkIDExistence"
  ): TypedContractMethod<[_Id: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "check_buyer"
  ): TypedContractMethod<[arg0: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "check_status"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "confirmation"
  ): TypedContractMethod<
    [_choice: boolean, _GoodsID: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "dealsinfo"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, bigint, string] & {
        Buyer: string;
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "deleteItem"
  ): TypedContractMethod<[id: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getAllProducts"
  ): TypedContractMethod<[], [Exchange.UploadGoodsStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getGoodsByItem"
  ): TypedContractMethod<
    [_item: string],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserDeals"
  ): TypedContractMethod<[], [Exchange.DealsinfoStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getUserSellings"
  ): TypedContractMethod<[], [Exchange.UploadGoodsStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "get_whether_can_be_cancelled"
  ): TypedContractMethod<[_GoodsID: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getwaitinglist"
  ): TypedContractMethod<[], [Exchange.Waiting_listStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "mergeArrays"
  ): TypedContractMethod<
    [arr1: Exchange.UploadGoodsStruct[], arr2: Exchange.UploadGoodsStruct[]],
    [Exchange.UploadGoodsStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "record"
  ): TypedContractMethod<
    [_item: string, _price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "uploadgoods"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, bigint, string] & {
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "waiting_for_trading"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint, string] & {
        Seller: string;
        item: string;
        price: bigint;
        id: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "waiting_list"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, bigint] & {
        seller: string;
        buyer: string;
        id: string;
        item: string;
        price: bigint;
      }
    ],
    "view"
  >;

  filters: {};
}
