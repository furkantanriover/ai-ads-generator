"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File, Image as ImageIcon, Play, Upload, Video, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";

// Types
interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface FileUploadProps {
  onUpload?: (files: UploadedFile[]) => void;
  onFileClick?: (index: number) => void; // Yeni prop: dosyaya tıklandığında
  maxFileSize?: number;
  maxFiles?: number;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  onFileClick,
  maxFileSize = 50,
  maxFiles = 10,
  className = "",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles: UploadedFile[] = [];

      Array.from(files).forEach((file) => {
        if (uploadedFiles.length + newFiles.length >= maxFiles) {
          alert(`Maksimum ${maxFiles} dosya yükleyebilirsiniz!`);
          return;
        }

        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          alert("Sadece resim ve video dosyaları yükleyebilirsiniz!");
          return;
        }

        if (file.size > maxFileSize * 1024 * 1024) {
          alert(`Dosya boyutu ${maxFileSize}MB'dan küçük olmalıdır!`);
          return;
        }

        const fileId = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        const type = file.type.startsWith("image/") ? "image" : "video";

        newFiles.push({ id: fileId, file, preview, type });
      });

      if (newFiles.length > 0) {
        setUploadedFiles((prev) => {
          const updatedFiles = [...prev, ...newFiles];
          onUpload?.(updatedFiles);
          return updatedFiles;
        });
      }
    },
    [uploadedFiles.length, maxFiles, maxFileSize, onUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setUploadedFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === fileId);
        if (fileToRemove) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updatedFiles = prev.filter((f) => f.id !== fileId);
        onUpload?.(updatedFiles);
        return updatedFiles;
      });
    },
    [onUpload]
  );

  const clearAllFiles = useCallback(() => {
    uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
    onUpload?.([]);
  }, [uploadedFiles, onUpload]);

  const handleFileClick = useCallback(
    (index: number) => {
      onFileClick?.(index);
    },
    [onFileClick]
  );

  // Public method to get uploaded files

  return (
    <Card
      className={`shadow-lg border-border bg-card/80 backdrop-blur-sm ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <Upload className="h-5 w-5 text-primary" />
          Upload Video/Image
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Video ve resim dosyalarınızı yükleyin (Maks. {maxFileSize}MB)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragOver
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isDragOver ? "Dosyaları bırakın" : "Dosyaları buraya sürükleyin"}
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              veya{" "}
              <span className="text-primary font-medium">tıklayarak seçin</span>
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                <span>JPG, PNG, GIF</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>MP4, MOV, AVI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Files Gallery */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <File className="h-4 w-4" />
              Yüklenen Dosyalar ({uploadedFiles.length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {uploadedFiles.map((uploadedFile, index) => (
                <div
                  key={uploadedFile.id}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border hover:border-primary/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleFileClick(index)}
                >
                  {uploadedFile.type === "image" ? (
                    <Image
                      width={100}
                      height={100}
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={uploadedFile.preview}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-background/90 rounded-full flex items-center justify-center">
                          <Play className="h-4 w-4 text-foreground" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs px-2 py-1 ${
                        uploadedFile.type === "image"
                          ? "bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400"
                          : "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400"
                      }`}
                    >
                      {uploadedFile.type === "image" ? (
                        <ImageIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <Video className="h-3 w-3 mr-1" />
                      )}
                      {uploadedFile.type.toUpperCase()}
                    </Badge>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(uploadedFile.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-white text-xs font-medium truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-white/80 text-xs">
                      {(uploadedFile.file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearAllFiles}
              className="w-full py-2 px-4 text-sm text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg transition-colors duration-200 border border-destructive/20 hover:border-destructive/30"
            >
              Tüm Dosyaları Temizle
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Export both component and getUploadedFiles method
export default FileUpload;
export type { UploadedFile };
