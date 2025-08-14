"use client";

import FileUpload, { type UploadedFile } from "@/components/file-upload";
import FullScreenGallery from "@/components/full-screen-gallery"; // Bu import eksikti
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVideoData } from "@/hooks/use-video-data";
import { motion } from "framer-motion";
import {
  Download,
  Edit3,
  FileText,
  Loader2,
  Mic,
  Play,
  Share2,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

// TypeScript interfaces
interface Avatar {
  id: number;
  name: string;
  preview: string;
}

interface Voice {
  id: string;
  name: string;
  language: string;
}

interface Script {
  content: string;
  scriptId?: number;
}

const VideoIdPage: React.FC = () => {
  const { video_id } = useParams<{ video_id: string }>();
  const { videoData, isLoading, isError } = useVideoData(video_id);
  const [selectedScript, setSelectedScript] = useState<number>(0);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
  const [projectName, setProjectName] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  // Gallery state'leri ekle
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Dosya yükleme handler'ı
  const handleFileUpload = useCallback((files: UploadedFile[]) => {
    setUploadedFiles(files);
    console.log("Files uploaded:", files.length);
  }, []);

  // Dosya tıklama handler'ı
  const handleFileClick = useCallback((index: number) => {
    setSelectedFileIndex(index);
    setIsGalleryOpen(true);
  }, []);

  // Gallery kapatma handler'ı
  const handleGalleryClose = useCallback(() => {
    setIsGalleryOpen(false);
    setSelectedFileIndex(null);
  }, []);

  // Gallery navigasyon handler'ı
  const handleGalleryNavigate = useCallback((index: number) => {
    setSelectedFileIndex(index);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">
            Video yükleniyor...
          </p>
          <p className="text-muted-foreground mt-2">Lütfen bekleyin</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-destructive" />
          </div>
          <p className="text-lg font-medium text-foreground">
            Video bulunamadı
          </p>
          <p className="text-muted-foreground mt-2">
            Lütfen geçerli bir video ID&apos;si kullanın
          </p>
        </div>
      </div>
    );
  }

  const scripts: Script[] = Array.isArray(videoData?.scriptVariant)
    ? videoData.scriptVariant
    : videoData?.scriptVariant?.scripts || [];

  const avatars: Avatar[] = [
    { id: 1, name: "Avatar 1", preview: "/api/placeholder/80/80" },
    { id: 2, name: "Avatar 2", preview: "/api/placeholder/80/80" },
    { id: 3, name: "Avatar 3", preview: "/api/placeholder/80/80" },
    { id: 4, name: "Avatar 4", preview: "/api/placeholder/80/80" },
  ];

  const voices: Voice[] = [
    { id: "voice1", name: "Erkek Ses - Profesyonel", language: "TR" },
    { id: "voice2", name: "Kadın Ses - Samimi", language: "TR" },
    { id: "voice3", name: "Erkek Ses - Enerjik", language: "TR" },
  ];

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleScriptSelect = (index: number) => {
    setSelectedScript(index);
  };

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index);
  };

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background to-muted"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {projectName || "Untitled Project"}
            </h1>
            <p className="text-muted-foreground">
              Video düzenleme ve özelleştirme
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Paylaş
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              İndir
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {/* Project Name */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="shadow-lg border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <Edit3 className="h-5 w-5 text-primary" />
                    Project Name
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Proje adınızı girin..."
                    value={projectName}
                    onChange={handleProjectNameChange}
                    className="border-border focus:border-primary transition-colors"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Script */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="shadow-lg border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Video Script
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 mb-4 min-h-[120px]">
                    <p className="text-foreground leading-relaxed">
                      {scripts[selectedScript]?.content ||
                        videoData?.topic ||
                        "Script bulunamadı"}
                    </p>
                  </div>

                  {scripts.length > 1 && (
                    <div className="flex gap-3">
                      {scripts.map((script: Script, index: number) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleScriptSelect(index)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            selectedScript === index
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          SCRIPT {index + 1}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* File Upload - Temiz ve Basit */}
            <div>
              <FileUpload
                onUpload={handleFileUpload}
                onFileClick={handleFileClick}
                maxFileSize={50}
                maxFiles={10}
              />
              <FullScreenGallery
                files={uploadedFiles}
                selectedIndex={selectedFileIndex}
                isOpen={isGalleryOpen}
                onClose={handleGalleryClose}
                onNavigate={handleGalleryNavigate}
              />
            </div>

            {/* Select Avatar */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="shadow-lg border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <User className="h-5 w-5 text-primary" />
                    Select Avatar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {avatars.map((avatar: Avatar, index: number) => (
                      <motion.div
                        key={avatar.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAvatarSelect(index)}
                        className={`aspect-square rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAvatar === index
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-border/80"
                        }`}
                      >
                        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Select Voice */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="shadow-lg border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <Mic className="h-5 w-5 text-primary" />
                    Select Voice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {voices.map((voice: Voice) => (
                    <motion.div
                      key={voice.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedVoice === voice.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-border/80"
                      }`}
                      onClick={() => handleVoiceSelect(voice.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">
                            {voice.name}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {voice.language}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="shadow-xl border-border bg-card/90 backdrop-blur-sm sticky top-6">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[9/16] bg-gradient-to-br from-muted to-muted/80 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        STATIC
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Preview will appear here
                      </p>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg">
                      <Play className="h-5 w-5 mr-2" />
                      Generate Video
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoIdPage;
