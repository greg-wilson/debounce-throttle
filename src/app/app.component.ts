import { Component, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { of, timer, interval, fromEvent } from 'rxjs';
import { debounce, map } from 'rxjs/operators';

import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = _.toUpper('debounce-throttle');

  throttledFunc: any;

  debounceFun: any;

  @HostListener('mousemove', ['$event'])
  mouseMoveEvent(data) {
    // this.throttledFunc(data);
    this.debounceFun(data);
  }

  constructor(private elementRef: ElementRef) {
    // throttle the mouse move
    this.throttledFunc = _.throttle((mouseData: any) => this.mouseMove(mouseData), 1000);
    // debouce the mouse move
    this.debounceFun = _.debounce((mouseData: any) => this.mouseMove(mouseData), 1000);
  }

  ngAfterViewInit() {
    this.fromClick();
  }

  public fromClick() {
    const source = fromEvent(this.elementRef.nativeElement, 'click').pipe(debounce(() => timer(1000)));
    source.subscribe((val: MouseEvent) => console.log(`mouse CLICK x: ${val.x} y: ${val.y} `));
  }

  public mouseMove(data: MouseEvent) {
    console.log(`mouse MOVE x: ${data.x} y: ${data.y} `);
  }
}
