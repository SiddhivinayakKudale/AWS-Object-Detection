import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTagsMultipleComponent } from './search-by-tags-multiple.component';

describe('SearchByTagsMultipleComponent', () => {
  let component: SearchByTagsMultipleComponent;
  let fixture: ComponentFixture<SearchByTagsMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByTagsMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByTagsMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
