import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { BranchOfficeModel } from '../../models/branchoffice.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  uploadFile(selectedFile: File){
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name)
    return this.httpClient.post("http://localhost:51680/api/File/PostImage", fd);
  }
}
