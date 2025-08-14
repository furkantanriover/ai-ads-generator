"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

// Types
interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface FullScreenGalleryProps {
  files: UploadedFile[];
  selectedIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

const FullScreenGallery: React.FC<FullScreenGalleryProps> = ({
  files,
  selectedIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    selectedIndex
  );
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Update current index when selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== null) {
      setCurrentIndex(selectedIndex);
      setZoom(1);
      setRotation(0);
    }
  }, [selectedIndex]);

  // Navigation function with smooth transition
  const navigateFile = useCallback(
    (direction: "prev" | "next") => {
      if (currentIndex === null || files.length === 0 || isLoading) return;

      setIsLoading(true);

      let newIndex: number;
      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
      } else {
        newIndex = currentIndex < files.length - 1 ? currentIndex + 1 : 0;
      }

      // Reset zoom and rotation for new image
      setZoom(1);
      setRotation(0);

      setTimeout(() => {
        setCurrentIndex(newIndex);
        onNavigate?.(newIndex);
        setIsLoading(false);
      }, 150);
    },
    [currentIndex, files.length, onNavigate, isLoading]
  );

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => prev + 90);
  }, []);

  const handleDownload = useCallback(() => {
    if (currentIndex === null || !files[currentIndex]) return;

    const file = files[currentIndex];
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentIndex, files]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          navigateFile("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateFile("next");
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "r":
        case "R":
          e.preventDefault();
          handleRotate();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [
    isOpen,
    onClose,
    navigateFile,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
  ]);

  if (!isOpen || currentIndex === null || !files[currentIndex]) {
    return null;
  }

  const selectedFile = files[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header Controls */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/95 to-black/60 p-4"
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4">
                <h2 className="text-white font-medium text-lg truncate max-w-md">
                  {selectedFile.file.name}
                </h2>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <span>
                    {(selectedFile.file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                  <span>•</span>
                  <span>{selectedFile.type.toUpperCase()}</span>
                  <span>•</span>
                  <span>
                    {currentIndex + 1} / {files.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedFile.type === "image" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomOut();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-white/70 text-sm min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomIn();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      disabled={zoom >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <RotateCw className="h-4 w-4" />
                    </button>
                  </>
                )}
                {selectedFile.type === "video" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomOut();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-white/70 text-sm min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZoomIn();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      disabled={zoom >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate();
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <RotateCw className="h-4 w-4" />
                    </button>
                  </>
                )}
                <div className="text-white/70 text-sm">
                  Video Player - Kontroller video üzerinde
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-16">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedFile.type === "image" ? (
                <motion.img
                  src={selectedFile.preview}
                  alt={selectedFile.file.name}
                  className="max-w-[80vw] max-h-[70vh] object-contain select-none"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transition: "transform 0.3s ease-out",
                    minWidth: "300px",
                    minHeight: "200px",
                  }}
                  draggable={false}
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <motion.video
                  src={selectedFile.preview}
                  className="max-w-[80vw] max-h-[70vh] object-contain"
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  playsInline
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transition: "transform 0.3s ease-out",
                    minWidth: "300px",
                    minHeight: "200px",
                  }}
                  onLoadedData={() => setIsLoading(false)}
                />
              )}

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          {files.length > 1 && (
            <>
              <motion.button
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFile("prev");
                }}
                disabled={isLoading}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFile("next");
                }}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </>
          )}

          {/* Bottom Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center text-white/70 text-sm">
                <p>
                  Klavye kısayolları: ← → (navigasyon), + - (zoom), R (döndür),
                  ESC (kapat)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenGallery;
export type { UploadedFile };
