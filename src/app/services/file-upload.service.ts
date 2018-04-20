import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { PathConfig } from '../../app-config/path.config';
import { RestApiService } from './rest-api.service';

@Injectable()
export class FileUploadService {
    constructor(
        private restApiService: RestApiService,
    ) {
    }

    public uploadFile(fileToUpload: File): Observable<boolean> {
        let formData: FormData = new FormData();
        formData.append('photo', fileToUpload, fileToUpload.name);
        return this.restApiService
            .postItem(PathConfig.uploadLotteryImageEndpoint, formData);
    }

}
