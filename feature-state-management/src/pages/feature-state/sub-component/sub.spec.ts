import { rootStateReducer } from './../../../app/app.state.reducer';
import { featureReducer } from '../feature-state.reducer';
import { SubComponent } from './sub';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';

describe('Home', () => {
  let fixture: ComponentFixture<SubComponent>;
  let component: SubComponent;
  let store: Store<number>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SubComponent],
      imports: [
        StoreModule.forRoot({
          rootState: rootStateReducer,
          count: featureReducer
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(SubComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the SubComponent component', () => {
    expect(component).toBeDefined();
  });

});
