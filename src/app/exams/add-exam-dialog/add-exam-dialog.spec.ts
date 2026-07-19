import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { vi } from 'vitest';

import { AddExamDialog } from './add-exam-dialog';

describe('AddExamDialog', () => {
  let component: AddExamDialog;
  let fixture: ComponentFixture<AddExamDialog>;

  const mockDialogRef = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamDialog],
      providers: [
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
