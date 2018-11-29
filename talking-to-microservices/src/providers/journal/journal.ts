import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'https://jmje3h78ng.execute-api.eu-west-1.amazonaws.com/seb-poc/journal';

@Injectable()
export class JournalProvider {

  constructor(public http: HttpClient) {
  }

  getJournal() {
    // randomly fail
    const httpHeaders = new HttpHeaders({ 'x-api-key': '1234567890qwertyuiop' })
    const response = this.http.get(url, { headers: httpHeaders});
    return response;
  }

}
