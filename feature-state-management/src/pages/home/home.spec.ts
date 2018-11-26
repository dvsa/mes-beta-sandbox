import { rootStateReducer, initialAppState } from './../../app/app.state.reducer';
import { AppStateSelector } from './../../app/app.state.selector';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomePage } from './home';
import { Store, StoreModule } from '@ngrx/store';

describe('Home', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let appStateSelector: AppStateSelector;
  let store: Store<number>;

  beforeEach(() => {
    appStateSelector = new AppStateSelector();
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePage],
      imports: [
        StoreModule.forRoot({
          rootState: rootStateReducer
        })
      ],
      providers: [
        { provide: AppStateSelector, useValue: appStateSelector }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    jest.spyOn(store, 'select');
    jest.spyOn(appStateSelector, 'getLoggedInState');

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the HomePage component', () => {
    expect(component).toBeDefined();
  });

  it('should call .select on store with the correct selector', () => {
    expect(store.select).toHaveBeenCalled();
    expect(appStateSelector.getLoggedInState).toHaveBeenCalled();
  });

  it('should generate the correct state', () => {
    component.homePageState.loggedIn$.subscribe(result => expect(result).toBe(initialAppState.loggedIn));
  })

});
