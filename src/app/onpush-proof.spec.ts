import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Mirrors the real pattern in blog-posts-section.component.ts:
// subscribe in ngOnInit, assign the result to a plain field.
@Component({
  selector: 'app-eager-probe',
  standalone: true,
  template: `<span class="out">{{ label }}</span>`,
  changeDetection: ChangeDetectionStrategy.Eager,
})
class EagerProbe implements OnInit {
  label = 'empty';
  ngOnInit(): void {
    of('loaded').pipe(delay(100)).subscribe((v) => (this.label = v));
  }
}

@Component({
  selector: 'app-onpush-probe',
  standalone: true,
  template: `<span class="out">{{ label }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushProbe implements OnInit {
  label = 'empty';
  ngOnInit(): void {
    of('loaded').pipe(delay(100)).subscribe((v) => (this.label = v));
  }
}

function textOf(fixture: ComponentFixture<unknown>): string {
  return fixture.nativeElement.querySelector('.out').textContent.trim();
}

describe('OnPush vs Eager with subscribe-then-assign', () => {
  it('Eager picks up the async assignment', fakeAsync(() => {
    const fixture = TestBed.createComponent(EagerProbe);
    fixture.detectChanges();
    expect(textOf(fixture)).toBe('empty');

    tick(100);
    fixture.detectChanges();
    expect(textOf(fixture)).toBe('loaded');
  }));

  it('OnPush does NOT pick up the async assignment', fakeAsync(() => {
    const fixture = TestBed.createComponent(OnPushProbe);
    fixture.detectChanges();
    expect(textOf(fixture)).toBe('empty');

    tick(100);
    fixture.detectChanges();
    // The field is updated, but the view was never marked dirty.
    expect((fixture.componentInstance as OnPushProbe).label).toBe('loaded');
    expect(textOf(fixture)).toBe('empty');
  }));
});
