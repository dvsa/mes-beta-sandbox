import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalNavigationComponent } from '../journal-navigation';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../../../journal.reducer';
import { DebugElement } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { LoadJournalSuccess, SetSelectedDate } from '../../../journal.actions';
import journalSlotsDataMock from '../__mocks__/journal-slots-data.mock';
import { By } from '@angular/platform-browser';
import { DateTime, Duration } from '../../../../../shared/helpers/date-time';

describe('JournalNavigationComponent', () => {
  let component: JournalNavigationComponent;
  let fixture: ComponentFixture<JournalNavigationComponent>;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalNavigationComponent],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          journal: journalReducer,
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(JournalNavigationComponent);
      component = fixture.componentInstance;
    });

    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      store$.dispatch(new LoadJournalSuccess(journalSlotsDataMock));
    });

    describe('selected date is today', () => {
      it('does not show previous day button', () => {
        fixture.detectChanges();
        const previousDayContainer: DebugElement = componentEl.query(By.css('#previous-day-container'));
        expect(previousDayContainer).toBeNull();
      });

      it('shows Today as header', () => {
        fixture.detectChanges();
        const mainHeader: HTMLElement = componentEl.query(By.css('h1')).nativeElement;
        expect(mainHeader.textContent).toBe('Today');
      });

      it('shows correct date format as sub header', () => {
        fixture.detectChanges();
        const subHeader: HTMLElement = componentEl.query(By.css('h3')).nativeElement;
        expect(subHeader.textContent).toBe(DateTime.now().format('dddd D MMMM YYYY'));
      });

      it('shows next day button', () => {
        fixture.detectChanges();
        const nextDayContainer: DebugElement = componentEl.query(By.css('#next-day-container'));
        expect(nextDayContainer).not.toBeNull();
      });
    });

    describe('selected date is day in the middle', () => {
      const nextDay = DateTime.now().add(1, Duration.DAY).format('YYYY-MM-DD');
      beforeEach(() => {
        store$.dispatch(new SetSelectedDate(nextDay));
      });

      it('shows previous day button', () => {
        fixture.detectChanges();
        const previousDayContainer: DebugElement = componentEl.query(By.css('#previous-day-container'));
        expect(previousDayContainer).not.toBeNull();
      });

      it('shows day of the week as header', () => {
        fixture.detectChanges();
        const mainHeader: HTMLElement = componentEl.query(By.css('h1')).nativeElement;
        expect(mainHeader.textContent).toBe(DateTime.at(nextDay).format('dddd'));
      });

      it('shows correct date format as sub header', () => {
        fixture.detectChanges();
        const subHeader: HTMLElement = componentEl.query(By.css('h3')).nativeElement;
        expect(subHeader.textContent).toBe(DateTime.at(nextDay).format('D MMMM YYYY'));
      });

      it('shows next day button', () => {
        fixture.detectChanges();
        const nextDayContainer: DebugElement = componentEl.query(By.css('#next-day-container'));
        expect(nextDayContainer).not.toBeNull();
      });
    });

    describe('selected date is the last available date', () => {
      const selectedDay = DateTime.now().add(2, Duration.DAY).format('YYYY-MM-DD');
      beforeEach(() => {
        store$.dispatch(new SetSelectedDate(selectedDay));
      });

      it('shows previous day button', () => {
        fixture.detectChanges();
        const previousDayContainer: DebugElement = componentEl.query(By.css('#previous-day-container'));
        expect(previousDayContainer).not.toBeNull();
      });

      it('shows day of the week as header', () => {
        fixture.detectChanges();
        const mainHeader: HTMLElement = componentEl.query(By.css('h1')).nativeElement;
        expect(mainHeader.textContent).toBe(DateTime.at(selectedDay).format('dddd'));
      });

      it('shows correct date format as sub header', () => {
        fixture.detectChanges();
        const subHeader: HTMLElement = componentEl.query(By.css('h3')).nativeElement;
        expect(subHeader.textContent).toBe(DateTime.at(selectedDay).format('D MMMM YYYY'));
      });

      it('does not shows next day button', () => {
        fixture.detectChanges();
        const nextDayContainer: DebugElement = componentEl.query(By.css('#next-day-container'));
        expect(nextDayContainer).toBeNull();
      });
    });

  });
});
