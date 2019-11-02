import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  returnUrl: string;
  loading = false;
  constructor(
      public auth: AuthService, private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async googleSignIn() {
    this.loading = true;
    await this.auth.googleSignIn();
    this.loading = false;
    this.router.navigateByUrl(this.returnUrl);
  }
}
