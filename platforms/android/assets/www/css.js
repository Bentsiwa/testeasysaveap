sessionStorage.logoutCount= 0;
sessionStorage.currentPage=".dashboard";
//CSS Animations
//Index Page
$(".ti-power-off").click(function(){
    var options = {
        settings: {
            duration: 1000
        }
    };
    if(sessionStorage.logoutCount== 1){
        iqwerty.toast.Toast('Loggin Out...');
        sessionStorage.clear();

            window.location="index.html";

    }
    if(sessionStorage.logoutCount== 0){
        sessionStorage.logoutCount= 1;
        iqwerty.toast.Toast('Press Again to Logout',options);
    }
    setTimeout(function() {
        sessionStorage.logoutCount= 0;
    }, 10000);
});

$(".login-pop").click(function(){

    $(".login-panel").slideToggle();
    $(".login-pop").hide();
    $(".fa").removeClass("fa-chevron-up");
    $(".fa").addClass("fa-chevron-down");
    $(".uk-form").hide();
    $(".vertical-align-wrapsign").hide();
});

$(".panel-hide").click(function(){
    $(".login-panel").slideToggle();
    $(".login-pop").fadeIn();
    $(".fa").removeClass("fa-chevron-down");
    $(".fa").addClass("fa-chevron-up");
});

$(".signpanel-btn").click(function(){
    $(".signup-panel").slideToggle();
    $(".login-panel").slideToggle();
    $(".user-type-panel").fadeIn(800);
    $(".user-type-panel").css("display","inline-block");
    $(".sign-fa").removeClass("fa-chevron-up");
    $(".sign-fa").removeClass("fa-chevron-left");
    $(".sign-fa").addClass("fa-chevron-down");
    $(".vertical-align-wrap").hide();
    $(".vertical-align-wrapsign").hide();
});

$(".signup-panel-hide").click(function(){
    $(".user-type-panel").fadeOut(300);
    $(".signup-panel").slideToggle();
    $(".login-panel").slideToggle();
    $(".signup-form").fadeOut(100);
    $(".verification-form").hide();
    $(".accoutdetails-form").hide();
    $(".signup-form").hide();
    $(".sign-fa").removeClass("fa-chevron-up");
    $(".sign-fa").removeClass("fa-chevron-left");
    $(".sign-fa").addClass("fa-chevron-down");
    $(".input").val("");
    $(".vertical-align-wrap").show();
    $(".vertical-align-wrapsign").show();

});

$(".type-merchant").click(function(){
    type='merchant';
  //  $(".confirmationbtn").hide();
    $(".user-type-panel").hide();
    $(".signup-form").fadeIn(600);
    $(".signup-form").css("display","inline-block");
    $(".sign-fa").removeClass("fa-chevron-down");
    $(".sign-fa").addClass("fa-chevron-left");
});
var type;
$(".type-customer").click(function(){
  type='customer';
  //  $(".confirmationbtn").hide();
    $(".user-type-panel").hide();
    $(".signup-form").fadeIn(600);
    $(".signup-form").css("display","inline-block");
    $(".sign-fa").removeClass("fa-chevron-down");
    $(".sign-fa").addClass("fa-chevron-left");
});

$(".back").click(function(){
    $(".signup-form").fadeIn(600);
    $(".verification-form").hide();
    $(".sign-fa").addClass("fa-chevron-left");
    $(".sign-fa").removeClass("fa-close");
});



$(".code-back").click(function(){
    $(".verification-form").fadeIn(600);
    $(".code-form").hide();
});

var phonenumber;
var code;

$(".confirm").click(function(){
    //get phonenumber
    phonenumber="0"+ $("#phonenumber").val();
    if(phonenumber.length<9 ||phonenumber.length>10){
      UIkit.modal.alert('<p class="uk-modal-body">Invalid phone number.</p>');
      return false;
    }else{
      getUserWithPhoneNumber();

    }


});

$(".confirm-code ").click(function(){


});


$(".signup-btn").click(function(){

  if(validateForm()==false){

  }else{

      var originialpassword = $('#signuppassword').val();
      var confirmationpassword= $('#signupconfpassword').val();


      if(originialpassword==confirmationpassword){

        $(".signup-form").hide();
        $(".verification-form").fadeIn(600);
        $(".sign-fa").removeClass("fa-chevron-left");
        $(".sign-fa").addClass("fa-close");
      }else{

        UIkit.modal.alert('<p class="uk-modal-body">!The specified passwords do not match.</p>');
        //$(".confirmationbtn").show();


      }
    }
});

