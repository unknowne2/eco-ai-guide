import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, HomeIcon } from "@/components/icons/EcoIcons";
import { Button } from "@/components/ui/button";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showHome?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  showHome = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      {(title || showBack || showHome) && !isHome && (
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              {showBack && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="h-9 w-9"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </Button>
              )}
              {title && (
                <h1 className="text-lg font-bold text-foreground">{title}</h1>
              )}
            </div>
            {showHome && !isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="h-9 w-9"
              >
                <HomeIcon className="w-5 h-5" />
              </Button>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {children}
      </main>
    </div>
  );
};
