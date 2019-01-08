export default function(user = {}, action) {
  if(action.type === 'signup') {
    console.log("user du reducer", action.userSignUp);
      return action.userSignUp;
  } else if (action.type === 'signin') {
    console.log("user du reducer", action.userSignIn);
      return action.userSignIn;
  } else {
    return user;
  }

}