$(".addaccount-form").click(function(){
  var smscode=$('#smscode').val();



  if(smscode==code){

    $(".info-modal-info").html("ADD ACCOUNT");
    $(".info-modal-content").html('<div class="account-container"><span  onclick="showBankCard()"class=" btn"><div class="img-holder"><img src="sites/images/bank.png"><p class="type-merchant">BANK ACCOUNT</p></div></span><span onclick="showMMCard()" class="btn"><div class="img-holder"><img src="sites/images/mobile.png"><p class="type-merchant">MOBILE MONEY </p></div></span><span class="modal-info" id="" >'
                                  +'</span>'
                                  +'<span  class="bankcard" ><input type="text" id="accountname" placeholder="Account Name">'
                                  +'<input type="number" id="accountnumber" placeholder="Account Number">'
                                  +'<input type="text" id="bankname" placeholder="Bank Name">'
                                  +'<input type="text" id="accountbranch" placeholder="Branch">'
                                  +'<br></span>'
                                  +'<span  class="mmcard" ><input type="text" id="mmnumber" placeholder="Mobile Money Number">'
                                  +'<select id="network" class="input" placeholder="Network">'
                    							+'<option disabled value="" >Network</option>'
                    							+'<option value="MTN" >MTN</option>'
                    							+'<option value="Vodafone" >Vodafone</option>'
                    							+'<option value="Airtel_Tigo" >Airtel Tigo</option>'
                    							+'<option value="Glo" >Glo</option>'
                    							+'</select><input type="text" id="mmname" placeholder="Account Name"></span>'
                                  +'<br><div class="btn-panel"><span class="cashout-btn btn" onclick="signUp()">Add</span><span onclick="account_back()" class="number-btn  account-back btn">Back</span></div></div>');
    $(".info-cover").fadeIn();
    $(".info-modal-div").fadeIn();
    $(".info-modal").fadeIn(600);


    $(".code-form").hide()
}else{

  UIkit.modal.alert('<p class="uk-modal-body">Wrong code entered.</p>');
}
});

$(".close-btn").click(function(){
  $(".modal").fadeOut();
  $(".cover").fadeOut();
  $(".modal-div").fadeOut();
});

// $(".login-btn").click(function(){
//     iqwerty.toast.Toast('Loggin In...');
//     console.log($('.homeUsername').val());
//     // setTimeout(function() {
//     //     window.location="Pages/dashboard.html";
//     // }, 3000);
// });

/* to display any information just put this snippet wherever you want some displaying to be done*/

//iqwerty.toast.Toast('Your message here');


//Dashboard Page
$(".info-down").click(function(){
    $(".cover").fadeIn();
    $(".modal-div").fadeIn();
    $(".modal").fadeIn(600);
});

$(".ti-share").click(function(){
    $(".info-modal-info").html("AUTOMATIC CASHOUT");
    $(".info-modal-content").html('<span class="modal-info">We can automate cash outs to your primary account.'
                                  +' Please let us know at what available balance this should occur. </span>'
                                  +'<input type="number" id="cashout" placeholder="GHS '+sessionStorage.cashoutamt+'">'
                                  +'<div onClick="updateCashout()" class="cashout-btn btn" >Cashout</div>');
    $(".info-cover").fadeIn();
    $(".info-modal-div").fadeIn();
    $(".info-modal").fadeIn(600);
});

$(".modal-close").click(function(){
    $(".modal").fadeOut();
    $(".cover").fadeOut();
    $(".modal-div").fadeOut();
});

$(".ti-home").click(function(){
    $( "#transfers" ).hide();
    $( "#transactions" ).show();
    $( ".cashout" ).hide();
    if( $( ".dashboard" ).css("display")=="none"){
        $( ".dashboard" ).fadeIn(600);
    }
    $(".ti-wallet").removeClass("active");
    $(".ti-export").removeClass("active");
    $(".ti-home").addClass("active");
    sessionStorage.currentPage=".dashboard";
});


$(".ti-settings").click(function(){
    $( ".dashboard" ).hide();
    if( $( ".settings" ).css("display")=="none"){
        $(sessionStorage.currentPage).hide();
        $( ".settings" ).fadeIn(600);
    }
});

$(".ti-wallet").click(function(){
    $( ".dashboard" ).hide();
    if( $( ".cashout" ).css("display")=="none"){
        $( ".cashout" ).fadeIn(600);
    }
    $(".ti-home").removeClass("active");
    $(".ti-export").removeClass("active");
    $(".ti-wallet").addClass("active");
    sessionStorage.currentPage=".cashout";
});

