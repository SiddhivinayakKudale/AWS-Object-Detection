import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImageObTagsComponent } from './search-image-ob-tags.component';

describe('SearchImageObTagsComponent', () => {
  let component: SearchImageObTagsComponent;
  let fixture: ComponentFixture<SearchImageObTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchImageObTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImageObTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
