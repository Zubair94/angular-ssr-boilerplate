import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocaleService } from '@app/core/services/locale.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  locale$: Subscription;
  router$: Subscription;
  locale: string;
  currentUrl = null;
  constructor(private router: Router, private localeService: LocaleService) { 
    this.router$ = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
     .subscribe((event: NavigationEnd) => {
       this.currentUrl = this.router.url;
       console.log(this.currentUrl);
    });
  }

  ngOnInit() {
    this.localeService.setLocale();
    this.locale$ = this.localeService.getLocale().subscribe(locale => {
      this.locale = locale;
      console.log(this.locale);
    });
  }

  ngOnDestroy(){
    this.router$.unsubscribe();
    this.locale$.unsubscribe();
  }

  resolveHref(){
    if(this.locale === "en"){
      return `${"/bn"}${this.currentUrl}`;
    } else if(this.locale === "bn"){
      return `${"/en"}${this.currentUrl}`;
    } else{
      return `${"/en"}${this.currentUrl}`;
    }
  }
}