$(".ti-export").click(function(){
    $( "#transactions" ).hide();
    $( "#transfers" ).show();
    $( ".cashout" ).hide();
    if( $( ".dashboard" ).css("display")=="none"){
        $( ".dashboard" ).fadeIn(600);
    }
    $(".ti-wallet").removeClass("active");
    $(".ti-home").removeClass("active");
    $(".ti-export").addClass("active");
    sessionStorage.currentPage=".dashboard";
});

$(".ti-close").click(function(){
    $(".info-cover").fadeOut();
    $(".info-modal-div").fadeOut();
    $(".info-modal").fadeOut();

});

$("#showsignupbtn").click(function(){
    $(".vertical-align-wrapsign").show();
});

$(".ti-arrow-left").click(function(){
    $( ".settings" ).hide();
    if( $( sessionStorage.currentPage).css("display")=="none"){
        $( sessionStorage.currentPage ).fadeIn(600);
    }
});


//
// $('input[type="checkbox"]').click(function(){
//   $('input[type="checkbox"]').prop("checked", false);
//   console.log(this);
//   $(this).prop("checked", true);
//   var selectedcheckbox=this.value;
//   console.log(selectedcheckbox);
// });


function selected_account(checkedbox){

  $('input[type="checkbox"]').prop("checked", false);
  $(checkedbox).prop("checked", true);
  var selectedcheckbox=checkedbox.value;
  sessionStorage.loggedAccountType = selectedcheckbox;

}


// selected_account=function(checkedbox){
//   $(checkedbox).prop("checked", false);
//   $(checkedbox).prop("checked", true);
//   var selectedcheckbox=checkedbox.value;
//   console.log(selectedcheckbox);
// }

// $(".ti-plus").click(function(){
//     $(".info-modal-info").html("ADD ACCOUNT");
//     $(".info-modal-content").html('<span class="modal-info">Add a new account to your current ones.'
//                                   +'This account is however not your primary account</span>'
//                                   +'<input type="text" id="accountname" placeholder="Account Name">'
//                                   +'<input type="number" id="accountnumber" placeholder="Account Number">'
//                                   +'<input type="text" id="bankname" placeholder="Bank Name">'
//                                   +'<input type="text" id="accountbranch" placeholder="Branch">'
//                                   +'<div class="cashout-btn btn" onclick="addAccount()">Add</div>');
//     $(".info-cover").fadeIn();
//     $(".info-modal-div").fadeIn();
//     $(".info-modal").fadeIn(600);
// });



/**
 * This is the function that pops up a barcode reader when the client/customer logs into their dashboard. Here, once they point their
 * camera at the QR code, the train of logic is to execute the transaction.
 * @return {[type]} [description]
 */

(function() {

//barcode scanner

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	function onDeviceReady() {


		document.getElementById("barcodeScanner").onclick = function(){

			cordova.plugins.barcodeScanner.scan(
		 function (result) {

       //split items separated by : once the QR code is caught.
       var fundsFrom = result.text.split(":");


       //The php script here adds the transaction to records and executes a function explode which does the deductions to the easysave_accounts
       var theUrl="http://easysavegh.com/databasecommand.php?cmd=4&merchantid="+fundsFrom[0]+"&merchantname="+fundsFrom[1]+"&merchantamount="+fundsFrom[2]+"&userid="+sessionStorage.loggedID+"&username="+sessionStorage.loggedName;

       $.ajax(theUrl,
             {
               async:true,
               complete:barcodeComplete
             });

             //
             // alert('We got a barcode\n' +
   						// 	 'Result: ' + result.text + '\n' +
   						// 	 'Format: ' + result.format + '\n' +
   						// 	 'Cancelled: ' + result.cancelled);

              getBalance();
		 },
		 function (error) {
				  alert('Scanning failed.');
		 },
		 {
				 "preferFrontCamera" : true, // iOS and Android
				 "showFlipCameraButton" : true, // iOS and Android
				 "prompt" : "Place a barcode inside the scan area", // supported on Android only
				 "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				 "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
		 }
	);



	}
	} ;

	})();

function account_back(){

    $(".info-modal-div").hide();
    $(".code-form").fadeIn(600);
    $(".sign-fa").removeClass("fa-chevron-left");
    $(".sign-fa").addClass("fa-close");
}

