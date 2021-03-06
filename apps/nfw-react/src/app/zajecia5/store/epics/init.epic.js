import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import * as pizzaAT from '../data/pizza/pizza.action-types';
import * as ingredientAT from '../data/ingredient/ingredient.action-types';

export const epic = action$ => action$.pipe(
  ofType(ingredientAT.FETCH_INGREDIENTS, pizzaAT.FETCH_PIZZAS),
  mergeMap((action) => fromFetch(action.endpoint)
    .pipe(
      switchMap(response => response.json()),
      map(data => action.onSuccess(data))
    )     
  )
);