import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I18nService } from './i18n.service';

@Directive({
  selector: '[appIntl]'
})
export class I18nDirective implements OnInit, OnDestroy{

  @Input('appIntl') key: string = '';

  private origHTML: string ='';
  private localeSub?: Subscription;

  constructor(
    private el: ElementRef,
    private i18nSvc: I18nService
  ) {
  }

  ngOnInit(): void {
    this.origHTML = this.el.nativeElement.innerHTML;
    if(!this.i18nSvc.enabled){
      // no need to subscribe while i18n is not active.
      return;
    }

    this.localeSub = this.i18nSvc.getTranslation(this.key).subscribe(
      (html) => { this.applyTranslation(html); }
    )
  }

  ngOnDestroy(): void {
    if(this.localeSub !== undefined){
      this.localeSub.unsubscribe();
      this.localeSub = undefined;
    }
  }

  private applyTranslation(html: string){
    if(html.length === 0){
      this.el.nativeElement.innerHTML = this.origHTML
    }
    else{
      this.el.nativeElement.innerHTML = html;
    }
  }

}