function showBankCard(){

  $('.mmcard').hide();
  $('.bankcard').stop().slideUp();
  $('.bankcard').delay(300).slideDown();
}
function showMMCard(){

  $('.bankcard').hide();
  $('.mmcard').stop().slideUp();
  $('.mmcard').delay(300).slideDown();
}
function barcodeComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error transfering amount.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);


    if(obj.result==0){
      UIkit.modal.alert('<p class="uk-modal-body">Error transfering amount</p>');
    }

    else{

      alert("Transfer successful");
    }
  }
}

function sendsms(thecode, phonenumber){


  var theUrl="http://easysavegh.com/databasecommand.php?cmd=13&smscode="+thecode+"&phonenumber="+phonenumber;

  $.ajax(theUrl,
        {
          async:true,
          complete:sendsmsComplete
        });

}

function sendsmsComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error sending message.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);


    if(obj.result==0){
      UIkit.modal.alert('<p class="uk-modal-body">Error sending message</p>');
    }

    else{


    }
  }
}


  /**
   * This function is called when a user logs in as a merchant.
   * We pull the data from the textfield and pass it through a phpURL
   * to execute on the backend. The reason for this is that we intended to use cordova/phonegap.
   * As such AJAX is required otherwise phonegap/cordova doesnt work as smoothly.
   * @return {[type]} [description]
   */
function loginMerchant(){
  var username = $('#homeUsername').val();
  var password = $('#homePassword').val();

  iqwerty.toast.Toast('Loggin In...');

  var theUrl="http://easysavegh.com/databasecommand.php?cmd=1&email="+username+"&password="+password;
  $.ajax(theUrl,
        {
          async:true,
          complete:loginMerchantComplete
        });
}



function loginMerchantComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error during log in.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);
    console.log(obj);

    if(obj.result==0){
      UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }

    else{

      sessionStorage.loggedID = obj.user_id;
      sessionStorage.loggedName = obj.firstname+" "+obj.lastname;


      sessionStorage.loggedAccountType = "bank";
      window.location="dashboard.html";

    }
  }

}

function getUserWithPhoneNumber(){

  phonenumber="0"+ $("#phonenumber").val();
  var theUrl="http://easysavegh.com/databasecommand.php?cmd=11&phonenumber="+phonenumber;

  $.ajax(theUrl,
        {
          async:true,
          complete:getUserWithPhoneNumberComplete
        });
}

function getUserWithPhoneNumberComplete(xhr,status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error during sign in.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);
    console.log(obj);


    if(obj.result==0){
      if(obj.message=="User not found."){


        //generate Code
        code= Math.random().toString(36).substring(7);
        console.log(code);

        //send code via sms for confirmation

        sendsms(code , phonenumber);

        //code form
        $(".code-form").fadeIn(600);
        $(".verification-form").hide();
        $(".sign-fa").removeClass("fa-chevron-left");
        $(".sign-fa").addClass("fa-close");


      }else{
          UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');

      }

    }

    else {
        UIkit.modal.alert('<p class="uk-modal-body">This phone number has already been registered.</p>');


    }
  }
}

/**
 * This function is called when a user logs in as a customer.
 * We pull the data from the textfield and pass it through a phpURL
 * to execute on the backend. The reason for this is that we intended to use cordova/phonegap.
 * As such AJAX is required otherwise phonegap/cordova doesnt work as smoothly.
 * @return {[type]} [description]
 */
function loginCustomer(){
  var username = $('#homeUsername').val();
  var password = $('#homePassword').val();
  iqwerty.toast.Toast('Loggin In...');
  var theUrl="http://easysavegh.com/databasecommand.php?cmd=2&email="+username+"&password="+password;
  $.ajax(theUrl,
        {
          async:true,
          complete:loginCustomerComplete
        });
}

/**
 * This is the function that calls onComplete of a CustomerLogin, once it is successful. The app proceeds to log in to the client side of the dashboard
 */
function loginCustomerComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error during log in.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);

    if(obj.result==0){
      UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }

    else{
      sessionStorage.loggedID = obj.user_id;
      sessionStorage.loggedName = obj.firstname+" "+obj.lastname;
      sessionStorage.cashoutamt=obj.cashout_amount;


      sessionStorage.loggedAccountType = "bank";
      window.location="client-dashboard.html";

    }

  }
}

