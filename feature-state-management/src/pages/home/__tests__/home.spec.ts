import { rootStateReducer, initialAppState } from '../../../app/app.state.reducer';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomePage } from '../home';
import { Store, StoreModule } from '@ngrx/store';

describe('Home', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let store: Store<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePage],
      imports: [
        StoreModule.forRoot({
          rootState: rootStateReducer
        })
      ],
    }).compileComponents();

    store = TestBed.get(Store);
    jest.spyOn(store, 'select');

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the HomePage component', () => {
    expect(component).toBeDefined();
  });

  it('should call .select on store with the correct selector', () => {
    expect(store.select).toHaveBeenCalled();
  });

  it('should generate the correct state', () => {
    component.homePageState.loggedIn$.subscribe(result => expect(result).toBe(initialAppState.loggedIn));
  })

});
