import {Injectable} from '@angular/core';

@Injectable()
export class SqlDataStoreProvider {

  // todo - only temporary
  defaultDBName: string = "MES";

  constructor( ) {
  }

  getKeys(): any {

  }

  getItem(key: string) {
  }

  setItem(key: string, value: any) {

  }

  removeItem(key: string) {

  }

}
