import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from './i18n.service';

@Directive({
  selector: '[appIntl]'
})
export class I18nDirective implements OnInit, OnDestroy{

  @Input('appIntl') key = '';

  private origHTML ='';
  private localeSub?: Subscription;

  constructor(
    private el: ElementRef<HTMLElement>,
    private i18nSvc: I18nService
  ) {
  }

  ngOnInit(): void {
    this.origHTML = this.el.nativeElement.innerHTML;

    this.localeSub = this.i18nSvc.getTranslation(this.key).subscribe(
      (html) => {
        this._applyTranslation(html);
      }
    )
  }

  ngOnDestroy(): void {
    if(this.localeSub !== undefined){
      this.localeSub.unsubscribe();
      this.localeSub = undefined;
    }
  }

  private _applyTranslation(html: string){
    if(html.length === 0){
      this.el.nativeElement.innerHTML = this.origHTML
    }
    else{
      this.el.nativeElement.innerHTML = html;
    }
  }

}
