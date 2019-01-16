import { Injectable } from '@angular/core';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';

@Injectable()
export class SqlDataStoreProvider {

  // todo - only temporary
  defaultDBName: string = 'mes.db';

  private storage: SQLiteObject;

  sqliteConfiguration: SQLiteDatabaseConfig = {
    name: this.defaultDBName,
    iosDatabaseLocation: 'Library'
  };

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.init();
  }

  public init(): void {
    this.platform.ready().then(() => {
      this.sqlite.create(this.sqliteConfiguration)
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.storage.executeSql('CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, state TEXT)')
            .then(data => {
                console.log('create state table', data.toString());
              },
              error => {
                console.log('error creating state table', error.toString());
              });
        })
        .catch((error) => {
          console.log('error opening sqlite db', error.toString());
        });
    })
  }

  public removeItem(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('DELETE FROM state WHERE key=?', [key])
        .then(data => {
            console.log(data);
            resolve(data);
          },
          error => {
            console.log(error);
            reject(error);
          });
    });
  }

  // Upsert syntax - Didn't seem to work
  // INSERT INTO players (user_name, age)
  // VALUES('steven', 32)
  // ON CONFLICT(user_name)
  // DO UPDATE SET age=excluded.age;

  public setItem(key: string, value: any) {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('UPDATE state SET state = ? WHERE key = ?', [value, key])
        .then(data => {
            console.log(data);
            resolve(data);
            // If no rows then ther is nothing in the table so do an insert
            if (data.rowsAffected === 0){
              this.storage.executeSql('INSERT INTO state (key,state) VALUES (?,?)', [key, value])
                .then ( data => {
                  console.log(data);
                },
                  error => {
                    console.log('insert error', error);
                  })
            }
          },
          error => {
            console.log(error);
            reject(error);
          });
    });
  }

  getKeys(): any {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('SELECT * FROM state', [])
        .then(data => {
            console.log('get state keys resolved', data);
            const keys = [];

            // Cannot get this syntax to work
            // let dataRows = Object.assign(data.rows);
            // keys = dataRows.map((row, index) => {
            //   return row.item(index).key
            // });

            for (let i = 0; i < data.rows.length; i = i + 1) {
              console.log('data', data.rows.item(i).key);
              keys.push(data.rows.item(i).key)
            }
            resolve(keys);
          },
          error => {
            console.log('get state keys error', error);
            reject(error);
          });
    });
  }


  getItem(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('SELECT * FROM state WHERE key=?', [key])
        .then(data => {
            console.log('get state', data);
            if (data.rows.length > 0) {
              resolve(data.rows.item(0).state)
            }
            resolve('No state found');
          },
          error => {
            console.log(error);
            reject(error);
          });
    });
  }

  removeState(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.executeSql('DELETE FROM state WHERE key=?', [key])
        .then(data => {
            console.log(data);
            resolve(data);
          },
          error => {
            console.log(error);
            reject(error);
          });
    });
  }

  dropDB() {
    this.sqlite.deleteDatabase(this.sqliteConfiguration)
  }


}
