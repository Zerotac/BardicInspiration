import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';


import { NavparamService } from '../../../services/navparam.service';

import { Router } from '@angular/router';

import { DndClass } from '../../models';

import {ProgressbarComponent} from '../../components/progressbar/progressbar.component';
interface subclassElements {
  id: string;
  url: string;
  personImUrl: string;
  name: string;
  prompt: string;
  isSelected: boolean;
  isHovered: boolean;
}


/**
 * Page for subclass selection
 */
@Component({
  selector: 'app-subclass',
  templateUrl: './subclass.page.html',
  styleUrls: ['./subclass.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,ProgressbarComponent]
})
export class SubclassPage implements OnInit {


  infoText: string = "";

  class: string = "";

  url: string = '../../../assets/subclassJSON.json';
  imagePath: string = "../../../assets/";
  centerImgURL: string = "../../../assets/dummie.png";

  classArray: DndClass[] = [];

  subclassElements: subclassElements[] = [];
  selectedSubClass: string = "";
  subClassPrompt: string = "";
  hoverText: string = "";

  progressElements: boolean[] = [true, true, true, true, true, true, false, false, false];
  constructor(
    private router: Router,
    private navParamService: NavparamService,

  ) {

  }

  ngOnInit() {
    this.navParamService.setProgressBar(this.progressElements);
    //get selected class
    this.class = this.navParamService.getClass();
    this.infoText = "What area of expertise does your " + this.class + " specialise in?";
    this.classArray = this.navParamService.getClassArray();
    //change the UI depending on the selected dnd-class (class-Page)
    this.changeUI(this.classArray, this.class);
  }


  /**
   * display information to the selected subClass
   * @param data array with the dnd-class & subclass data
   * @param classVal previously selected dnd-class (class-page)
   * @param subClassVal selected subclass
   */
  showInformation(data: DndClass[], classVal: string, subClassVal: string) {
    for (const classes of data) {
      if (classes.idClass == classVal) {

        this.infoText = classes.descr;

        for (const child of classes.subclasses) {
          if (child.idSubclass == subClassVal) {
            this.infoText = child.info;
          }

        }

      }

    }

  }

  /**
   * Selected Subclass
   * @param item includes subclass data
   */
  subclassClick(item: subclassElements) {
    this.resetSelection();
    item.isSelected = !item.isSelected;

    this.infoText = "You selected the subclass " + item.name + ". If you are satisfied with that, we will continue ";
    this.centerImgURL = item.personImUrl;
    this.selectedSubClass = item.id;
    this.subClassPrompt = item.prompt;
  }

  /**
   * resets Selections before a new one can be made
   */
  resetSelection() {
    this.subclassElements.forEach(item => {
      item.isSelected = false;
    });
  }

  /**
   * displays information to a subclass when the user hovers a sublass-element
   * @param element 
   */
  hoverFunction(element: subclassElements) {
    ;
    this.showInformation(this.classArray, this.class, element.id);
    element.isHovered = true;
    this.hoverText = element.name;
  }


  /**
   * Change the UI depending on the previously selected dnd-class
   * @param data array with the dnd-class &subclass information
   * @param classVal selected dnd-class from the previous page (class-page)
   */
  changeUI(data: DndClass[], classVal: string) {

    for (const classes of data) {

      if (classes.idClass == classVal) {
        this.centerImgURL = this.imagePath + classes.image;
        for (const child of classes.subclasses) {
          //store data in subclassElements-Elements -> necessary to display elements dynamically in the UI
          const newItem: subclassElements = { id: child.idSubclass, url: this.imagePath + child.image, name: child.name, prompt: child.subPrompt, isSelected: false, isHovered: false, personImUrl: this.imagePath + child.imagePerson };
          this.subclassElements.push(newItem);
        }
      }

    }

  }

  /**
   * Leave hover interaction
   * @param element hovered element
   */
  onLeave(element: subclassElements) {

    element.isHovered = false;

  }

  /**
   * Save selections and navigate to the nect page (tropes)
   */
  nextPageButton() {
    this.navParamService.setSubClass(this.selectedSubClass);
    this.navParamService.setImage(this.centerImgURL);
    this.navParamService.setSubClassPrompt(this.subClassPrompt);

    this.router.navigate(['tropes']);
  }

  /**
   * navigate to the previous page (class)
   */
  backButton() {
    this.router.navigate(['class']);
  }


}
