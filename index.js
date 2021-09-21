/*============================== Google Login ===============================*/

var gimage = document.querySelector('#gimg');
var gname = document.querySelector('#gname');
var gmail = document.querySelector('#gmail');
var gso = document.querySelector('#signout');

gimage.style.display = 'none';
gname.style.display = 'none';
gmail.style.display = 'none';
gso.style.display = 'none';


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }



  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    gimage.setAttribute('src', profile.getImageUrl());
    gname.innerText = 'Name: ' + profile.getName();
    gmail.innerText = 'Email: ' + profile.getEmail();

    gimage.style.display = 'block';
    gname.style.display = 'block';
    gmail.style.display = 'block';
    gso.style.display = 'block';
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        gimage.style.display = 'none';
        gname.style.display = 'none';
        gmail.style.display = 'none';
        gso.style.display = 'none';
    });
}

/*================================ FaceBook Login ===================================*/

var fimage = document.querySelector('#fimg');
var fname = document.querySelector('#fname');
var fmail = document.querySelector('#fmail');
var flo = document.querySelector('#logout');

fimage.style.display = 'none';
fname.style.display = 'none';
fmail.style.display = 'none';
flo.style.display = 'none';

window.fbAsyncInit = function() {
    FB.init({
        appId      : '337294694551004',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserData();
        } else {
            FB.login(function(response){
                if(response.authResponse){
                    getUserData();
                } else {
                    console.log("Not Authorized.")
                }
            }, {scope: 'email, public_profile', return_scopes: true});
        }
    });
}

function getUserData(){
    FB.api('/me', {fields: 'name,email,picture.type(large)'}, function(response) {
        fimage.setAttribute('src', response.picture.data.url);
        fname.innerHTML = 'Name: ' + response.name;
        fmail.innerHTML = 'Email: ' + response.email;

        fimage.style.display = 'block';
        fname.style.display = 'block';
        fmail.style.display = 'block';
        flo.style.display = 'block';
    }); 
}

function logout() {
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            FB.logout(function(response){
                fimage.style.display = 'none';
                fname.style.display = 'none';
                fmail.style.display = 'none';
                flo.style.display = 'none';
            });
        } else {
            console.log("Unauthorized Logout.")
        }
    });
}


function myFunction() {
    var x = document.getElementById('my-signin2');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
function myFunction2() {
    var x = document.getElementById('loginBtn');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}