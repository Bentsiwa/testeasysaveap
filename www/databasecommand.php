<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');

	//check command
	if(!isset($_REQUEST['cmd'])){
		echo "cmd is not provided";
		exit();
	}
	/*get command*/
	//A method is called based on the command
	$cmd=$_REQUEST['cmd'];
	switch($cmd){
		case 1:
			loginMerchant();
			break;
    case 2:
  		loginCustomer();
  		break;
    case 4:
    	prepareTransaction();
    	break;
		case 5:
	    	addNewUser();
	    	break;
		case 6:
				getTransactions();
				break;
	 case 7:
				getBalance();
				break;
	 case 8:
	 			updateCashout();
				break;
	 case 9:
				addAccount();
				break;
	 case 10:
		 		getAccounts();
		 		break;
	case 11:
				getUserWithPhoneNumber();
				break;
	case 12:
				getTransfers();
				break;
	case 13:
				sendsms();
				break;
		default:
			echo '{"result": 0, "message": "Wrong cmd"}';	//change to json message
			break;
	}


/**
 * This is the database command handler function to point to logging in a merchant account
 * @return [String] [reproduces the obj provided by the database query to be presented on utilized in the javascript]
 */
  function loginMerchant()
    {

       include("users.php");
       $user = new users();

			 if(!isset($_REQUEST['email'])){
				 echo '{"result":0,"message":"No user email. Failed to log in."}';
				 return;
			 }

       if($_REQUEST['email']=="")
       {
         echo '{"result": 0, "message": "No user email. Failed to log in."}';
         exit();
       }

       $email = $_REQUEST['email'];
       $password = $_REQUEST['password'];
       $validation = $user->loginUserMerchant($email,$password);
       // echo $validation;
 			if($validation==false){

 			   echo '{"result":0,"message":"Validation failed"}';

 			}
 			else{
        echo json_encode($validation);
 			}

 	}

  /**
   * This is the database command handler function to point to logging in a customer account
   * @return [String] [reproduces the obj provided by the database query to be presented on utilized in the javascript]
   */
  function loginCustomer()
    {

       include("users.php");
       $user = new users;

			 if(!isset($_REQUEST['email'])){
				 echo '{"result":0,"message":"No user email. Failed to log in."}';
				 return;
			 }

       if($_REQUEST['email']=="")
       {
         echo '{"result": 0, "message": "No user email. Failed to log in."}';
         exit();
       }

       $email = $_REQUEST['email'];
       $password = $_REQUEST['password'];
       $validation = $user->loginUserCustomer($email,$password);
       // echo $validation;
 			if($validation==false){

 			   echo '{"result":0,"message":"Validation failed"}';

 			}
 			else{
        echo json_encode($validation);
 			}

 	}

	function getUserWithPhoneNumber(){
		include("users.php");
		$user = new users;

		if(!isset($_REQUEST['phonenumber'])){
			echo '{"result":0,"message":"No phone number. Failed to confirm."}';
			return;
		}

		if($_REQUEST['phonenumber']=="")
		{
			echo '{"result": 0, "message": "No phone number. Failed to confirm."}';
			exit();
		}

		$phonenumber = $_REQUEST['phonenumber'];

		$validation = $user->getUserWithPhoneNumber($phonenumber);
		$validation=$user->fetch();

		// echo $validation;
	 if($validation==false){

			echo '{"result":0,"message":"User not found."}';

	 }
	 else{
		 echo json_encode($validation);
	 }
	}


