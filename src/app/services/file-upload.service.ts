import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject } from 'rxjs';

@Injectable()
export class FileUploadService {
  uploadFile$: Subject<string> = new Subject<string>();

  constructor() { }

  upload(fileName: string):Observable<string> {
    return of(fileName).pipe(delay(5000));
  }
}
