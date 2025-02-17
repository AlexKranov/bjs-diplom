let logoutButton = new LogoutButton;
//Выход из личного кабинета
logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
}

//Получение информации о пользователе
let current = ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
let rateBoard = new RatesBoard;

function exchangerate() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            rateBoard.clearTable();
            rateBoard.fillTable(response.data);
        }
    });
}

exchangerate();
setInterval(exchangerate, 60000);

//Операции с деньгами
let moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = ((data) => {
    ApiConnector.addMoney(data, (response) => {
        console.log(data, (response));
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.error || "Успешное пополнение кошелька");
        }
    })
})


//Конвертирование валюты
moneyManager.conversionMoneyCallback = ((data) => {
    ApiConnector.convertMoney(data, (response) => {
        console.log(data, (response));
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.error || "Конвертирование успешно");
        }
    })
})

//Перевод валюты
moneyManager.sendMoneyCallback = ((data) => {
    ApiConnector.transferMoney(data, (response) => {
        console.log(data, (response));
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.error || "Перевод выполнен");
        }
    })
})

//Работа с избранным
let favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites = ((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

//Добавления пользователя в список избранных

favoritesWidget.addUserCallback = ((data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, response.error || "Пользователь добавлен");
        }
    })
})

favoritesWidget.removeUserCallback = ((data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, response.error || "Пользователь удален");
        }
    })
})