
import { TestBed } from '@angular/core/testing';

import { JournalEffects } from '../journal.effects';

describe('Journal Effects', () => {

  let effects: JournalEffects;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        JournalEffects
      ]
    });

    effects = TestBed.get(JournalEffects);
  })

});