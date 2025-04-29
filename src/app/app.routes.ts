import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PricingComponent } from './pages/pricing/pricing.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
];