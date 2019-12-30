import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SponsorsComponent } from '../sponsors/sponsors.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [SponsorsComponent],
  exports: [SponsorsComponent],
  bootstrap: [SponsorsComponent]
})
export class SponsorsModule {}