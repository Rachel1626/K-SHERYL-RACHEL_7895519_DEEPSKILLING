import { Highlight } from './highlight';
import { ElementRef } from '@angular/core';

describe('Highlight Directive', () => {
  it('should create an instance', () => {
    const el = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(el);
    expect(directive).toBeTruthy();
  });

  it('should have default highlight color as yellow', () => {
    const el = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(el);
    expect(directive.appHighlight).toBe('yellow');
  });

  it('should apply background color on mouseenter', () => {
    const el = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(el);
    directive.onMouseEnter();
    expect(el.nativeElement.style.backgroundColor).toBe('yellow');
  });

  it('should remove background color on mouseleave', () => {
    const el = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(el);
    directive.onMouseLeave();
    expect(el.nativeElement.style.backgroundColor).toBe('');
  });

  it('should use custom highlight color', () => {
    const el = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(el);
    directive.appHighlight = 'lightblue';
    directive.onMouseEnter();
    expect(el.nativeElement.style.backgroundColor).toBe('lightblue');
  });
});
