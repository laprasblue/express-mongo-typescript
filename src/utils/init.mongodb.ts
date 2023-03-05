import mongoose from 'mongoose';

class Database {
    connectString: string;
    private static instance: Database;

    constructor(connectString: string) {
        this.connectString = connectString;
        this.connect();
    }

    connect(type = 'mongodb') {
        mongoose.set('strictQuery', true);
        mongoose
            .connect(this.connectString)
            .then(() => console.log(`Connected mongodb success`))
            .catch((err) => console.log(`Error connect! ${err}`));
    }

    public static getInstance(connectString: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(connectString);
        }
        return Database.instance;
    }
}

export default Database;
