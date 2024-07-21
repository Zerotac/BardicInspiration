import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, } from '@ionic/angular/standalone';

import { Router } from '@angular/router';

import { NavparamService } from '../../../services/navparam.service';

import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
/**
 * Page for pronoun selection
 */
@Component({
  selector: 'app-pronoun',
  templateUrl: './pronoun.page.html',
  styleUrls: ['./pronoun.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,ProgressbarComponent, IonToolbar, CommonModule, FormsModule, IonButton, IonInput]
})
export class PronounPage implements OnInit {

  charName: string = "";

  inactiveColor: string = "secondary";

  //he pronoun
  heColorParam: string = this.inactiveColor;
  heFillParam: string = "outline";
  disableHeButton: boolean = false;

  //she pronoun
  sheColorParam: string = this.inactiveColor;
  sheFillParam: string = "outline";
  disableSheButton: boolean = false;


  //they/them pronouns
  theyColorParam: string = this.inactiveColor;
  theyFillParam: string = "outline";
  disableTheyButton: boolean = false;

  //own pronouns
  ownpronouns: string = "";
  isTyping: boolean = false;

  //end pronoun
  pronouns: string = "";


  progressElements: boolean[] = [true, true, true, false, false, false, false, false, false];
  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) { }

  ngOnInit() {
    this.charName = this.navParamService.getCharName();
    this.navParamService.setProgressBar(this.progressElements);

  }

  /**
   * He/him pronouns selected 
   * @param inputField value of the input field for own pronouns 
   */
  heButtonClicked(inputField: IonInput) {
    this.resetButtons();
    this.pronouns = "he/him";
    this.disableHeButton = true;
    this.heFillParam = "solid";
    this.heColorParam = "dark";

    //clears input field if the user has written something in
    inputField.value = "";
  }

  /**
   * She/her pronouns selected 
   * @param inputField value of the input field for own pronouns 
   */
  sheButtonClicked(inputField: IonInput) {
    this.resetButtons();
    this.pronouns = "she/her";
    this.disableSheButton = true;
    this.sheFillParam = "solid";
    this.sheColorParam = "dark";
    //clears input field if the user has written something in
    inputField.value = "";
  }

  /**
   * they/them  pronouns selected 
   * @param inputField value of the input field for own pronouns 
   */
  theyButtonClicked(inputField: IonInput) {
    this.resetButtons();
    this.pronouns = "they/them";
    this.disableTheyButton = true;
    this.theyFillParam = "solid";
    this.theyColorParam = "dark";
    //clears input field if the user has written something in
    inputField.value = "";
  }


  /**
   * Resets the buttons before a new selection is made
   */
  resetButtons() {

    this.disableHeButton = false;
    this.heFillParam = "outline";
    this.heColorParam = this.inactiveColor;


    this.sheColorParam = this.inactiveColor;
    this.sheFillParam = "outline";
    this.disableSheButton = false;


    this.theyColorParam = this.inactiveColor;
    this.theyFillParam = "outline";
    this.disableTheyButton = false;
  }



  /**
   * Check for input in the input field (for own pronouns)
   * @param event user writes something in the input field
   */
  onInput(event: any) {
    this.isTyping = event.target.value.length > 0;
    if (this.isTyping) this.resetButtons();
    this.pronouns = event.target.value;
  }


  /**
   * Navigate to the next page ("birthplace & ancestry")
   */
  nextPageButton() {

    this.navParamService.setPronouns(this.pronouns);
    this.router.navigate(['birth']);
  }

  /**
   * Navigate to the previous page ("character name")
   */
  backButton() {
    this.router.navigate(['name']);
  }


}