function validateForm(){
    var emailfilter = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    var idnumberfilter=/[0-9]/;
    var passwordfilter=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    var email = $('#signupemail').val();
    var firstname = $('#signupfirstname').val();
    var lastname = $('#signuplastname').val();
    var dob = $('#signupdob').val();
    var gender = $('#signupgender').val();
    var password = $('#signuppassword').val();
    var idtype=$('#idtype').val();
    var idnumber=$('#idnumber').val();


    if (email==null || email==""){
			UIkit.modal.alert('<p class="uk-modal-body">Email is required.</p>');
			return false;
		}
		if (firstname==null || firstname ==""){
			UIkit.modal.alert('<p class="uk-modal-body">First name is required.</p>');
			return false;
		}
    if (lastname==null || lastname==""){
			UIkit.modal.alert('<p class="uk-modal-body">Last name is required.</p>');
			return false;
		}
		if (dob==null || dob == ""){
			UIkit.modal.alert('<p class="uk-modal-body">Date of birth is required.</p>');
			return false;
		}
    if (gender==null || gender==""){
			UIkit.modal.alert('<p class="uk-modal-body">Gender is required.</p>');
			return false;
		}
    if (gender=="GENDER"){
			UIkit.modal.alert('<p class="uk-modal-body">Gender is required.</p>');
			return false;
		}
    if (idtype==null || idtype==""){
      UIkit.modal.alert('<p class="uk-modal-body">ID type is required.</p>');
      return false;
    }
    if (idtype=="ID Type"){
      UIkit.modal.alert('<p class="uk-modal-body">ID type is required.</p>');
      return false;
    }
    if (idnumber==null || idnumber == ""){
      UIkit.modal.alert('<p class="uk-modal-body">ID number is required.</p>');
      return false;
    }
		if (password==null || password == ""){
			UIkit.modal.alert('<p class="uk-modal-body">Password is required.</p>');
			return false;
		}



		if (!idnumberfilter.test(idnumber)){
			  UIkit.modal.alert('<p class="uk-modal-body">Invalid ID number.</p>');
			return false;
		}
    if (!emailfilter.test(email)){
			  UIkit.modal.alert('<p class="uk-modal-body">Invalid email.</p>');
			return false;
		}
    if (!passwordfilter.test(password)){
        UIkit.modal.alert('<p class="uk-modal-body">Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.</p>');
      return false;
    }


}
function signUp(){

    iqwerty.toast.Toast('Sighin In...');
     if (($('#accountnumber').val()==null && $('#mmnumber').val()==null)|| ($('#accountnumber').val()=="" && $('#mmnumber').val()=="")||($('#accountnumber').val()==null && $('#mmnumber').val()=="")||$('#accountnumber').val()=="" && $('#mmnumber').val()==null){

              $(".info-modal-div").hide();
              $(".code-form").fadeIn(600);
              $(".sign-fa").removeClass("fa-chevron-left");
              $(".sign-fa").addClass("fa-close");
			UIkit.modal.alert('<p class="uk-modal-body">Add an account.</p>');
			return;
	}


      var email = $('#signupemail').val();
      var firstname = $('#signupfirstname').val();
      var lastname = $('#signuplastname').val();
      var dob = $('#signupdob').val();
      var gender = $('#signupgender').val();
      var password = $('#signuppassword').val();
      var status="Active";
      var accountname=$('#accountname').val();
      var accountnumber=$('#accountnumber').val();
      var accountbranch=$('#accountbranch').val();
      var bankname=$('#bankname').val();
      var mmnumber=$('#mmnumber').val();
      var network=$('#network').val();
      var idtype=$('#idtype').val();
      var idnumber=$('#idnumber').val();
      var mmname=$('#mmname').val();


      console.log(email);
      console.log(password);

      var theUrl="http://easysavegh.com/databasecommand.php?cmd=5&email="+email+"&firstname="+firstname+"&lastname="
                +lastname+"&dob="+dob+"&gender="+gender+"&password="+password+"&phonenumber="
                +phonenumber+"&account_status="+status+"&type="+type+"&accountname="+accountname+"&accountnumber="+accountnumber
                +"&accountbranch="+accountbranch+"&bankname="+bankname+"&mmnumber="+mmnumber+"&network="+network+"&idtype="+idtype
                +"&idnumber="+idnumber+"&mmname="+mmname;

      $.ajax(theUrl,
            {
              async:true,
              complete:signUpComplete
      });


}

function signUpComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error during sign in.</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);

    console.log(obj);

    if(obj.result==0){


      $(".info-modal-div").hide();
      $(".code-form").fadeIn(600);
      $(".sign-fa").removeClass("fa-chevron-left");
      $(".sign-fa").addClass("fa-close");
      UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');

    }
    else{

      $(".signup-panel").hide();

      $(".info-modal-div").hide();

      $(".login-panel").slideToggle();
      $(".login-pop").hide();
      $(".fa").removeClass("fa-chevron-up");
      $(".fa").addClass("fa-chevron-down");
      $(".uk-form").hide();


    }
  }
}

