import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeCreateComponent } from '../menu/recipe/recipe-create/recipe-create.component';
import { RecipeUpdateComponent } from '../menu/recipe/recipe-update/recipe-update.component';
import { SetCreateComponent } from '../menu/set/set-create/set-create.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard
  implements CanDeactivate<RecipeCreateComponent | RecipeUpdateComponent> {
  submitted: boolean;
  canDeactivate(
    component:
      | RecipeCreateComponent
      | RecipeUpdateComponent
      | SetCreateComponent
  ): Observable<boolean> | boolean {
    if (component.form.pristine || component.form.valid || this.submitted) {
      this.submitted = false;
      return true;
    }
    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}
