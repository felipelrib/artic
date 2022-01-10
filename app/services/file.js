import api from './api.js';
import * as fs from 'fs';
import * as FormData from 'form-data';

const uploadFile = async (file) => {
    let fileRecord = null;

    const formData = new FormData();
    formData.append("files", fs.createReadStream(file.filepath), file.originalFilename);
    const response = await api.post(`/upload`, formData, {headers: { ...formData.getHeaders() }});
    if (Array.isArray(response.data)) {
        fileRecord = response.data[0];
    }

    return fileRecord;
}

export { uploadFile };
