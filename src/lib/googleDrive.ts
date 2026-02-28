/**
 * Google Drive API integration for fetching gallery media
 */

// Type removed to troubleshoot export error

const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const FOLDER_ID = '14DrwqAZsAzYgmAwj_pBy2g_QVi8MwlmJ';

/**
 * Fetches files from a specific Google Drive folder and its subfolders
 */
export const fetchDriveFiles = async () => {
  try {
    if (!GOOGLE_DRIVE_API_KEY) {
      console.warn('Google Drive API key not found.');
      return [];
    }

    const driveParams = '&supportsAllDrives=true&includeItemsFromAllDrives=true';

    // 1. Fetch subfolders in the root folder
    const folderQuery = encodeURIComponent(`'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
    const folderUrl = `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&fields=files(id,name)${driveParams}&key=${GOOGLE_DRIVE_API_KEY}`;
    
    console.log('Fetching subfolders from:', FOLDER_ID);
    const folderResponse = await fetch(folderUrl);
    const folderData = await folderResponse.json();
    console.log('Subfolders found:', folderData.files?.length || 0);
    
    const subfolders = folderData.files || [];
    const allFiles: any[] = [];

    // 2. Fetch files from each subfolder
    for (const folder of subfolders) {
      const fileQuery = encodeURIComponent(`'${folder.id}' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')`);
      const fileFields = 'files(id,name,description,mimeType,thumbnailLink,webContentLink,createdTime)';
      const fileUrl = `https://www.googleapis.com/drive/v3/files?q=${fileQuery}&fields=${fileFields}${driveParams}&key=${GOOGLE_DRIVE_API_KEY}&orderBy=createdTime desc`;

      const fileResponse = await fetch(fileUrl);
      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        console.log(`Files in folder "${folder.name}":`, fileData.files?.length || 0);
        const filesWithFolder = (fileData.files || []).map((f: any) => ({
          ...f,
          folderName: folder.name
        }));
        allFiles.push(...filesWithFolder);
      }
    }

    // 3. Also check for files directly in the root folder
    const rootFileQuery = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')`);
    const rootFileUrl = `https://www.googleapis.com/drive/v3/files?q=${rootFileQuery}&fields=files(id,name,description,mimeType,thumbnailLink,webContentLink,createdTime)${driveParams}&key=${GOOGLE_DRIVE_API_KEY}`;
    
    const rootFileResponse = await fetch(rootFileUrl);
    if (rootFileResponse.ok) {
      const rootFileData = await rootFileResponse.json();
      console.log('Direct files in root:', rootFileData.files?.length || 0);
      allFiles.push(...(rootFileData.files || []));
    }

    return allFiles;
  } catch (error) {
    console.error('Error in fetchDriveFiles:', error);
    return [];
  }
};

/**
 * Converts a Google Drive file ID to a direct image link safely.
 * Note: Requires the file to be shared "Anyone with the link".
 */
export const getDriveImageUrl = (fileId: string, thumbnailLink?: string): string => {
  // If we have the thumbnailLink from the API, use it but remove the =s220 suffix for original size
  if (thumbnailLink) {
    return thumbnailLink.replace(/=s\d+$/, '=s2000');
  }
  // Fallback to the user content link
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

/**
 * Gets a video URL for the Drive file.
 */
export const getDriveVideoUrl = (fileId: string): string => {
  return `https://drive.google.com/file/d/${fileId}/preview`;
};
