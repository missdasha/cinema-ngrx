import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FilterComponent } from "./filter.component";

describe('FilterComponent', () => {
  let filterComponent: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let filter: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ FilterComponent ]});
    fixture = TestBed.createComponent(FilterComponent);
    filterComponent = fixture.componentInstance;
    filterComponent.variants = [ 'Минск', 'Брест', 'Витебск'];
    fixture.detectChanges();
    filter = fixture.nativeElement;
  });

  fit('should display list with variants', () => {
    const variants = filter.querySelectorAll('.variant');
    variants.forEach((variant: HTMLElement, ind: number) => {
      expect(variant.textContent).toBe(filterComponent.variants[ind]);
    });
  });

  fit('should display chosen variant', () => {
    const variant: HTMLElement = filter.querySelector('.variant');
    variant.click();
    fixture.detectChanges();
    const choice = filter.querySelector('.choice');
    expect(choice.textContent).toBe(variant.textContent);
  });

  fit('should change chosenVariant value', () => {
    expect(filterComponent.chosenVariant).toBeUndefined();
    filterComponent.chooseVariant(filterComponent.variants[0]);
    fixture.detectChanges();
    expect(filterComponent.chosenVariant).toBe(filterComponent.variants[0]);
  });
});
