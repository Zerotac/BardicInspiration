import { Injectable } from '@angular/core';
import { DndClass, Tropes } from '../app/models';

import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Service. Saves selections and data from the user, read JSON-Files and the chatGPT API
 */
@Injectable({
  providedIn: 'root'
})
export class NavparamService {

  navCharName: string = "";
  navPronouns: string = "";
  navRace: string = "";
  navPlace: string = "";
  navClass: string = "";
  navClassPrompt: string = "";
  navSubClass: string = "";
  navSubClassPrompt: string = "";
  navTrope: Tropes | null = null;
  navimageUrl: string = "";
  navStory: string = "";

  classArray: DndClass[] = [];

  tropesArray: Tropes[] = [];

  funfactArray: string[] = [];


  progressElements: boolean[] = [true, false, false, false, false, false, false, false, false];

  constructor() { }

  setProgressBar(array:boolean[]){
    this.progressElements = array;
  }

  getProgressBar(){
    return this.progressElements;
  }


  //Class Array with all the class Informations

  setClassArray(array: DndClass[]) {
    this.classArray = array;
  }

  getClassArray() {
    return this.classArray;
  }



  //tropes Array with all the tropes information
  setTropeArray(array: Tropes[]) {
    this.tropesArray = array;
  }

  getTropeArray() {
    return this.tropesArray;
  }


  //funfact Array with all the tropes information
  setFunfactArray(array: string[]) {

    this.funfactArray = array;

  }

  getFunfactArray() {

    return this.funfactArray;
  }

  //to display funfacts over a time interval
  getFunfactDataStream(): Observable<string> {
    return interval(4000).pipe( // Emit every 2 seconds 
      map(() => this.funfactArray[Math.floor(Math.random() * this.funfactArray.length)])
    );
  }
  getFirstFunfactData(): string {
    return this.funfactArray[Math.floor(Math.random() * this.funfactArray.length)];
  }




  //Character name
  setCharName(navCharName: string) {
    this.navCharName = navCharName;
  }

  getCharName() {
    if (this.navCharName != null) { return this.navCharName; }
    return "";
  }

  //Pronouns
  setPronouns(navPronouns: string) {
    this.navPronouns = navPronouns;
  }

  getPronouns() {
    if (this.navPronouns != null) { return this.navPronouns; }
    return "";
  }


  //Race
  setRace(navRace: string) {
    this.navRace = navRace;
  }

  getRace() {
    if (this.navRace != null) { return this.navRace; }
    return "";
  }



  //Birtplace
  setPlace(navPlace: string) {
    this.navPlace = navPlace;
  }

  getPlace() {
    if (this.navPlace != null) { return this.navPlace; }
    return "";
  }


  //Class
  setClass(navClass: string) {
    this.navClass = navClass;
  }

  getClass() {
    if (this.navClass != null) { return this.navClass; }
    return "";
  }

  setClassPrompt(navClassPrompt: string) {

    this.navClassPrompt = navClassPrompt;
  }
  getClassPrompt() {
    if (this.navClassPrompt != null) { return this.navClassPrompt; }
    return "";
  }


  //SubClass
  setSubClass(navSubClass: string) {
    this.navSubClass = navSubClass;
  }

  getSubClass() {
    if (this.navSubClass != null) { return this.navSubClass; }
    return "";
  }

  setSubClassPrompt(navSubClassPrompt: string) {
    this.navSubClassPrompt = navSubClassPrompt;
  }
  getSubClassPrompt() {
    if (this.navSubClassPrompt != null) { return this.navSubClassPrompt; }
    return "";
  }

  setImage(navimageUrl: string) {
    this.navimageUrl = navimageUrl;
  }

  getImage() {
    if (this.navimageUrl != null) { return this.navimageUrl; }
    return "";
  }




  //Trope
  setTrope(trope: Tropes) {
    this.navTrope = trope;
  }

  getTrope() {
    if (this.navTrope != null) { return this.navTrope; }
    return this.navTrope;
  }


  //Finished Story
  setStory(story: string) {
    this.navStory = story;
  }

  getStory() {
    if (this.navStory != null) { return this.navStory; }
    return "";
  }

}
