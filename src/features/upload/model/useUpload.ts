import { useState } from 'react';
import { uploadToCloudinary } from '@/shared/api/cloudinary';

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  url: string | null;
}

interface UseUploadReturn extends UploadState {
  upload: (file: File, folder?: string) => Promise<string | null>;
  reset: () => void;
}

/**
 * Hook for uploading files to Cloudinary with state management.
 */
export function useUpload(): UseUploadReturn {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
    url: null,
  });

  const upload = async (file: File, folder?: string): Promise<string | null> => {
    try {
      setState({ uploading: true, progress: 0, error: null, url: null });

      const result = await uploadToCloudinary(file, folder);

      setState({ uploading: false, progress: 100, error: null, url: result.secure_url });
      return result.secure_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload thất bại';
      setState({ uploading: false, progress: 0, error: errorMessage, url: null });
      return null;
    }
  };

  const reset = () => {
    setState({ uploading: false, progress: 0, error: null, url: null });
  };

  return { ...state, upload, reset };
}
