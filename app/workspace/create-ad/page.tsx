"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserDetailContext,
  UserDetailContextType,
} from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useGenerateScript } from "@/hooks/use-generate-script";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

const CreateAdPage = () => {
  const [userInput, setUserInput] = useState("");
  const { userDetail } = useContext(UserDetailContext) as UserDetailContextType;
  const [selectedLanguage, setSelectedLanguage] = useState("Turkish");
  const router = useRouter();
  const CreateNewVideoData = useMutation(api.videoData.CreateNewVideoData);

  const generateScriptMutation = useGenerateScript();

  const languages = [
    { code: "Turkish", name: "Türkçe", flag: "🇹🇷" },
    { code: "English", name: "English", flag: "🇺🇸" },
    { code: "German", name: "Deutsch", flag: "🇩🇪" },
    { code: "French", name: "Français", flag: "🇫🇷" },
    { code: "Spanish", name: "Español", flag: "🇪🇸" },
    { code: "Italian", name: "Italiano", flag: "🇮🇹" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      toast.error("Lütfen bir konu girin");
      return;
    }

    try {
      const result = await generateScriptMutation.mutateAsync({
        topic: userInput.trim(),
        language: selectedLanguage,
      });

      const rawResult = (result?.content)
        .replace("```json", "")
        .replace("```", "");
      const JSONResult = JSON.parse(rawResult);
      const resp = await CreateNewVideoData({
        uid: userDetail?.id,
        topic: userInput,
        scriptVariant: JSONResult,
      });
      console.log(resp);
      toast.success("Script başarıyla oluşturuldu!");
      router.push(`/workspace/create-ad/` + resp);
    } catch (error) {
      console.log(error);
      toast.error("Script oluşturulurken hata oluştu");
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center space-y-16">
        <motion.div
          className="max-w-2xl w-full text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Icon Section */}
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                className="w-48 h-48 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-primary-foreground text-center">
                  <div className="text-6xl font-bold mb-2">AD</div>
                  <div className="flex gap-2 justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-muted rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-primary"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
              variants={itemVariants}
            >
              🎬 Create AI Video Ads in Just One Click!
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              ⚡ Turn your ideas into stunning, scroll-stopping videos —
              instantly, effortlessly, and without editing skills!
            </motion.p>
          </motion.div>

          {/* Language Selection */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Script Dili Seçin
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedLanguage === lang.code
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-lg mb-1">{lang.flag}</div>
                  <div className="text-xs font-medium">{lang.name}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Input Section */}
          <motion.div className="space-y-4 mt-12" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                type="text"
                placeholder="Ürün veya hizmet bilgisini girin (örn: Pro Draxler Çim Biçme Makinesi)"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-14 text-lg px-6 rounded-xl border-2 border-border focus:border-primary transition-colors bg-card text-center"
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleGenerate}
                disabled={!userInput.trim() || generateScriptMutation.isPending}
                size="lg"
                className="w-full h-14 text-lg rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  {generateScriptMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  {generateScriptMutation.isPending
                    ? "Oluşturuluyor..."
                    : "Script Oluştur"}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "AI-Powered",
              description:
                "Gelişmiş AI ile profesyonel videolar otomatik oluşturur",
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "Çoklu Dil",
              description: "6 farklı dilde script üretimi desteklenir",
            },
            {
              icon: <ArrowRight className="w-8 h-8" />,
              title: "Anında Sonuç",
              description: "Saatler değil, dakikalar içinde sonuç alın",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAdPage;
