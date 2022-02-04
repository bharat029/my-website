import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from '../store/auth/auth.model';
import { AuthState } from '../store/auth/auth.state';
import { RootState } from '../store/root/root.state';
import { adminRouteAnimations } from './admin-route-animations';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [adminRouteAnimations],
})
export class AdminComponent implements OnInit {
  links = [
    { link: 'general', label: 'General' },
    { link: 'abouts', label: 'Abouts' },
    { link: 'courses', label: 'Courses' },
    { link: 'educations', label: 'Educations' },
    { link: 'hackathons', label: 'Hackathons' },
    { link: 'pors', label: 'Positions of Responsibility' },
    { link: 'projects', label: 'Projects' },
    { link: 'specializations', label: 'Specializations' },
    { link: 'tech-skills', label: 'Technical Skills' },
    { link: 'volunteer-exps', label: 'Volunteer Experiences' },
    { link: 'work-exps', label: 'Work Experiences' },
  ];
  activeLink!: string;
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(AuthState.getAuth) authState$!: Observable<AuthStateModel>;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.activeLink = this.router.url.split('/')[2];
    
    this.authState$.subscribe(
      (authState) =>
        authState.isReady &&
        !authState.isAdmin &&
        this.router.navigate(['/admin/signIn'])
    );
  }

  signOut() {
    this.auth.signOut();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
