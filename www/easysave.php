<?php
include_once("adb.php");

	class easysave extends adb
	{

		/**
		* Creates a new constructor of the class
		*/


    /**
     * debit a source easy save account
     * @param  [int] $id     [passed in user ID - use to fetch the easy save account balance]
     * @param  [int] $amount [passed in amount - all params under this function are fetched from the QR code. Perform fattening to execute easysave to easy save transaction]
     * @return [type]         [return query detail]
     */
		function easysaveAccountDeduct($id,$amount, $balance){
			$oldbalance=$balance;

      $newbalance = $oldbalance - $amount;

			$strQuery = "update easysave_account set balance='$newbalance' where user_id='$id' ";

      return $this->query($strQuery);
		}

/**
 * credit a detination easy save account
 * @param  [int] $id     [passed in user ID - use to fetch the easy save account balance]
 * @param  [int] $amount [passed in amount - all params under this function are fetched from the QR code. Perform fattening to execute easysave to easy save transaction]
 * @return [type]         [return query detail]
 */
    function easysaveAccountCredit($id,$amount, $balance){

    	$oldbalance=$balance;

      $newbalance = $oldbalance + $amount;

			$strQuery = "update easysave_account set balance='$newbalance' where user_id='$id' ";

			return $this->query($strQuery);
		}

    /*
    Fetch details of the users easy save account as a while
     */
		function getAccount($id){
			$strQuery="select * from easysave_account where user_id='$id'";

			return $this->query($strQuery);
		}

		/**
		* get easysave_account balance
		* @param userid utilize the users ID to find their easy save account balance
		*/
		function getBalance($userid){

			$strQuery="select balance from easysave_account where user_id = '$userid'";

			return $this->query($strQuery);
		}


		function updateCashout($userid, $cashoutamt){
			$strQuery="update user set cashout_amount=$cashoutamt where user_id='$userid' ";

			return $this->query($strQuery);
		}

		function addAccount($id, $accountname, $accountnumber, $accountbranch, $bankname){
			$strQuery="insert into bank_account set
							user_id='$id',
							account_number='$accountnumber',
							account_name='$accountname',
							bank_name='$bankname',
							bank_branch='$accountbranch'";

			return $this->query($strQuery);
		}

		function getBankAccountDetails($id){
			$strQuery="select * from user where user_id='$id'";
			return $this->query($strQuery);
		}

		function addeasysaveaccount($id){
			$strQuery="insert into easysave_account set
							user_id='$id',
							balance=0.00";
			return $this->query($strQuery);
		}

		function resetBalance($userid, $amount){
			$strQuery="update easysave_account set balance=$amount where user_id='$userid'";

			return $this->query($strQuery);
		}

	}
?>
