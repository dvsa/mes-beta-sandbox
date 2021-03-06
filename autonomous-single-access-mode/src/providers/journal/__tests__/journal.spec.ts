import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JournalProvider } from '../journal';
import { AuthenticationProvider } from '../../authentication/authentication';
import { AuthenticationProviderMock } from '../../authentication/__mocks__/authentication.mock';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';

describe('JournalProvider', () => {
  describe('getJournal', () => {

    let journalProvider;
    let httpMock;
    let authProviderMock;
    let urlProviderMock;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          JournalProvider,
          { provide: UrlProvider, useClass: UrlProviderMock },
          { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        ],
      });

      httpMock = TestBed.get(HttpTestingController);
      journalProvider = TestBed.get(JournalProvider);
      authProviderMock = TestBed.get(AuthenticationProvider);
      urlProviderMock = TestBed.get(UrlProvider);
    });

    it('should obtain the personal journal URL from the journal provider, passing the cached employee ID', () => {
      journalProvider.getJournal(null).subscribe();

      httpMock.expectOne('https://www.example.com/api/v1/journals/12345678/personal');
      expect(authProviderMock.getEmployeeId).toHaveBeenCalled();
      expect(urlProviderMock.getPersonalJournalUrl).toHaveBeenCalledWith('12345678');
    });

  });
});
