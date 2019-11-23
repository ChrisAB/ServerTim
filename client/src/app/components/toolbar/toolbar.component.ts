import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() targetSideNav: MatSidenav;
  returnUrl: string;
  loading = false;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/examples/thumbup-icon.svg'
      )
    );
  }

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
