import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AugmentCreditPage } from './augment-credit.page';

describe('AugmentCreditPage', () => {
  let component: AugmentCreditPage;
  let fixture: ComponentFixture<AugmentCreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentCreditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AugmentCreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
