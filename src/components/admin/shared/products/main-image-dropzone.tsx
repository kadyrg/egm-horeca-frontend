"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/admin/ui/dropzone";
import { UploadIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface MainImageUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
}

function ImageDropzone({ value, onChange }: MainImageUploadProps) {
  const [filePreview, setFilePreview] = useState<string | undefined>();

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target.result);
        }
      };
      reader.readAsDataURL(value);
    } else {
      setFilePreview(undefined);
    }
  }, [value]);

  const handleDrop = (files: File[]) => {
    const file = files[0] ?? null;
    if (onChange) onChange(file);
  };

  return (
    <Dropzone
      className="w-full h-full aspect-5/6 p-0"
      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
      onDrop={handleDrop}
      onError={console.error}
      src={value ? [value] : undefined}
    >
      <DropzoneEmptyState>
        <div className="flex flex-col items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <UploadIcon size={16} />
          </div>
          <p className="my-2 w-full truncate text-wrap font-medium text-sm">
            Upload image
          </p>
        </div>
      </DropzoneEmptyState>
      <DropzoneContent>
        {filePreview && (
          <div className="relative w-full h-full overflow-hidden">
            <img
              alt="Preview"
              className="absolute top-0 left-0 h-full w-full object-cover"
              src={filePreview}
            />
          </div>
        )}
      </DropzoneContent>
    </Dropzone>
  );
}

export { ImageDropzone };
