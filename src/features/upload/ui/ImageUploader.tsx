import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useUpload } from '@/features/upload/model/useUpload';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

export function ImageUploader() {
  const { uploading, error, url, upload, reset } = useUpload();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Show local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (file) {
      await upload(file, 'vote-uploads');
    }
  };

  const handleClear = () => {
    setPreview(null);
    reset();
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={cn(
          'relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50',
          preview && 'border-solid'
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-[300px] rounded-lg object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-8 text-muted-foreground">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm font-medium">Kéo thả hình ảnh vào đây</p>
            <p className="text-xs">hoặc click để chọn file</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Uploaded URL */}
      {url && (
        <div className="rounded-md bg-primary/10 p-3 text-sm">
          <p className="font-medium text-primary">Upload thành công!</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-xs text-muted-foreground hover:text-foreground"
          >
            {url}
          </a>
        </div>
      )}

      {/* Upload Button */}
      {preview && !url && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Đang upload...' : 'Upload lên Cloudinary'}
        </Button>
      )}
    </div>
  );
}
