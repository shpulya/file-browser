import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UploadComponent } from './upload.component';
import { FileUploadService } from '../../services/file-upload.service';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      providers: [FileUploadService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const query = (selector: string) => document.querySelector(selector) as HTMLElement;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call browse method by click', () => {
    const onClickBrowse = spyOn(component, 'browseFile');

    fixture.debugElement.query(By.css('.browse-btn')).triggerEventHandler('click', null);
    expect(onClickBrowse).toHaveBeenCalled();
  });

  it('should disable upload button before file selection', () => {
    const uploadBtn = fixture.debugElement.query(By.css('.upload-btn')).nativeElement;
    const browseBtn = fixture.debugElement.query(By.css('.browse-btn')).nativeElement;

    component.currentFile = null;

    expect(uploadBtn.disabled).toBeTrue();
    expect(browseBtn.disabled).not.toBeTrue();
  });

  it('should start loading on upload and hide progress bar after loading', fakeAsync(() => {
    const fileName = 'filename';
    const mockFile = new File([''], fileName, { type: 'text/html' });

    component.currentFile = mockFile;
    component.filePath = fileName;

    component.onUpload();
    fixture.detectChanges();

    const progressBarVisible = fixture.debugElement.query(By.css('.progress-bar'))

    expect(progressBarVisible).toBeTruthy();

    tick(6000);
    fixture.detectChanges();

    const progressBarInvisible = fixture.debugElement.query(By.css('.progress-bar'))

    expect(progressBarInvisible).not.toBeTruthy();
  }))
});
