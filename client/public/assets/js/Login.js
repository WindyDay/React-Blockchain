/* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/
var inLogin = null;

function cambiar_login() {
  inLogin = true;
  status();
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
  document.querySelector('.cont_form_login').style.display = "block";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.opacity = "1";
  }, 400);

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = "none";
  }, 200);
}

function cambiar_sign_up(at) {
  if(inLogin === false){
    // get data and do ajax
  }


  inLogin = false;
  console.log("clicked sign up");
  status();
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.opacity = "1";
  }, 100);

  setTimeout(function () {
    document.querySelector('.cont_form_login').style.display = "none";
  }, 400);



}



function ocultar_login_sign_up() {

  inLogin = null;
  console.log("ocultar_login_sign_up()");
  status();
  document.querySelector('.cont_forms').className = "cont_forms";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = "none";
    document.querySelector('.cont_form_login').style.display = "none";
  }, 500);

}

function status() {
  console.log("inLogin = " + inLogin);
}