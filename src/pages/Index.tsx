import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeafIcon, EarthIcon, RecycleIcon, CameraIcon } from "@/components/icons/EcoIcons";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero">
      <div className="max-w-md mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8">
          {/* Logo Animation */}
          <div className="relative">
            <div className="w-28 h-28 gradient-eco rounded-full flex items-center justify-center shadow-eco animate-float">
              <EarthIcon className="w-14 h-14 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-eco-green-light rounded-full flex items-center justify-center animate-bounce-soft">
              <LeafIcon className="w-5 h-5 text-eco-green" />
            </div>
          </div>

          {/* App Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gradient-eco">
              EcoScore AI
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Your AI-Powered Planet Saver
            </p>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground max-w-xs">
            Track your daily eco-habits and scan waste to help save our planet, one action at a time.
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-4 pb-8">
          {/* Daily Check Card */}
          <Card 
            className="cursor-pointer hover:shadow-elevated transition-all duration-300 border-2 border-transparent hover:border-eco-green/30 group"
            onClick={() => navigate("/habits")}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-eco-green-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LeafIcon className="w-7 h-7 text-eco-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">Start Today's Check</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your eco-habits & get your score
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-eco-green-light flex items-center justify-center group-hover:bg-eco-green group-hover:text-primary-foreground transition-colors">
                  <span className="text-eco-green group-hover:text-primary-foreground font-bold">→</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Waste Scan Card */}
          <Card 
            className="cursor-pointer hover:shadow-elevated transition-all duration-300 border-2 border-transparent hover:border-eco-sky/30 group"
            onClick={() => navigate("/scan")}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-eco-sky-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CameraIcon className="w-7 h-7 text-eco-sky" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">Scan My Waste</h3>
                  <p className="text-sm text-muted-foreground">
                    Detect waste type & find the right bin
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-eco-sky-light flex items-center justify-center group-hover:bg-eco-sky group-hover:text-primary-foreground transition-colors">
                  <span className="text-eco-sky group-hover:text-primary-foreground font-bold">→</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-3 pb-6">
          <div className="text-center p-3 bg-card rounded-xl shadow-card">
            <RecycleIcon className="w-6 h-6 text-eco-green mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Recycle</p>
          </div>
          <div className="text-center p-3 bg-card rounded-xl shadow-card">
            <LeafIcon className="w-6 h-6 text-eco-green mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Reduce</p>
          </div>
          <div className="text-center p-3 bg-card rounded-xl shadow-card">
            <EarthIcon className="w-6 h-6 text-eco-green mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Reuse</p>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          🌍 Every small action counts for our planet
        </p>
      </div>
    </div>
  );
};

export default Index;
