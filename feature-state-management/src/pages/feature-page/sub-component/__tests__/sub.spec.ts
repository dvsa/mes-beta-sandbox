import { SubComponent } from '../sub';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Home', () => {
  let fixture: ComponentFixture<SubComponent>;
  let component: SubComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SubComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SubComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the SubComponent component', () => {
    expect(component).toBeDefined();
  });

});
