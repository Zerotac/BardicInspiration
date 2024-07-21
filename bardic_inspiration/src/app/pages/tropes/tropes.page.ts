import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

import { NavparamService } from '../../../services/navparam.service';
import { Router } from '@angular/router';
import { Tropes } from '../../models';


import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
/**
 * Page for trope selection
 */
@Component({
  selector: 'app-tropes',
  templateUrl: './tropes.page.html',
  styleUrls: ['./tropes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ProgressbarComponent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class TropesPage implements OnInit {

  tropesArray: Tropes[] = [];

  infoText: string = "I already have some great ideas! Please choose one common narrative trope that shall inspire your character\'s backstory."

  selectedTrope: Tropes | null = null;
  chatResponse: string = "";

  progressElements: boolean[] = [true, true, true, true, true, true, true, false, false];
  constructor(
    private router: Router,
    private navParamService: NavparamService,

  ) { }

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
    //get trope data
    this.tropesArray = this.navParamService.getTropeArray();

  }

  /**
   * Hover interaction
   * @param trope currently hovered trope
   */
  hoverFunction(trope: Tropes) {
    this.infoText = trope.bardComment;

  }

  onLeave(trope: Tropes) {

  }

  /**
   * Select trope
   * @param trope current trope
   */
  clickTrope(trope: Tropes) {
    this.resetSelection();
    trope.isSelected = true;
    this.selectedTrope = trope;

  }

  /**
   * Reset selections before a new one can be made
   */
  resetSelection() {
    this.tropesArray.forEach(item => {
      item.isSelected = false;
    });
  }


  /**
   * Save selections and navigate to the next page (story)
   */
  nextPageButton() {
    if (this.selectedTrope) {
      this.navParamService.setTrope(this.selectedTrope);
      this.router.navigate(['story']);
    }
  }

  /**
   * Navigate to the previous page (subclass)
   */
  backButton() {
    this.router.navigate(['subclass']);
  }


}
