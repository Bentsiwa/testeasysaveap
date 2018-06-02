<?php
$callback_obj = file_get_contents("php://input");
						// log the callback response to file on your server

            $json = json_decode($callback_obj, true);

           	$value= $json['ResponseCode'];

              if($value=='0000'){


              include_once("easysave.php");
    					$obj = new easysave();
              if(!isset($_REQUEST['id'])){
                echo '{"result":0,"message":"User ID not found"}';
                return;
              }
              if($_REQUEST['id']==""){
                echo '{"result":0,"message":"User ID not found.}';
                return;
              }
              if(!isset($_REQUEST['money'])){
                echo '{"result":0,"message":"Amount not entered."}';
                return;
              }
              if($_REQUEST['money']==""){
                echo '{"result":0,"message":"Amount not entered.}';
                return;
              }
              $id=$_REQUEST['id'];
							//$id=113;
						//	$money=0.1;
              $money=$_REQUEST['money'];
							$money=$money*1.01;

    					$balance = $obj->getBalance($id);

    					if($balance==false){

    						echo '{"result":0,"message":Request failed"}';
    					}
    					else{
    						$balance=$obj->fetch();
    						$customerCredit = $obj ->easysaveAccountCredit($id,$money, $balance['balance']);
    						if($customerCredit==false){
    							echo '{"result":0,"message":Request failed"}';
    						}
    							else{
    									echo '{"result":1,"message":Request successful"}';
                      //header('Location: ./dashboard.html');
    							}
    					}

             }else{

             }

						 $log_file = fopen("log-callback.txt", "a") or die("Unable to open file!");
						 //$callback_obj="test";
						 fwrite($log_file,"$callback_obj");
						 fclose($log_file);
						 exit();

?>
