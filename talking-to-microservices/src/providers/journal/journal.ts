import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'https://jmje3h78ng.execute-api.eu-west-1.amazonaws.com/seb-poc/journal';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function shouldFail(): boolean {
  const randomNumber = getRandomInt(2);
  return randomNumber === 1;
}

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

}