function getTransactions(){
    $("#transfers").hide();
    var id=sessionStorage.loggedID;

    var theUrl="http://easysavegh.com/databasecommand.php?cmd=6&id="+id;

    $.ajax(theUrl,
          {
            async:true,
            complete:getTransactionsComplete
    });

}

function getTransactionsComplete(xhr,status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error while fetching transactions.</p>');
      return;
  }else{
    var obj=JSON.parse(xhr.responseText);

    if(obj.result==0){
      //  UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
      transactions.innerHTML='<div><center><img class="addicon" src="sites/images/add.jpg" ><p id="infoforemptylist" class=" uk-text-muted uk-text-large">Save money!</p><div class="uk-text-muted">We are glad you joined us! <br>Let&apos;s start by saving.</div></center></div>';

    }
    else{
               var currenttime =  new Date();
               //var dt=timeStamp.toUTCString();

               var result="";
              var length=obj.transactions.length;

              if(length<=0){
                transactions.innerHTML='<div><center><img class="addicon" src="sites/images/add.jpg" ><p id="infoforemptylist" class=" uk-text-muted uk-text-large">Save money!</p><div class="uk-text-muted">We are glad you joined us! <br>Let&apos;s start by saving.</div></center></div>';


              }else{


                while(length>0){

                    var transaction_date=obj.transactions[length-1].transaction_date;

                    // Split timestamp into [ Y, M, D, h, m, s ]
                    var splitTime = transaction_date.split(/[- :]/);

                    // Apply each element to the Date function
                    var transactiondateSplit = new Date(Date.UTC(splitTime[0], splitTime[1]-1, splitTime[2], splitTime[3], splitTime[4], splitTime[5]));


                    var timeDifference=currenttime.getTime()-transactiondateSplit.getTime();


                    var realtime=timeDifference/1000;
                    if(realtime==1){
                      difference=Math.round(realtime)+" second ";
                    }
                    else if(realtime<61){
                      difference=Math.round(realtime)+" seconds ";

                    }
                    else{
                      var difference;
                      realtime=timeDifference/60000;
                      if(Math.round(realtime)==1){
                        difference=Math.round(realtime)+" minute ";
                      }
                      else if(realtime<61){
                        difference=Math.round(realtime)+" minutes ";
                      }else{
                        realtime=timeDifference/3600000;
                        if(Math.round(realtime)==1){
                          difference=Math.round(realtime)+" hour ";
                        }
                        else if(realtime<25){
                          difference=Math.round(realtime)+" hours ";

                        }else{
                          realtime=timeDifference/86400000;
                          if(Math.round(realtime)==1){
                            difference=Math.round(realtime)+" day ";
                          }
                          else if(realtime<29){
                            difference=Math.round(realtime)+" days ";
                          }
                          else{
                            realtime=timeDifference/604800000;
                            if(Math.round(realtime)==1){
                              difference=Math.round(realtime)+" week ";
                            }
                            else if(realtime<53){
                              difference=Math.round(realtime)+" weeks ";
                            }
                            else{
                              realtime=timeDifference/2628000000;
                              if(Math.round(realtime)==1){
                                difference=Math.round(realtime)+" month ";
                              }
                              else if(realtime<13){
                                difference=Math.round(realtime)+" months ";
                              }else{
                                realtime=timeDifference/31540000000;
                                if(Math.round(realtime)==1){
                                  difference=Math.round(realtime)+" year ";
                                }
                                else{
                                  difference=Math.round(realtime)+" years ";
                                }

                              }
                            }
                          }
                        }
                      }
                    }


                    result+="<div class='info-block'><div><div><i class='ti-user small-text'></i><span class='small-text' >"+obj.transactions[length-1].firstname+" "+obj.transactions[length-1].lastname+"</span><span class='time small-text'> "+ difference +"ago</span></div><p class='block'>"+obj.transactions[length-1].amount_sent+"<span class='deposit-icon'>Deposit</span></p><span class='reference-id'>Reference ID: GH2122939 </span></div><div class='stroke'></div></div>";

                    length-=1;
               }

               transactions.innerHTML=result;
             }
        }
  }
  getBalance();
  getTransfers();
}

function getTransfers(){

  var id=sessionStorage.loggedID;

  var theUrl="http://easysavegh.com/databasecommand.php?cmd=12&id="+id;

  $.ajax(theUrl,
        {
          async:true,
          complete:getTransfersComplete
  });


}



