// lib/uploadClient.ts
// Client helper to upload files to /api/uploads with progress and optional auth token
export type UploadResult = {
  id: string;
  key: string;
  url: string | null;
  mime: string | null;
  size: number | null;
  created_at?: string;
  error?: any;
};

export async function uploadFileToApi(
  file: File,
  options?: {
    workspaceId?: string | null;
    authToken?: string | null; // Bearer token for Authorization header
    onProgress?: (percent: number) => void;
  }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append('file', file);
    if (options?.workspaceId) form.append('workspace_id', options.workspaceId);

    xhr.open('POST', '/api/uploads');

    // Set Authorization header if provided (preferred)
    if (options?.authToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${options.authToken}`);
    }

    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        options.onProgress(percent);
      }
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            if (json && json.file) {
              resolve({
                id: json.file.id,
                key: json.file.key,
                url: json.file.url,
                mime: json.file.mime,
                size: json.file.size,
                created_at: json.file.created_at
              });
            } else {
              resolve({ id: '', key: '', url: null, mime: null, size: null });
            }
          } catch (e) {
            reject(e);
          }
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            reject(err);
          } catch (e) {
            reject({ status: xhr.status, text: xhr.responseText });
          }
        }
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send(form);
  });
}
