import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedeletetagsByurlComponent } from './updatedeletetags-byurl.component';

describe('UpdatedeletetagsByurlComponent', () => {
  let component: UpdatedeletetagsByurlComponent;
  let fixture: ComponentFixture<UpdatedeletetagsByurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedeletetagsByurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedeletetagsByurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
