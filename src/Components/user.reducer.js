export default function(user = {}, action) {
  if(action.type === 'signup') {
      return action.userSignUp;
  } else if (action.type === 'signin') {
      return action.userSignIn;
  } else {
    return user;
  }

}
