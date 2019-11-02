import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
        take(1), map(user => !!user), tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
          }
        }));
  }
}