function getTransfersComplete(xhr,status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error while fetching transfers.</p>');
      return;
  }else{
    var obj=JSON.parse(xhr.responseText);

    if(obj.result==0){
      //UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }
    else{
               var currenttime =  new Date();
               //var dt=timeStamp.toUTCString();


               var result="";
                var length=obj.transactions.length;


                if(length<=0){
                  transfers.innerHTML='<center><img class="addicon" src="sites/images/add.jpg" ><p id="infoforemptylist" class=" uk-text-muted">No transfer has been made yet.</p><div class="uk-text-muted">Let&apos;s start saving!</div></center>';


                }else{

                while(length>0){

                    var transaction_date=obj.transactions[length-1].transaction_date;

                    // Split timestamp into [ Y, M, D, h, m, s ]
                    var splitTime = transaction_date.split(/[- :]/);

                    // Apply each element to the Date function
                    var transactiondateSplit = new Date(Date.UTC(splitTime[0], splitTime[1]-1, splitTime[2], splitTime[3], splitTime[4], splitTime[5]));


                    var timeDifference=currenttime.getTime()-transactiondateSplit.getTime();


                    var realtime=timeDifference/1000;
                    if(realtime==1){
                      difference=Math.round(realtime)+" second ";
                    }
                    else if(realtime<61){
                      difference=Math.round(realtime)+" seconds ";

                    }
                    else{
                      var difference;
                      realtime=timeDifference/60000;
                      if(Math.round(realtime)==1){
                        difference=Math.round(realtime)+" minute ";
                      }
                      else if(realtime<61){
                        difference=Math.round(realtime)+" minutes ";
                      }else{
                        realtime=timeDifference/3600000;
                        if(Math.round(realtime)==1){
                          difference=Math.round(realtime)+" hour ";
                        }
                        else if(realtime<25){
                          difference=Math.round(realtime)+" hours ";

                        }else{
                          realtime=timeDifference/86400000;
                          if(Math.round(realtime)==1){
                            difference=Math.round(realtime)+" day ";
                          }
                          else if(realtime<29){
                            difference=Math.round(realtime)+" days ";
                          }
                          else{
                            realtime=timeDifference/604800000;
                            if(Math.round(realtime)==1){
                              difference=Math.round(realtime)+" week ";
                            }
                            else if(realtime<53){
                              difference=Math.round(realtime)+" weeks ";
                            }
                            else{
                              realtime=timeDifference/2628000000;
                              if(Math.round(realtime)==1){
                                difference=Math.round(realtime)+" month ";
                              }
                              else if(realtime<13){
                                difference=Math.round(realtime)+" months ";
                              }else{
                                realtime=timeDifference/31540000000;
                                if(Math.round(realtime)==1){
                                  difference=Math.round(realtime)+" year ";
                                }
                                else{
                                  difference=Math.round(realtime)+" years ";
                                }

                              }
                            }
                          }
                        }
                      }
                    }
                    var hiddenstr;


                    if(!(obj.transactions[length-1].account_number=="")){
                      var accountnumber=obj.transactions[length-1].account_number;
                      hiddenstr=" XXXX XXXX XXXX "+accountnumber.substring(12);


                    }
                    if(!(obj.transactions[length-1].mmphone=="")){
                      var mmnumber=obj.transactions[length-1].mmphone;
                      hiddenstr=" XXXX XXXX "+mmnumber.substring(8);
                    }
                    var value;
                    if(obj.transactions[length-1].medium=="bank"){
                      var accountnumber=obj.transactions[length-1].account_number;
                      hiddenstr=" XXXX XXXX XXXX "+accountnumber.substring(12);
                    }else{
                      var mmnumber=obj.transactions[length-1].mmphone;
                      hiddenstr=" XXXX XXXX "+mmnumber.substring(8);
                    }

                    result+="<div class='info-block'><div><div><i class='ti-credit-card small-text'></i><span class='small-text' >"+hiddenstr+"</span><span class='time small-text'> "+ difference +"ago</span></div><p class='block'>"+obj.transactions[length-1].amount+"<span class='transfer-icon'>Transfer</span></p><span class='reference-id'>Reference ID: GH2122939 </span></div><div class='stroke'></div></div>";

                    length-=1;
               }

               transfers.innerHTML=result;
             }
        }

  }

}

function getBalance(){

  var id=sessionStorage.loggedID;


  var theUrl="http://easysavegh.com/databasecommand.php?cmd=7&id="+id;

  $.ajax(theUrl,
        {
          async:true,
          complete:getBalanceComplete
  });

}




