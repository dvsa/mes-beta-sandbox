import { getLoggedInState, getRootState, AppStateSelector } from './../../app/app.state.selector';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomePage } from './home';
import { Store } from '@ngrx/store';

describe('Home', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let appStateSelector: AppStateSelector;

  const storeStub = {
    select: jest.fn()
  };

  beforeEach(() => {
    appStateSelector = new AppStateSelector();
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePage],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: AppStateSelector, useValue: appStateSelector }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create the HomePage component', () => {
    expect(component).toBeDefined();
  });

  it('should call .select on store with the correct selector', () => {
    expect(storeStub.select).toHaveBeenCalledWith(appStateSelector.getLoggedInState);
  });

});
