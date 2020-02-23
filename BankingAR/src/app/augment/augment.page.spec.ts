import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AugmentPage } from './augment.page';

describe('AugmentPage', () => {
  let component: AugmentPage;
  let fixture: ComponentFixture<AugmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AugmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
