import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton } from '@ionic/angular/standalone';

import { DndClass, SubClass } from '../../models';

import { NavparamService } from '../../../services/navparam.service';
import { Router } from '@angular/router';

import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, ProgressbarComponent, IonToolbar, CommonModule, FormsModule, IonGrid, IonCol, IonRow, IonButton]
})
export class ClassPage implements OnInit {

  //for hovering interaction
  isHoveredImg1: boolean = false;
  isHoveredImg2: boolean = false;
  isHoveredImg3: boolean = false;
  hoverClass: string = "";
  hoverText: string = "";

  //array with all DnD classes stored in a JSON
  classArray: DndClass[] = [];


  mainImageUrl: string = "../../../assets/dummie.png";

  //selection of dnd classes
  clericSelected: boolean = false;
  wizardSelected: boolean = false;
  fighterSelected: boolean = false;
  classSelected: boolean = false;

  //currently selected class
  currClass: string = "";
  textcurrClass: string = "";
  selectedText: string = "";
  classPrompt: string = "";

  infoText: string = "";

  //previously selected birthplace and ancestry
  place: string = "";
  race: string = "";




  imageUrl: string = "";
  pathUrl: string = "../../../assets/";

  progressElements: boolean[] = [true, true, true, true, true, false, false, false, false];
  constructor(
    private router: Router,
    private navParamService: NavparamService
  ) { }

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
    //get birthplace, ancestry and array with the dnd classes
    this.place = this.navParamService.getPlace();
    this.race = this.navParamService.getRace();
    this.classArray = this.navParamService.getClassArray();
    this.infoText = "An " + this.race + " from the " + this.place + ", interesting! And what is their occupation?";
  }





  /**
   * Changes the information displayed by the Bard. 
   * @param data array with dnd classes
   * @param classVal the currently hovered dnd class in the UI 
   */
  showInformation(data: DndClass[], classVal: string) {
    for (const classes of data) {
      if (classes.idClass == classVal) {
        this.infoText = classes.descr;
      }
    }
  }


  /**
   * Extracts the prompt-text of the selected DnD-Class.
   * Necessary for the creation of the story at the end with ChatGPT.
   * @param data array with the DnD-classes 
   * @param classVal 
   */
  getPromptText(data: DndClass[], classVal: string) {
    for (const classes of data) {
      if (classes.idClass == classVal) {
        this.classPrompt = classes.prompt;
      }

    }

  }


  /**
   * cleric selected 
   */
  clericClick() {

    if (this.clericSelected == false) {

      this.currClass = "cleric";
      this.selectedText = "Cleric";
      this.imageUrl = this.pathUrl + "cleric.png";
      this.mainImageUrl = this.pathUrl + "clericPerson.png"
      this.resetFunction();
      this.clericSelected = true;
    }
  }


  /**
   * wizard selected (could have been merged into one function with fighterClick & clericClick)
   */
  wizardClick() {

    if (this.wizardSelected == false) {

      this.currClass = "wizard";
      this.selectedText = "Wizard";
      this.imageUrl = this.pathUrl + "wizard.png";
      this.mainImageUrl = this.pathUrl + "wizardPerson.png"
      this.resetFunction();
      this.wizardSelected = true;
    }
  }

  /**
   * fighter selected
   */
  fighterClick() {

    if (this.fighterSelected == false) {
      this.currClass = "fighter";
      this.selectedText = "Fighter";
      this.imageUrl = this.pathUrl + "fighter.png";
      this.mainImageUrl = this.pathUrl + "fighterPerson.png"
      this.resetFunction();
      this.fighterSelected = true;
    }
  }


  /**
   * Resets the selection.
   */
  resetFunction() {
    this.classSelected = true;

    this.clericSelected = false;
    this.wizardSelected = false;
    this.fighterSelected = false;
    this.infoText = "Are you sure you want to play a " + this.currClass + " ? Yes? Then lets continue!";
  }

  /**
   * Called when the user hovers over a dnd class.
   * @param value 
   */
  hoverFunction(value: string) {

    if (value != this.hoverClass) { this.showInformation(this.classArray, value); }
    if (value == "cleric") {
      this.isHoveredImg1 = true;
      this.hoverClass = "cleric";
      this.hoverText = "Cleric";

    }
    if (value == "wizard") {
      this.isHoveredImg2 = true;
      this.hoverClass = "wizard";
      this.hoverText = "Wizard";
    }
    if (value == "fighter") {
      this.isHoveredImg3 = true;
      this.hoverClass = "fighter";
      this.hoverText = "Fighter";
    }
  }

  /**
   * triggered when user leaves the area for hover interaction
   */
  onLeave() {
    this.isHoveredImg1 = false;
    this.isHoveredImg2 = false;
    this.isHoveredImg3 = false;
  }

  /**
   * Navigate to the subclass page & save the values of this page.
   */
  nextPageButton() {

    this.navParamService.setClass(this.currClass);
    this.getPromptText(this.classArray, this.currClass);

    this.navParamService.setClassPrompt(this.classPrompt);
    this.router.navigate(['subclass']);
  }

  /**
   * Navigate to the previous page (birthplace & ancestry)
   */
  backButton() {
    this.router.navigate(['birth']);
  }



}
