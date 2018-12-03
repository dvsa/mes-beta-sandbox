
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/Observable/empty';
import { Observable } from 'rxjs/Observable';

import { TestScheduler } from 'rxjs/testing/TestScheduler';

import { JournalEffects } from '../journal.effects';
import { JournalService } from '../../providers/journal/journal.service';
import * as journalActions from '../../store/journal.actions';

const scheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal
  // e.g. using chai.
  expect(actual).toEqual(expected);
});

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

function generateJournal() {
  return {
    
  }
}

describe('Journal Effects', () => {

  let actions: Observable<any>;
  let journalEffects: JournalEffects;
  let journalService: JournalService;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [
        
      ],
      providers: [
        JournalEffects,
        {
          provide: Actions,
          useFactory: getActions,
        },
        {
          provide: JournalService,
          useValues: {
            getJournal: jest.fn(),
            getJournalWithChanceToFail: jest.fn(),
          },
        },
      ]
    });

    actions = TestBed.get(Actions);
    journalEffects = TestBed.get(JournalEffects);
    journalService = TestBed.get(JournalService);
  });

  it('should be created', () => {
    expect(journalEffects).toBeTruthy();
  });

  describe('loadJournal', () => {
    it('should return a LoadJournalSuccess action, with the journal, on success', () => {
      const journal = generateJournal();

      const action = new journalActions.LoadJournal();
      const outcome = new journalActions.LoadJournalSuccess(journal);

      const actions = scheduler.createHotObservable('--a-', { a: action });
      const expected = scheduler.createColdObservable('--b', { b: outcome });

      console.log(journalEffects.journal$);

      // scheduler.expectObservable(journalEffects.journal$).toBe(expected);
    });
  });

  describe('loadJournalStarts', () => {
    it('should return an AddMessage action', () => {
      const source = scheduler.createColdObservable('a', { a: new journalActions.LoadJournal() });
      const effects = new JournalEffects(new Actions(source), new JournalService({}));

      const expected = scheduler.createColdObservable('a', { a: { type: actions.UPDATE_TEXT_ACTION } });
      expect(effects.updateTextOnIncrement$).toBeObservable(expected);
    });
  });
});