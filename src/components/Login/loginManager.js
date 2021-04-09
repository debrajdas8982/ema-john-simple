import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () =>{
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
   }
}

export const handelGoogleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
  return  firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {

        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }

        setUserToken();
        
        return signedInUser;
        // console.log(email, displayName, photoURL);
        // const credential = result.credential;
      })
      .catch(err => {

      })
  }


  const setUserToken = ()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

 export const handelFbSignIn = () => {

    const  fbProvider = new firebase.auth.FacebookAuthProvider();
  return  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    user.success = true;
    return user;
   
  
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  }

 export const handelSignOut = () => {
   return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          error: '',
          success: false
        }
        return signedOutUser;
      })
      .catch(err => {

      })
  }

  export const createUserWithEmailAndPassword = (name , email, password) =>{

 return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
  })
  .catch((error) => {

    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });

  }

  export const signInWithEmailAndPassword = (email, password) =>{
 return   firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name 
    }).then(function () {
     console.log('user name update')
    }).catch(function (error) {
      console.log(error)
    });
  }
