import React, { useState, useRef } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraIcon, ImageUploadIcon, TrashBinIcon, RecycleIcon } from "@/components/icons/EcoIcons";
import { toast } from "sonner";

type WasteType = "plastic" | "paper" | "organic" | "metal" | "glass" | null;

interface WasteInfo {
  type: WasteType;
  binColor: string;
  binName: string;
  binHex: string;
  message: string;
  icon: string;
}

const wasteData: Record<string, WasteInfo> = {
  plastic: {
    type: "plastic",
    binColor: "bin-blue",
    binName: "Blue Bin",
    binHex: "hsl(210, 80%, 55%)",
    message: "Recycling plastic saves oceans. One recycled bottle can power a lightbulb for 3 hours! 🌊",
    icon: "🥤",
  },
  paper: {
    type: "paper",
    binColor: "bin-blue",
    binName: "Blue Bin",
    binHex: "hsl(210, 80%, 55%)",
    message: "Recycling paper saves trees. One ton of recycled paper saves 17 trees! 🌳",
    icon: "📄",
  },
  organic: {
    type: "organic",
    binColor: "bin-green",
    binName: "Green Bin",
    binHex: "hsl(142, 72%, 42%)",
    message: "Organic waste can become compost. Feed the soil, grow more plants! 🌱",
    icon: "🍎",
  },
  metal: {
    type: "metal",
    binColor: "bin-yellow",
    binName: "Yellow Bin",
    binHex: "hsl(45, 90%, 50%)",
    message: "Metal can be recycled infinitely without losing quality. Every can counts! ⚡",
    icon: "🥫",
  },
  glass: {
    type: "glass",
    binColor: "bin-yellow",
    binName: "Yellow Bin",
    binHex: "hsl(45, 90%, 50%)",
    message: "Glass can be recycled forever without losing purity. Crystal clear impact! ✨",
    icon: "🫙",
  },
};

const ScanPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<WasteInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For demo purposes, randomly select a waste type
    // In production, this would call an actual AI model
    const types: (keyof typeof wasteData)[] = ["plastic", "paper", "organic", "metal", "glass"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    setResult(wasteData[randomType]);
    setIsAnalyzing(false);
    toast.success("Waste analyzed successfully!");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetScan = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <MobileLayout title="Scan My Waste" showBack showHome>
      <div className="px-4 py-6 space-y-6">
        {/* Instructions Card */}
        {!selectedImage && (
          <Card className="bg-eco-sky-light/50 border-eco-sky/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <RecycleIcon className="w-8 h-8 text-eco-sky flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">How it works</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a photo or upload an image of your waste item. Our AI will identify the type and tell you which bin to use!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Preview */}
        {selectedImage && (
          <Card className="overflow-hidden animate-scale-in">
            <div className="relative aspect-square">
              <img
                src={selectedImage}
                alt="Waste to analyze"
                className="w-full h-full object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <div className="w-16 h-16 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="font-semibold">Analyzing...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        {!selectedImage && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="eco"
              size="xl"
              className="flex-col h-32 gap-2"
              onClick={handleCameraClick}
            >
              <CameraIcon className="w-10 h-10" />
              <span>Take Photo</span>
            </Button>
            <Button
              variant="eco-outline"
              size="xl"
              className="flex-col h-32 gap-2"
              onClick={handleUploadClick}
            >
              <ImageUploadIcon className="w-10 h-10" />
              <span>Upload Image</span>
            </Button>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Analyze Button */}
        {selectedImage && !result && !isAnalyzing && (
          <Button
            variant="eco"
            size="xl"
            className="w-full"
            onClick={analyzeImage}
          >
            <RecycleIcon className="w-5 h-5 mr-2" />
            Analyze Waste
          </Button>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-slide-up">
            {/* Waste Type Card */}
            <Card className="border-2" style={{ borderColor: result.binHex }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{result.icon}</span>
                  <span className="capitalize text-xl">{result.type} Detected</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bin Info */}
                <div 
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: `${result.binHex}20` }}
                >
                  <TrashBinIcon 
                    className="w-16 h-16" 
                    color={result.binHex}
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Dispose in</p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: result.binHex }}
                    >
                      {result.binName}
                    </p>
                  </div>
                </div>

                {/* Eco Message */}
                <div className="bg-eco-green-light p-4 rounded-xl">
                  <p className="text-sm font-semibold text-eco-green-dark mb-1">
                    🌍 Save the Planet Tip
                  </p>
                  <p className="text-sm text-eco-green-dark/80">
                    {result.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Scan Again Button */}
            <Button
              variant="eco-outline"
              size="lg"
              className="w-full"
              onClick={resetScan}
            >
              <CameraIcon className="w-5 h-5 mr-2" />
              Scan Another Item
            </Button>
          </div>
        )}

        {/* Bin Legend */}
        {!result && (
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Bin Color Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-bin-blue" />
                <span className="text-sm">Blue Bin – Plastic & Paper</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-bin-green" />
                <span className="text-sm">Green Bin – Organic Waste</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-bin-yellow" />
                <span className="text-sm">Yellow Bin – Metal & Glass</span>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground pb-4">
          Proper waste disposal = happier planet! ♻️
        </p>
      </div>
    </MobileLayout>
  );
};

export default ScanPage;
