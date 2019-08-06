import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isServer: boolean = true;
  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isServer = isPlatformServer(this.platformId);
  }

  isPlatformServer(){
    return this.isServer;
  }
}
