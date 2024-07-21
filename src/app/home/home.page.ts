import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {ProgressbarComponent} from '../components/progressbar/progressbar.component';
import { NavparamService } from '../../services/navparam.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton,ProgressbarComponent],
})
export class HomePage {
  constructor(private router: Router,private navParamService: NavparamService) { }

  //defines how many elements of the progress bar are filled (true)
  progressElements: boolean[] = [true, false, false, false, false, false, false, false, false];

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
  }


  //route to the page "name"
  nextPageButton() {
    this.router.navigate(['name']);

  }
}
