EasySave v.0.0.1

First thing to concede is that the scripts aren't arranged orderly and have all
been removed from their respective folders(hence folders are empty)
for a flat directory.

The purpose of this document is to outline the functionalities and categorizes
them into 3. Complete | Incomplete | Tweaks Required

UI Login: COMPLETE
UI SignUp: COMPLETE
UI Merchant Dashboard: COMPLETE
UI Customer Dashboatd: COMPLETE
UI EasySave Account QR_Code: COMPLETE
UI Transaction History: COMPLETE
UI Cash Out: COMPLETE
UI Setting Page: Tweaks Required

SignUp: INCOMPLETE--------------------------------
The functionality we intended for this was to have a user confirm with EMAIL
or text message. This functionality is not in place yet. However, the UI does
create an avenue for it. The JQuery on css.js as well has the function and the
UI controls required to simply plug it in.
However, dev needs to auto create an easysave account through the Database as well.

LogIn: COMPLETE
Login functionality is complete. It is separated into 2; customer and merchants
and is dependent on the enum that the user account is created width

LogOut: COMPLETE
LogOut functionality is complete.


Merchant Dashboard SendMoney/QR code generation: COMPLETE
This functionality is complete when the merchant clicks the arrow icon on the
homepage, it generated a modal with a textbox. When the merchant enters a number,
it created a QR code below the text field that the customer can scan.

Customer QR Code Scan: COMPLETE (TWEAKS REQUIRED DEPENDING ON DEV PREFERENCE)
This function essentially is complete. The customer taps the camera app, a barcode scanner pops
up and he/she can scan the merchants QR code.
This then adds a transaction object. Then does what is called an explodedTransaction in the databasecommand.php.
This exploded transaction credits and debits the customer and merchant respectively.

Debit and Credit Functionality to EasySave Accounts: COMPLETE
This functionality strictly requires the customer/merchants ID and can be used to debit and
credit easy save accounts. The Admin Dashboard can be formulated from these functions in case of emergencies.

Merchant & Customer Dashboard Transaction History: TWEAKS REQUIRED
This functionality is implemented in the backend. However because of the lack
of data in the backend it hasn't been plugged in. Dev would need to clear the
placeholder elements and utilize the sessionStorage.ID to fetch the transactions
id through the php script and plug it into the dashboard History


Mobile Money Integration To Fund Easy Save Account: INCOMPLETE / PENDING HUBTEL
Mobile MoneyCash Out Integration To Withdraw From Easy Save Account: INCOMPLETE / PENDING HUBTEL
