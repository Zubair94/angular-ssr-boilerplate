# Angular Frontend With SSR

Angular Frontend App With Server Side Rendering.

# Features
Lazy Loading, Server Side Rendering, Modular, Localization(Only Bengali and English Support)    
Server Side Rendering Platform Service for Native Browser Api Support(document, window, localstorage etc)  
Localizaiton supported for both Browser and Server Builds(Enables SEO Support for i18n)  

# Dependencies
NG Universal Package  
Boostrap(ng-bootstrap)  
ngx-toastr  
Angular Fontawesome Package  
Check package.json for details.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build or the `--aot` flag for ahead of time compilation.

## Build SSR

Run `npm run angular-ssr:ssr` to build the project with SSR.

## Build SSR for i18n (localization)

Run `npm run angular-ssr:ssr-i18n` to build the projet with SSR + locale(English and Bangla).

## Only compile and serve server.ts

Run `npm run angular-ssr:ssr-server`.

## SSR Important Notes!!!

For any errors in SSR Build related to document, window, localstorage i.e. browser types not available in server, use checkPlatformServer() in PlatformService of CoreModule. 

Instead of
```
resizeWindow(){
    this.deviceWidth = window.innerWidth;
}
```
Use 
```
constructor(private plaformService: PlatformService){}
resizeWindow(){
    if(!this.platformService.checkPlatformServer()){ 
        this.deviceWidth = window.innerWidth; //this if-statement checks if platform is Server 
    }
}
```