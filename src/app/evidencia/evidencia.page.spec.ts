import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvidenciaPage } from './evidencia.page';

describe('EvidenciaPage', () => {
  let component: EvidenciaPage;
  let fixture: ComponentFixture<EvidenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EvidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
