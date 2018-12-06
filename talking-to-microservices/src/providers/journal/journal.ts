import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { shouldFail } from '../utils';

const url = 'https://jmje3h78ng.execute-api.eu-west-1.amazonaws.com/seb-poc/journal';

@Injectable()
export class JournalProvider {
  constructor(public http: HttpClient) {}

  getJournal() {
    const httpHeaders = new HttpHeaders({ 'x-api-key': '1234567890qwertyuiop' })
    const response = this.http.get(url, { headers: httpHeaders});
    return response;
  }

  getJournalWithChanceToFail() {
    let httpHeaders = new HttpHeaders({ 'x-api-key': '1234567890qwertyuiop' });
    if (shouldFail()) {
      httpHeaders = new HttpHeaders({ 'x-api-key': 'not-a-correct-key' });
    }
    const response = this.http.get(url, { headers: httpHeaders});
    return response;
  }

  extractJournalData(data) {
    const journalData = data.body.data.data.testSlots;
    return journalData;
  }
}
