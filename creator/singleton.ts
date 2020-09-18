class Database {
    private instance: Date // can be db instance type

    public getInstance() {
        if (!this.instance) {
            this.instance = new Date(); // can be new database connection
        }

        return this.instance;
    }
}

const database = new Database();

console.log(database.getInstance());
setTimeout(() => 
{
    // same timestamp even after 1 second
    console.log(database.getInstance()); 
}, 1000)
