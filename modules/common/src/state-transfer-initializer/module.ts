/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

export function domContentLoadedFactory(doc: Document) {
  return () => new Promise ((resolve, _reject) => {
    const contentLoaded = () => {
      doc.removeEventListener('DOMContentLoaded', contentLoaded);
      resolve();
    };
    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
      resolve();
    } else {
      doc.addEventListener('DOMContentLoaded', contentLoaded);
    }
  });
}


@NgModule({
  providers: [
    {provide: APP_INITIALIZER, multi: true, useFactory: domContentLoadedFactory, deps: [DOCUMENT]},
  ]
})
export class StateTransferInitializerModule {}
