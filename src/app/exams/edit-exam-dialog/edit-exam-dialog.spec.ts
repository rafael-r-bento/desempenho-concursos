import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { vi } from 'vitest';

import { EditExamDialog } from './edit-exam-dialog';

describe('EditExamDialog', () => {
  let component: EditExamDialog;
  let fixture: ComponentFixture<EditExamDialog>;

  const mockDialogRef = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExamDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
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
