import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  returnUrl: string;
  loading = false;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  async googleSignIn() {
    this.loading = true;
    await this.auth.googleSignIn();
    this.loading = false;
    this.router.navigateByUrl(this.returnUrl);
  }
}
