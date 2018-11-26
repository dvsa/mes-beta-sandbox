import { Increment, Decrement } from './feature-state.actions';
import { rootStateReducer, initialAppState } from './../../app/app.state.reducer';
import { featureReducer, initialFeatureState } from './feature-state.reducer';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';
import { FeatureStatePage } from './feature-state';
import { AppStateSelector } from '../../app/app.state.selector';

describe('Home', () => {
  let fixture: ComponentFixture<FeatureStatePage>;
  let component: FeatureStatePage;
  let store: Store<number>;
  let appStateSelector: AppStateSelector;

  beforeEach(() => {
    appStateSelector = new AppStateSelector();
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FeatureStatePage],
      imports: [
        StoreModule.forRoot({
          rootState: rootStateReducer,
          count: featureReducer
        })
      ],
      providers: [
        { provide: AppStateSelector, useValue: appStateSelector }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(FeatureStatePage);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the FeatureStatePage component', () => {
    expect(component).toBeDefined();
  });

  it('should generate the correct state', () => {
    component.state.loggedIn$.subscribe(result => expect(result).toBe(initialAppState.loggedIn));
    component.state.count$.subscribe(result => expect(result).toBe(initialFeatureState));
  })

  it('should dispatch the correct actions', () => {
    component.incrementDispatcher();
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
    component.decrementDispatcher();
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

});
