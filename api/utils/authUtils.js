const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
   
  function validPassword(pwd) {
    var regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    var valid = regularExpression.test(pwd);
    return valid;
  }
   const userValidation=({name,email,username,password})=>{
  return new Promise((resolve ,reject)=>{
  if(!name||!email||!username||!password) reject("missing user data")
  
    if(typeof name !=='string') reject('name is not a taxt')
    if(typeof email !=='string') reject('email is not a taxt')
    if(typeof username !=='string') reject('username is not a taxt')
    if(typeof password !=='string') reject('password is not a taxt');
  if(!validateEmail(email)) reject('email fromat is incorrect')
  // if(!validPassword(password)) reject('password should contain a-z/A-Z/1-9')
  resolve();
  
  })
    }
  
    module.exports={userValidation}