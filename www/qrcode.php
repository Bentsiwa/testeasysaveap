<?php

$separator=':';
$merchantID = $_REQUEST['merchantID'];
$merchantName = $_REQUEST['merchantName'];
$passedValue = $_REQUEST['passedValue'];

$myqrcode = '<center><img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl='
.$merchantID.$separator.$merchantName.$separator.$passedValue.
'" title="Code to Pass funds"></center>';

echo $myqrcode;




?>
