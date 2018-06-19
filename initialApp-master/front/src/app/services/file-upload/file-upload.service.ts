import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { BranchOfficeModel } from '../../models/branchoffice.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  uploadFile(selectedFiles: File[]){
    const fd = new FormData();
    for (let selectedFile of selectedFiles){
      fd.append(selectedFile.name, selectedFile)
    }    
    return this.httpClient.post("http://localhost:51680/api/File/PostImage", fd);
  }
}
