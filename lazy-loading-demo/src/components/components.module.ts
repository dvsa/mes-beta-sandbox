import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button';
import { RadioButtonComponent } from './radio-button/radio-button';
import { TextBoxComponent } from './text-box/text-box';

@NgModule({
  declarations: [
    ButtonComponent,
    RadioButtonComponent,
    TextBoxComponent],
  imports: [],
  exports: [
    ButtonComponent,
    RadioButtonComponent,
    TextBoxComponent]
})
export class ComponentsModule { }
