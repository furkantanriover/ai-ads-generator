"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sparkles, Video, ArrowRight } from "lucide-react";
import { useState } from "react";

const CreateAdPage = () => {
  const [prompt, setPrompt] = useState("");

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

  const handleGenerate = () => {
    if (prompt.trim()) {
      console.log("Generating ad with prompt:", prompt);
    }
  };

  return (
    <div className="flex-1  w-full flex flex-col items-center justify-center p-8">
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
                className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-2">AD</div>
                  <div className="flex gap-2 justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-blue-600"></div>
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

          {/* Input Section */}
          <motion.div className="space-y-4 mt-12" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                type="text"
                placeholder="Enter the topic or product info"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-14 text-lg px-6 rounded-xl border-2 border-border focus:border-primary transition-colors bg-card text-center"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                size="lg"
                className="w-full h-14 text-lg rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate
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
                "Advanced AI creates professional videos automatically",
            },
            {
              icon: <Video className="w-8 h-8" />,
              title: "High Quality",
              description: "Studio-quality output ready for any platform",
            },
            {
              icon: <ArrowRight className="w-8 h-8" />,
              title: "Instant Results",
              description: "Get your video in minutes, not hours",
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
