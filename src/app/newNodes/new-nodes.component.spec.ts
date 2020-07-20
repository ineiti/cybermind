import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNodesComponent } from './new-nodes.component';

describe('NewNodesComponent', () => {
  let component: NewNodesComponent;
  let fixture: ComponentFixture<NewNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
