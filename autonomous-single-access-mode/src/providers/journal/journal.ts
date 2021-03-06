import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../authentication/authentication';
import { UrlProvider } from '../url/url';
import { DateTime } from '../../shared/helpers/date-time';

@Injectable()
export class JournalProvider {

  constructor(
    public http: HttpClient,
    public urlProvider: UrlProvider,
    public authProvider: AuthenticationProvider,
  ) {}

  getJournal(lastRefreshed: Date) {
    const staffNumber = this.authProvider.getEmployeeId();
    const journalUrl = this.urlProvider.getPersonalJournalUrl(staffNumber);
    if (lastRefreshed === null) {
      return this.http.get(journalUrl);
    }

    const modifiedSinceValue = DateTime.at(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
    const options = {
      headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
    };
    return this.http.get(journalUrl, options);
  }

}
