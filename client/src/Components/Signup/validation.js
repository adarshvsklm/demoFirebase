export const validation = (form) => {
    let valid = {};
    //password validation
  
    valid.hasSixChar = form.password ? form.password.length >= 6 : false;
    valid.hasLowerChar = /(.*[a-z].*)/.test(form.password);
    valid.hasUpperChar = /(.*[A-Z].*)/.test(form.password);
    valid.hasNumber = /(.*[0-9].*)/.test(form.password);
    valid.hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(form.password);
    //email validation
    valid.hasEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        form.email
      );
      return valid
  };
  