/**
 * This function prepares a transaction local to easysave_account to easysave_account. First steps are to receive the details between the two endpoints
 * That is, the userId and the merchantID. Next is to explode the transaction through explodeTransaction.
 * This function actually sends the funds.
 * The function continues on to add the transaction to the database for records.
 * [PLACE MOBILE MONEY ON BANK ACCOUNT OVERLAY HERE IF REQUIRED BUT RECOMMEND SEPARATE FUNCTION AS ITS A CASH IN/ CASHOUT]
 * @return [type] [description]
 */


  function prepareTransaction()
  {

    $merchantid = $_REQUEST['merchantid'];
    $merchantname = $_REQUEST['merchantname'];
    $merchantamount = $_REQUEST['merchantamount'];
    $userid = $_REQUEST['userid'];

    include("transactions.php");
		include_once("easysave.php");
		$obj = new easysave();

		$balance = $obj->getBalance($merchantid);

		if($balance==false){

			echo '{"result":0,"message":Transaction failed"}';
		}
		else{
			$balance=$obj->fetch();
			$newmerchantbalance=$balance['balance'];
		}

		$balance = $obj->getBalance($userid);

		if($balance==false){

			echo '{"result":0,"message":Transaction failed"}';
		}
		else{
			$balance=$obj->fetch();
			$newcustomerbalance=$balance['balance'];
		}


    $transaction = new transactions();

    explodeTransaction($merchantid, $userid, $merchantamount);

    $validation = $transaction->addTransaction($merchantid, $userid, $merchantamount,$newmerchantbalance,$newcustomerbalance);

    if($validation==false){

       echo '{"result":0,"message":"Transaction failed"}';

    }
    else{
        echo '{"result":1,"message":"Transaction created Successfully"}';
    }



  }


