
//var pass1 = document.getElementById("pwd1");
//var pass2 = document.getElementById("pwd2");
var email = document.forms['form']['email'];
var password = document.forms['form']['password'];
var cpassword = document.forms['form']['cpassword'];


var emailerror = document.getElementById("emailerror");
var passworderror = document.getElementById("passworderror");
var cpassworderror = document.getElementById("cpassworderror");

email.addEventListener('textInput', email_Verify);
password.addEventListener('textInput', password_Verify);
cpassword.addEventListener('textInput', cpassword_Verify);

function Verify()
{
    if (email.value.length <9){
        email.style.border = "1px solid red";
        emailerror.style.display = "block";
        email.focus();
        return false;
    }
    if (password.value.length < 6){
        password.style.border = "1px solid red";
        passworderror.style.display = "block";
        password.focus();
        return false;
    }

    if(cpassword.value.length != password.value.length){
        cpassword.style.border = "1px solid red";
        cpassworderror.style.display = "block";
        cpassword.focus();
        return false;
    }
}

function email_Verify(){
    if (email.value.length >= 8) {
        email.style.border = "1px solid silver";
        emailerror.style.display = "none";
        return true;
    }
}
function password_Verify(){
    if (password.value.length >= 5) {
        password.style.border = "1px solid silver";
        passworderror.style.display = "none";
        return true;
    }
}
function cpassword_Verify(){
    if (cpassword.value.length != password.value.length) {
        cpassword.style.border = "1px solid silver";
        cpassworderror.style.display = "none";
        return true;
    }
}

/*
if (pass1.value != pass2.value)
{
alert("Please make sure both password entered are same \n" + "Please re-enter both now");
return false;
}
else true;*/