function getBalanceComplete(xhr,status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error while retrieving balance.</p>');
      return;
  }else{
    var obj=JSON.parse(xhr.responseText);

    if(obj==null){

      accountbalance.innerHTML="GHS 0.00";
    }
    else if(obj.result==0){
          UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }
    else{

      accountbalance.innerHTML="GHS "+obj.balance;

    }
  }
}


function updateCashout(){

    var id=sessionStorage.loggedID;
    var cashoutamt = $('#cashout').val();
    sessionStorage.cashoutamt=cashoutamt;

    console.log(cashoutamt);

    var theUrl="http://easysavegh.com/databasecommand.php?cmd=8&id="+id+"&cashoutamt="+cashoutamt;

    $.ajax(theUrl,
          {
            async:true,
            complete:updateCashoutComplete
    });
}



function updateCashoutComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);

    if(obj.result==0){
      console.log("getting error");
      UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }
    else{

      window.location="client-dashboard.html";

    }
  }
}
function getAccount(){

  var id=sessionStorage.loggedID;

  var theUrl="http://easysavegh.com/databasecommand.php?cmd=10&id="+id;


  $.ajax(theUrl,
        {
          async:true,
          complete:addAccountComplete
  });
}

function addAccount(){
  var id=sessionStorage.loggedID;
  var accountname=$('#accountname').val();
  var accountnumber=$('#accountnumber').val();
  var accountbranch=$('#accountbranch').val();
  var bankname=$('#bankname').val();

  var theUrl="http://easysavegh.com/databasecommand.php?cmd=9&id="+id+"&accountname="+accountname+"&accountnumber="+accountnumber+"&accountbranch="+accountbranch+"&bankname="+bankname;

  $.ajax(theUrl,
        {
          async:true,
          complete:addAccountComplete
  });
}



function addAccountComplete(xhr, status){
  if(status!="success"){
      UIkit.modal.alert('<p class="uk-modal-body">Error</p>');
      return;
  }else{
    var obj = JSON.parse(xhr.responseText);
    console.log(obj);
    if(obj.result==0){

      UIkit.modal.alert('<p class="uk-modal-body">'+obj.message+'</p>');
    }
    else{
       var result="";
       var length=obj.bank_account.length;


       if(length<=0){
           UIkit.modal.alert('<p class="uk-modal-body">No account added.</p>');

       }
       else{
       if(length>0){

         if(!(obj.bank_account[length-1].account_number=="")){
           var accountnumber=obj.bank_account[length-1].account_number;
           var hiddenstr="XXXX XXXX XXXX "+accountnumber.substring(12);


           result+="<label  class='account checkbox-styled btn'><input onclick='selected_account(this)' type='checkbox' name='selected_account' value='bank' checked/><span class='container'><i class='ti-image small-text'></i><span class='small-text' >"+obj.bank_account[length-1].bank_name+"</span><span class='time small-text'> "+obj.bank_account[length-1].account_name+"</span><p class='block'>"+hiddenstr+" </p><span class='small-text' >"+obj.bank_account[length-1].bank_branch+" Branch"+"</span></span></label></div>";
         }
         if(!(obj.bank_account[length-1].mmphone=="")){
           var mmnumber=obj.bank_account[length-1].mmphone;
           var hiddenmmnumber="XXXX XXXX "+mmnumber.substring(8);
           result+="<label  class='account checkbox-styled'><input onclick='selected_account(this)'type='checkbox' name='selected_account' value='mobilemoney' /><span class='container mobilemoney'><i class='ti-image small-text'></i><span class='small-text' >"+obj.bank_account[length-1].network+"</span><span class='time small-text'>"+obj.bank_account[length-1].mm_name+" </span><p class='block'>"+hiddenmmnumber+" </p><span class='small-text' ></span></span></label></div>";
        }
      }


       bankaccounts.innerHTML=result;
     }
       $(".login-panel").slideToggle();
       $(".login-pop").hide();
       $(".fa").removeClass("fa-chevron-up");
       $(".fa").addClass("fa-chevron-down");
       $( ".info-modal-div" ).hide();













    }
  }
}
/**
 * placeholder function to point to let you know that the actual function exists under the jQuery function
 * @return {[null]} [null]
 */





// $(".login-btn").click(function(){
//     iqwerty.toast.Toast('Loggin In...');
//     console.log($('.homeUsername').val());
//     // setTimeout(function() {
//     //     window.location="Pages/dashboard.html";
//     // }, 3000);
// });
