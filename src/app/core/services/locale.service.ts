import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = new BehaviorSubject<string>("en");
  constructor(@Inject(LOCALE_ID) private locale) { };

  setLocale(){
    if(this.locale === "bn"){
      this.currentLocale.next("bn"); 
    } else if(this.locale === "en"){
      this.currentLocale.next("en");
    } else{
      this.currentLocale.next("en");
    }
  }

  getLocale(){
    return this.currentLocale.asObservable();
  }
}
