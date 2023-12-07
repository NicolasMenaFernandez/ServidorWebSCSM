import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRUDcarrosPage } from './crudcarros.page';

describe('CRUDcarrosPage', () => {
  let component: CRUDcarrosPage;
  let fixture: ComponentFixture<CRUDcarrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CRUDcarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
