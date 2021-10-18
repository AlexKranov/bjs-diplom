"use strict";

let userForm = new UserForm(); 


userForm.loginFormCallback = (data) => { 
    ApiConnector.login(data, (response) {
            if (response.success) {
                location.reload();
            }
            else {
                userForm.setLoginErrorMessage(`Не правильно введены логин или пароль: ${response.error}`);
            } 
        }); 
};

userForm.registerFormCallback = (data) => { 
    ApiConnector.register(data, (response) {
            if (response.success) {
                location.reload();
            }
            else {
                userForm.setRegisterErrorMessage(`Ошибка регистрации нового пользователя ${data.login}: ${response.error}`);
            }
        });
}