// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Exchange {
    
    // player address variables - set player addressees to zero
    address payable platform = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);


    //a struct that record info about selling goods
    struct UploadGoods {
    address payable Seller;
    string item;
    uint256 price;
    bytes32 id;
    }

    //
    struct Waiting_list{
        address payable seller;
        address payable buyer;
        bytes32 id;
        string item;
        uint256 price;
    }
    //an array to record waiting
    Waiting_list[] public waiting_list;

    //an array that record all selling goods
    UploadGoods[] public uploadgoods;

    //map id to info,get a temp place to save info about goods waiting for trading
    mapping(bytes32 => UploadGoods) public waiting_for_trading;

    //map id to buyer address
    mapping(bytes32 => address payable) public check_buyer;

    //map id to status whether can be canceled, bool=true :can be cancelled, bool=false: cannot
    mapping(bytes32 => bool) public check_status;

    //record info about selling goods and input it into the uploadgoods array
    function record( string memory _item, uint256 _price) public {
        require(_price>=1000,'the price should be larger than 1000 wei');
        bytes32 ID = keccak256(abi.encode(block.timestamp, _item));
        UploadGoods memory newgoods = UploadGoods(payable(msg.sender), _item, _price, ID);//msg.sender是卖家的地址address
        uploadgoods.push(newgoods);
        check_status[ID]= true;
    }

    
    struct Dealsinfo {
    address payable Buyer;
    address payable Seller;
    string item;
    uint256 price;
    bytes32 id;
    }

    //an array that record all Dealinfo
    Dealsinfo[] public dealsinfo;
    


    //buy function which input is Good Id and Buyer Adress 
    
    //1.a function require whether id is in the uploadgoods, return the index;
    //2.get other info in this struct
    //3.require whether money is enough;
    //4.record buyer address with id
    //5.delete the struct in the uploadgoods,record this goods info into a temp mapping called wating_for_trading
    
    function Buy( bytes32 _GoodsID) public payable {
        //1
        uint index = checkIDExistence(_GoodsID);
  
        //2
        UploadGoods memory temp = uploadgoods[index];
        
        //3
        require(msg.value == temp.price, "Incorrect ether amount sent");
        
        //4
        
        check_buyer[temp.id]=payable(msg.sender);
        //5
        for (uint256 j = index + 1; j < uploadgoods.length; j++) {
            uploadgoods[j - 1] = uploadgoods[j]; //element after the index ,move forward one step
        }
        uploadgoods.pop();//delete the last element
        waiting_for_trading[_GoodsID]=temp;

        Waiting_list memory wait_add= Waiting_list(temp.Seller,payable(msg.sender),temp.id,temp.item,temp.price);
        waiting_list.push(wait_add);
        check_status[_GoodsID]=false;
        
        //6 transfer the money 
        //transfer_money(temp.Seller, temp.price);
        
    }



    //1.a function require whether id is in the uploadgoods and return the index;
    function checkIDExistence(bytes32 _Id) public view returns (uint) {
        for (uint256 i = 0; i < uploadgoods.length; i++) {
            if (uploadgoods[i].id == _Id) {
                return i;
            }
        }
        revert("Element does not exist in the uploadgoods");
    }

    //5.serve as  cancel
    function cancel(bytes32 _GoodsID) public{
        
        uint _index = checkIDExistence(_GoodsID);
        UploadGoods memory _temp = uploadgoods[_index];
        require(payable(msg.sender)==_temp.Seller,"you are not this item's seller");
        for (uint256 j = _index + 1; j < uploadgoods.length; j++) {
            uploadgoods[j - 1] = uploadgoods[j]; //element after the index ,move forward one step
        }
        uploadgoods.pop();//delete the last element

    }


    //6. confirmation and transfer money (for buyers)
    function confirmation(bool _choice, bytes32 _GoodsID) public{

        //require goods id in the wating_for_trading mapping
        require(waiting_for_trading[_GoodsID].price!=0,"id doesn't exist");
        //get id info
        UploadGoods memory _temp = waiting_for_trading[_GoodsID];
 
        //require buyer to use
        require(payable(msg.sender)==check_buyer[_GoodsID],"you are not This goods seller");
        check_buyer[_GoodsID]=payable(0x0);
        //record deal info
        Dealsinfo memory newdeals = Dealsinfo(payable(msg.sender), _temp.Seller, _temp.item, _temp.price,_temp.id);
        dealsinfo.push(newdeals);

        waiting_for_trading[_GoodsID]=UploadGoods(_temp.Seller,_temp.item,0,_temp.id);

        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].id == _GoodsID) {
                
                waiting_list[i] = waiting_list[waiting_list.length - 1];
                waiting_list.pop();
                break;
            }
        }
        
        //if receive the goods
        if (_choice== true){
            _temp.Seller.transfer(_temp.price*999/1000 *1 wei);//transfer 99.9%money to seller
            platform.transfer(_temp.price*1/1000 *1 wei );//the platform will get 0.1% as transaction fee.
        }
        //not receive
        else {
            payable(msg.sender).transfer(_temp.price*1 wei);
        }
    }

    function mergeArrays(UploadGoods[] memory arr1, UploadGoods[] memory arr2) public pure returns (UploadGoods[] memory) {
        UploadGoods[] memory mergedArray = new UploadGoods[](arr1.length + arr2.length);
        
        for (uint i = 0; i < arr1.length; i++) {
            mergedArray[i] = arr1[i];
        }
        
        for (uint j = 0; j < arr2.length; j++) {
            mergedArray[arr1.length + j] = arr2[j];
        }
        
        return mergedArray;
    }
    
    
    //get all goodsinfo which this user is selling
    function getUserSellings() public view returns (UploadGoods[] memory) {
        address payable _user=payable(msg.sender);
        uint256 count = 0;

        // get the count of all this user selling goods
        for (uint256 i = 0; i < uploadgoods.length; i++) {
            if (uploadgoods[i].Seller == _user) {
                count++;
            }
        }

        // create a userGoods array to save all goods that this user is selling
        UploadGoods[] memory userGoods = new UploadGoods[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < uploadgoods.length; i++) {
            if (uploadgoods[i].Seller == _user) {
                userGoods[index] = uploadgoods[i];
                index++;
            }
        }
        
        // check if user have any trading history
        uint256 count2 = 0;

        // get the count of all this user selling goods
        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].seller == _user) {
                count2++;
            }
        }
        
        // create a userGoods array to save all goods that this user is selling
        UploadGoods[] memory userGoods2 = new UploadGoods[](count2);
        uint256 index2 = 0;

        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].seller == _user) {
                Waiting_list memory _wait_add= waiting_list[i];
                UploadGoods memory _temp= UploadGoods(_wait_add.seller,_wait_add.item,_wait_add.price,_wait_add.id);
                userGoods2[index2]= _temp;
                index2++;
            }
        }

        UploadGoods[] memory _merged= mergeArrays(userGoods,userGoods2);
        if(_merged.length==0){
            revert("no uploading history");
        }
        return _merged;
    }
    



    function getUserDeals() public view returns (Dealsinfo[] memory) {
        address payable _user=payable(msg.sender);
        uint256 count = 0;

        //get the count of all this user selled goods
        for (uint256 i = 0; i < dealsinfo.length; i++) {
            if (dealsinfo[i].Buyer == _user || dealsinfo[i].Seller == _user) {
                count++;
            }
        }

        // create a userGoods array to save all goods that this user have already selled
        Dealsinfo[] memory userDeals = new Dealsinfo[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < dealsinfo.length; i++) {
            if (dealsinfo[i].Buyer == _user || dealsinfo[i].Seller == _user) {
                userDeals[index] = dealsinfo[i];
                index++;
            }
        }

        // check if user have any trading history
        if (index == 0) {
            revert("no trading history");
        }

        return userDeals;
    }


    //get all products that are selling (in the uploadgoods)
    function getAllProducts() public view returns (UploadGoods[] memory) {
        return uploadgoods;
    }

    //Find all the information about a certain type of product
    function getGoodsByItem(string memory _item) public view returns (UploadGoods[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < uploadgoods.length; i++) {
            if (keccak256(bytes(uploadgoods[i].item)) == keccak256(bytes(_item))) {
                count++;
            }
        }

        if (count == 0) {
            // no this item, and return error
            string memory errorMessage = "No one has uploaded this item";
            revert(errorMessage);
        } else {
            UploadGoods[] memory goodsList = new UploadGoods[](count);
            uint256 index = 0;
            for (uint256 i = 0; i < uploadgoods.length; i++) {
                if (keccak256(bytes(uploadgoods[i].item)) == keccak256(bytes(_item))) {
                    goodsList[index] = uploadgoods[i];
                    index++;
                }
            }
            return goodsList;
        }
    }

    function deleteItem(bytes32 id) public {
        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].id == id) {
                
                waiting_list[i] = waiting_list[waiting_list.length - 1];
                waiting_list.pop();
                break;
            }
        }
    }
    //return a list of goodsid that this users need to confirm
    function getwaitinglist() public view returns (Waiting_list[] memory) {
        address payable _user=payable(msg.sender);
        uint256 count = 0;

        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].buyer == _user) {
                count++;
            }
        }

        require(count > 0, "no items waiting to confirm");

        Waiting_list[] memory waitings = new Waiting_list[](count);
        count = 0;

        for (uint256 i = 0; i < waiting_list.length; i++) {
            if (waiting_list[i].buyer == _user) {
                waitings[count] = waiting_list[i];
                count++;
            }
        }

        return waitings;
    }

    // decide whether can be cancelled
    function get_whether_can_be_cancelled(bytes32 _GoodsID) public view returns(bool){
        bool _status=check_status[_GoodsID];
        return _status;

    }





}
