import { Routes } from '@angular/router';
import { CounterviewComponent } from './counterview/counterview.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'widget'
    },
    {
        path: 'widget',
        pathMatch: 'full',
        component: CounterviewComponent
    }
];
