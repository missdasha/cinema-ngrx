import { Component, forwardRef, Input  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilterComponent),
    multi: true
  }]
})
export class FilterComponent implements ControlValueAccessor  {
  @Input() variants: string[] = [];
  chosenVariant: string;
  onChange: (value: string) => void;

  chooseVariant(variant: string) {
    this.writeValue(variant);
    this.onChange(variant);
  }

  writeValue(value: string) {
    this.chosenVariant = value;
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
