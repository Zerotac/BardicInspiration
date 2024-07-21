import { Injectable } from '@angular/core';


import { DndClass, Tropes, Funfact } from '../models';
import { NavparamService } from '../../services/navparam.service';

/**
 * Service. Reads JSOn file from the asset folder
 */
@Injectable({
  providedIn: 'root'
})
export class JsonHelperService {

  constructor(private navParamService: NavparamService,) { }

  classArray: DndClass[] = [];
  tropesArray: Tropes[] = [];
  funfactsArray: Funfact[] = [];
  funfactsStringArray: string[] = [];

  /**
   * Read JSON with dnd class & subclass data
   * @param url path to the JSON-File
   */
  async readClassJSON(url: string) {
    this.classArray = await this.fetchAndProcessJson(url);
    this.navParamService.setClassArray(this.classArray);
  }

  /**
  * Read JSON with tropes data
  * @param url path to the JSON-File
  */
  async readTropesJSON(url: string) {
    this.tropesArray = await this.fetchAndProcessJson(url);
    this.navParamService.setTropeArray(this.tropesArray);
  }

  /**
   * Read JSON with funfact data
   * @param url path to the JSON-File
   */
  async readFunfactJSON(url: string) {
    this.funfactsArray = await this.fetchAndProcessJson(url);
    for (const funfact of this.funfactsArray) {
      this.funfactsStringArray.push(funfact.text);
    }
    this.navParamService.setFunfactArray(this.funfactsStringArray);
  }


  /**
   * Processes the JSON File
   * @param url path to the JSON file
   * @returns data of the JSON
   */
  fetchAndProcessJson(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched JSON data:', data); // Debugging: Check the fetched data
          resolve(data); // Resolve the Promise with the fetched data
        })
        .catch(error => {
          console.error('Error fetching JSON data:', error);
          reject(error); // Reject the Promise with the error
        });
    });
  }


}
