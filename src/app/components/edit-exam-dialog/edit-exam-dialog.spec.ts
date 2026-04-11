import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamDialog } from './edit-exam-dialog';

describe('EditExamDialog', () => {
  let component: EditExamDialog;
  let fixture: ComponentFixture<EditExamDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExamDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExamDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
