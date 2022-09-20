import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public fileList: Array<string> = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fileUploadService: FileUploadService) {
  }

  public ngOnInit(): void {
    this.fileUploadService.uploadFile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((uploadFile: string) => this.fileList.push(uploadFile));
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearList(): void {
    this.fileList = [];
  }
}