/**
 * This function to meant to credit and debit from 2 easysave_accounts.
 * @param  [int] $merchantid     [gets the id from the merchant who generated the QR code and enters the amount]
 * @param  [int] $userid         [gets the id from the user who  points the QR code reader at the merchants generated code]
 * @param  [int] $merchantamount [gets the amount form the QR code]
 * @return [type]                 [null]
 */
  function explodeTransaction($merchantid, $userid, $merchantamount)
  {
		include_once("easysave.php");

     $obj = new easysave();


	 	$balance = $obj->getBalance($merchantid);

		if($balance==false){

			echo '{"result":0,"message":Transaction failed"}';
		}
		else{

			$balance=$obj->fetch();


			$merchantDeduct = $obj ->easysaveAccountDeduct($merchantid,$merchantamount, $balance['balance']);
			if($merchantDeduct==false){
				echo '{"result":0,"message":Transaction failed"}';

			}else{
				$balance = $obj->getBalance($userid);
				if($balance==false){
						echo '{"result":0,"message":Transaction failed"}';
				}else{
					$balance=$obj->fetch();


					$customerCredit = $obj ->easysaveAccountCredit($userid,$merchantamount, $balance['balance']);
					if($customerCredit==false){
						echo '{"result":0,"message":Transaction failed"}';
					}
						else{

						}
				}
			}
		}
				//update merchant balance to deduct the amount from QR code






  }



	function addNewUser(){
			$accountname="";
			$accountnumber="";
			$accountbranch="";
			$bankname="";
			$mmnumber="";
			$network="";
			$mmname="";

			if(!isset($_REQUEST['email'])){
				echo '{"result":0,"message":"No user email. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['firstname'])){
				echo '{"result":0,"message":"No user firstname. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['lastname'])){
				echo '{"result":0,"message":"No user lastname. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['dob'])){
				echo '{"result":0,"message":"No user date of birth. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['gender'])){
				echo '{"result":0,"message":"No user gender. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['password'])){
				echo '{"result":0,"message":"No user password. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['phonenumber'])){
				echo '{"result":0,"message":"No user phonenumber. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['account_status'])){
				echo '{"result":0,"message":"Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['type'])){
				echo '{"result":0,"message":"Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['idtype'])){
				echo '{"result":0,"message":"No ID type. Failed to sign up."}';
				return;
			}
			if(!isset($_REQUEST['idnumber'])){
				echo '{"result":0,"message":"No ID number. Failed to sign up."}';
				return;
			}

			if($_REQUEST['email']==""){
				echo '{"result":0,"message":"No user email. Failed to sign up."}';
				return;
			}
			if($_REQUEST['firstname']==""){
				echo '{"result":0,"message":"No user firstname. Failed to sign up."}';
				return;
			}
			if($_REQUEST['lastname']==""){
				echo '{"result":0,"message":"No user lastname. Failed to sign up."}';
				return;
			}
			if($_REQUEST['dob']==""){
				echo '{"result":0,"message":"No user date of birth. Failed to sign up."}';
				return;
			}
			if($_REQUEST['gender']==""){
				echo '{"result":0,"message":"No user gender. Failed to sign up."}';
				return;
			}
			if($_REQUEST['password']==""){
				echo '{"result":0,"message":"No user password. Failed to sign up."}';
				return;
			}
			if($_REQUEST['phonenumber']==""){
				echo '{"result":0,"message":"No user phone number. Failed to sign up."}';
				return;
			}
			if($_REQUEST['account_status']==""){
				echo '{"result":0,"message":"Failed to sign up."}';
				return;
			}
			if($_REQUEST['type']==""){
				echo '{"result":0,"message":"Failed to sign up."}';
				return;
			}
			if($_REQUEST['idtype']==""){
				echo '{"result":0,"message":"No ID type. Failed to sign up."}';
				return;
			}
			if($_REQUEST['idnumber']==""){
				echo '{"result":0,"message":"No ID number. Failed to sign up."}';
				return;
			}




			if((!($_REQUEST['accountnumber']==""))&&(!($_REQUEST['mmnumber']==""))) {
				echo '{"result":0,"message":"No account added. Add a bank account or/and mobile money number. Failed to sign up."}';
				return;
			}

			if(!($_REQUEST['accountnumber']=="")){
				if(!isset($_REQUEST['accountname'])){
					echo '{"result":0,"message":"No bank account name. Failed to sign up."}';
					return;
				}
				if(!isset($_REQUEST['accountbranch'])){
					echo '{"result":0,"message":"No bank account branch. Failed to sign up."}';
					return;
				}
				if(!isset($_REQUEST['bankname'])){
					echo '{"result":0,"message":"No bank name. Failed to sign up."}';
					return;
				}

				if($_REQUEST['accountname']==""){
					echo '{"result":0,"message":"No bank account name. Failed to sign up."}';
					return;
				}
				if($_REQUEST['accountbranch']==""){
					echo '{"result":0,"message":"No bank account branch. Failed to sign up."}';
					return;
				}
				if($_REQUEST['bankname']==""){
					echo '{"result":0,"message":"No bank name. Failed to sign up."}';
					return;
				}
				$accountname=$_REQUEST['accountname'];
				$accountnumber=$_REQUEST['accountnumber'];
				$accountbranch=$_REQUEST['accountbranch'];
				$bankname=$_REQUEST['bankname'];


			}
			if(!($_REQUEST['mmnumber']=="")){
				if(!isset($_REQUEST['network'])){
					echo '{"result":0,"message":"No network. Failed to sign up."}';
					return;
				}
				if($_REQUEST['network']==""){
					echo '{"result":0,"message":"No network. Failed to sign up."}';
					return;
				}
				if(!isset($_REQUEST['mmname'])){
					echo '{"result":0,"message":"No account name. Failed to sign up."}';
					return;
				}
				if($_REQUEST['mmname']==""){
					echo '{"result":0,"message":"No account name. Failed to sign up."}';
					return;
				}
				$mmnumber=$_REQUEST['mmnumber'];
				$network=$_REQUEST['network'];
				$mmname=$_REQUEST['mmname'];

			}






			$firstname=$_REQUEST['firstname'];
			$lastname=$_REQUEST['lastname'];
			$email=$_REQUEST['email'];
			$password=$_REQUEST['password'];
			$dob=$_REQUEST['dob'];
			$gender=$_REQUEST['gender'];
			$phonenumber=$_REQUEST['phonenumber'];
			$account_status=$_REQUEST['account_status'];
			$type=$_REQUEST['type'];
			$idtype=$_REQUEST['idtype'];
			$idnumber=$_REQUEST['idnumber'];


			include_once('easysave.php');
			include('users.php');
			$obj=new users();
			$row=$obj->addNewUser($firstname,$lastname,$email,$password,$phonenumber,$gender, $dob, $account_status, $type,$accountname,$accountnumber,$accountbranch, $bankname,$mmnumber, $network, $idtype, $idnumber, $mmname);

			if($row==true){
				$row=$obj->getID($email, $password);
				$row=$obj->fetch();
				if($row==false){
					echo '{"result":0,"message":"Failed to sign up"}';
				}else{
					$obj=new easysave();
					$row=$obj->addeasysaveaccount($row['user_id']);
					if($row==true){
						echo '{"result":1,"message":"Sign up successful"}';
					}
			}
		}


			else{
			echo '{"result":0,"message":"Failed to sign up"}';
			}
	}


	function getTransactions(){


		include("transactions.php");
		$transaction = new transactions();

		if(isset($_REQUEST['id'])){
			$id=$_REQUEST['id'];
			$list = $transaction->getTransactionsById($id);
			if($list==true){
					$list=$transaction->fetch();
					echo '{"result":1,"transactions":[';
					while($list){
						echo json_encode($list);
						$list=$transaction->fetch();
						if($list!=false){
							echo ",";
						}
					}
				echo "]}";
			}
		}
		else{
				echo '{"result":0,"message":"Error fetching transactions."}';
		}

	}

	function getTransfers(){


		include("transactions.php");
		$transaction = new transactions();

		if(isset($_REQUEST['id'])){
			$id=$_REQUEST['id'];
			$list = $transaction->getTransfersById($id);
			if($list==true){
					$list=$transaction->fetch();
					echo '{"result":1,"transactions":[';
					while($list){
						echo json_encode($list);
						$list=$transaction->fetch();
						if($list!=false){
							echo ",";
						}
					}
				echo "]}";
			}
		}
		else{
				echo '{"result":0,"message":"Error fetching transfers."}';
		}

	}

	function getBalance(){
		include("easysave.php");
		$transaction = new easysave();

		if(isset($_REQUEST['id'])){
			$id=$_REQUEST['id'];
			$list = $transaction->getBalance($id);
			if($list==true){
						$list=$transaction->fetch();
						echo json_encode($list);
			}else{
				echo '{"result":0,"message":"Error fetching balance."}';
			}
		}
		else{
				echo '{"result":0,"message":"Error fetching balance."}';
		}
	}

	function updateCashout(){
		if(!isset($_REQUEST['cashoutamt'])){
			echo '{"result":0,"message":"Failed to update cashout amount."}';
			return;
		}

		if($_REQUEST['cashoutamt']==""){
			echo '{"result":0,"message":"No cashout amount."}';
			return;
		}
		$id=$_REQUEST['id'];
		$cashoutamt=$_REQUEST['cashoutamt'];


		include('easysave.php');
		$obj=new easysave();
		$row=$obj->updateCashout($id, $cashoutamt);

		if($row==true){
		echo '{"result":1,"message":"Update successful"}';
		}

		else{
		echo '{"result":0,"message":"Failed to update cashout amount"}';
		}
	}


	function addAccount(){

		if(!isset($_REQUEST['accountname'])){
			echo '{"result":0,"message":"No account name. Failed to add account."}';
			return;
		}
		if(!isset($_REQUEST['accountnumber'])){
			echo '{"result":0,"message":"No account number. Failed to add account."}';
			return;
		}
		if(!isset($_REQUEST['accountbranch'])){
			echo '{"result":0,"message":"No account branch. Failed to add account."}';
			return;
		}
		if(!isset($_REQUEST['bankname'])){
			echo '{"result":0,"message":"No bank name. Failed to add account."}';
			return;
		}


		if($_REQUEST['accountname']==""){
			echo '{"result":0,"message":"No account name. Failed to add account."}';
			return;
		}
		if($_REQUEST['accountnumber']==""){
			echo '{"result":0,"message":"No account number. Failed to add account."}';
			return;
		}
		if($_REQUEST['accountbranch']==""){
			echo '{"result":0,"message":"No account branch. Failed to add account."}';
			return;
		}
		if($_REQUEST['bankname']==""){
			echo '{"result":0,"message":"No bank name. Failed to add account."}';
			return;
		}

		$id=$_REQUEST['id'];
		$accountname=$_REQUEST['accountname'];
		$accountnumber=$_REQUEST['accountnumber'];
		$accountbranch=$_REQUEST['accountbranch'];
		$bankname=$_REQUEST['bankname'];


		include('easysave.php');
		$obj=new easysave();
		$row=$obj->addAccount($id, $accountname, $accountnumber, $accountbranch, $bankname);

		if($row==true){
			//echo '{"result":1,"message":"Account added"}';
			$list = $obj->getBankAccountDetails($id);
			if($list==true){
					$list=$obj->fetch();
					echo '{"result":1,"bank_account":[';
					while($list){
						echo json_encode($list);
						$list=$obj->fetch();
						if($list!=false){
							echo ",";
						}
					}
				echo "]}";
			}



		}

		else{
			echo '{"result":0,"message":"Failed to add account. "}';
		}

	}

	function getAccounts(){
		include('easysave.php');
		$obj=new easysave();

		if(isset($_REQUEST['id'])){
			$id=$_REQUEST['id'];
			$list = $obj->getBankAccountDetails($id);;
			if($list==true){
					$list=$obj->fetch();
					echo '{"result":1,"bank_account":[';
					while($list){
						echo json_encode($list);
						$list=$obj->fetch();
						if($list!=false){
							echo ",";
						}
					}
				echo "]}";
			}
		}
		else{
				echo '{"result":0,"message":"Error fetching accounts."}';
		}
	}


	function sendsms(){


		if(!isset($_REQUEST['smscode'])){
			echo '{"result":0,"message":"No code entered."}';
			return;
		}
		if(!isset($_REQUEST['phonenumber'])){
			echo '{"result":0,"message":"No phone number entered.}';
			return;
		}

		if($_REQUEST['smscode']==""){
			echo '{"result":0,"message":"No code entered."}';
			return;
		}
		if($_REQUEST['phonenumber']==""){
			echo '{"result":0,"message":"No phone number entered.}';
			return;
		}
		$smscode=$_REQUEST['smscode'];
		$phonenumber=$_REQUEST['phonenumber'];

		include 'sites/Hubtel/Api.php';
		require './vendor/autoload.php';

		$auth = new BasicAuth("videkyxo", "widmeweg");

		// instance of ApiHost
		$apiHost = new ApiHost($auth);

		// instance of AccountApi
		$accountApi = new AccountApi($apiHost);

		// set web console logging to false
		$disableConsoleLogging = false;

		// Let us try to send some message
		$messagingApi = new MessagingApi($apiHost, $disableConsoleLogging);
		try {
			// Send a quick message
			$messageResponse = $messagingApi->sendQuickMessage("EasySave",$phonenumber, $smscode." is your verification code for EasySave.");


			if ($messageResponse instanceof MessageResponse) {
					echo '{"result":1,"message":"'. $messageResponse->getStatus().'"}';
			} elseif ($messageResponse instanceof HttpResponse) {
					echo  '{"result":0,"message":"'. "\nServer Response Status : " . $messageResponse->getStatus().'"}';
			}
		} catch (Exception $ex) {
			echo '{"result":0,"message":"'.$ex->getTraceAsString().'"}';
		}

	}






?>
