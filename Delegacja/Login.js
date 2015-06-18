var mysql = require('mysqlHandler');
function checkUser(User, Password) {
    var data = mysql.selectQuery("SELECT * FROM Uzytkownicy WHERE UsosLogin='" + User + "'");
    if (data !== null) {
        if (mysql.selectQueryCount("SELECT * FROM Uzytkownicy WHERE UsosLogin='" + User + "'") === 1) {
            if (data.UsosPass === Password)
                return 2;
            else
                return 1;
        }
        else
            return 0;
    }
    else
        return -1;
}
exports.checkUser = checkUser;
;
//# sourceMappingURL=Login.js.map