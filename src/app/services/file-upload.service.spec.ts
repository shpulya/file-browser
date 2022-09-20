import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set next path to subject', fakeAsync(() => {
    const newFilePath = 'root/new';
    service.upload(newFilePath);

    tick(5000);

    service.uploadFile$.subscribe((filePath: string) => {
      expect(filePath).toEqual(newFilePath);
    })
  }))
});
