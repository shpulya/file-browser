import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HistoryComponent } from './history.component';
import { FileUploadService } from '../../services/file-upload.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let clearBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [FileUploadService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    clearBtn = fixture.debugElement.query(By.css('.clear-btn')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disabled Clear Button with empty list', () => {
    expect(clearBtn.disabled).toBeTrue();
  })

  it('should enable button with not empty list', () => {
    const onClickBrowse = spyOn(component, 'clearList');

    component.fileList = ['path'];
    fixture.detectChanges();

    expect(clearBtn.disabled).not.toBeTrue();

    clearBtn.click();

    fixture.whenStable().then(() => {
      expect(onClickBrowse).toHaveBeenCalled();
    });
  })
});
