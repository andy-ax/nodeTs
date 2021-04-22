const mongodb = require('mongodb');
import {DBPORT, DBURL} from '../../../model/model';
export class Mongodb {
    private static server: any;
    private static db: any;
    private static dbName = 'myDb';
    init() {
        Mongodb.server = new mongodb.Server(DBURL, DBPORT, { auto_reconnect: true });
        Mongodb.db = new mongodb.Db(Mongodb.dbName, Mongodb.server, {safe: true});
        Mongodb.db.open((err: any, db: any) => {

        })
    }
}