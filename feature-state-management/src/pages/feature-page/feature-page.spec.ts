import { Increment, Decrement } from './feature-page.actions';
import { rootStateReducer, initialAppState } from './../../app/app.state.reducer';
import { featureReducer, initialFeatureState } from './feature-page.reducer';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';
import { FeaturePage } from './feature-page';

describe('Home', () => {
  let fixture: ComponentFixture<FeaturePage>;
  let component: FeaturePage;
  let store: Store<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FeaturePage],
      imports: [
        StoreModule.forRoot({
          rootState: rootStateReducer,
          count: featureReducer
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(FeaturePage);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the FeaturePage component', () => {
    expect(component).toBeDefined();
  });

  it('should generate the correct state', () => {
    component.featurePageState.loggedIn$.subscribe(result => expect(result).toBe(initialAppState.loggedIn));
    component.featurePageState.count$.subscribe(result => expect(result).toBe(initialFeatureState));
  })

  it('should dispatch the correct actions', () => {
    component.incrementDispatcher();
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
    component.decrementDispatcher();
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

});
