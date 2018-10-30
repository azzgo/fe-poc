import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static'


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  exports: [],
  providers: [],
})
export class AppModule { 
  constructor(private upgradeModule: UpgradeModule) {}

  public ngDoBootstrap() {
    this.upgradeModule.bootstrap(document.getElementById('app'), ['app'], { strictDi: true })
  }
}
