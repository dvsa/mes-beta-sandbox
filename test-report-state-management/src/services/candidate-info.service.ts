import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { CandidateInfo } from '../models/candidate-info';

@Injectable()
export class CandidateInfoService {
  constructor(private http: HttpClient) {}

  getCandidateInfo(): Observable<CandidateInfo> {
    return this.http
      .get<CandidateInfo>('assets/data.json')
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}