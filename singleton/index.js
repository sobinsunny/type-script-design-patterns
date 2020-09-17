var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getInstance = function () {
        if (!this.instance) {
            this.instance = new Date(); // can be new database connection
        }
        return this.instance;
    };
    return Database;
}());
var database = new Database();
console.log(database.getInstance());
setTimeout(function () {
    console.log(database.getInstance());
}, 1000);
