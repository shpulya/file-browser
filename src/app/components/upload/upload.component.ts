import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
  public loading!: boolean;
  public complete!: boolean;
  public currentFile!: File | null;
  public filePath: string = '';

  @ViewChild('fileInput')
  private fileInputRef!: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();

  // @ts-ignore
  constructor(
    private fileUploadService: FileUploadService
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onUpload(): void {
    this.loading = true;

    if (!this.currentFile || !this.filePath) {
      return;
    }

    this.fileUploadService.upload(this.filePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (event: string) => {
        this.fileUploadService.uploadFile$.next(event);
      },
      error: (err: any) => {
        this.loading = false
        this.currentFile = null;
        console.error('Could not upload the file!');
      },
      complete: () => {
        this.loading = false;
        this.complete = true;
      }
    });
  }

  public browseFile(): void {
    this.currentFile = null;
    this.complete = false;
    this.filePath = '';
    this.fileInputRef.nativeElement.click();
  }

  public onChange(event: Event): void {
    this.currentFile = (<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files!.item(0);
    if (!this.currentFile) return;

    this.filePath = this.currentFile!.name;
  }
}
