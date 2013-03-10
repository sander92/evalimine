var myVar;

function waiter()
{
	$('*').css('cursor','wait');
	myVar=setInterval(function(){myStopFunction() },1000);

}
function myStopFunction()
{
clearInterval(myVar);
$('*').css('cursor','default');
}