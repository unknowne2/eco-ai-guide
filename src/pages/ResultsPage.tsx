import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartIcon, EarthIcon, LeafIcon } from "@/components/icons/EcoIcons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface LocationState {
  goodCount: number;
  badCount: number;
  goodHabits: string[];
  badHabits: string[];
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  // Default values if no state
  const goodCount = state?.goodCount ?? 0;
  const badCount = state?.badCount ?? 0;

  // Calculate Eco Score
  const ecoScore = goodCount * 10 - badCount * 5;

  // Chart data
  const chartData = [
    { name: "Good", value: goodCount, color: "hsl(142, 72%, 42%)" },
    { name: "Bad", value: badCount, color: "hsl(0, 72%, 55%)" },
  ];

  // Determine message based on score
  const isPositive = goodCount > badCount;
  const getMessage = () => {
    if (goodCount === 0 && badCount === 0) {
      return "Start tracking your habits to see your impact!";
    }
    if (isPositive) {
      return "🎉 You saved the planet today!";
    }
    return "🌍 Your planet needs better choices tomorrow.";
  };

  // AI Prediction
  const getAIPrediction = () => {
    if (goodCount === 0 && badCount === 0) {
      return "Track your habits to see AI predictions!";
    }
    const netImpact = (goodCount - badCount) * 3.3; // Simulated percentage
    if (netImpact > 0) {
      return `If you continue like this for 30 days, your environmental impact will improve by ${Math.abs(netImpact).toFixed(0)}%! 🌱`;
    } else if (netImpact < 0) {
      return `If you continue like this for 30 days, your environmental impact will worsen by ${Math.abs(netImpact).toFixed(0)}%. Let's do better! 💪`;
    }
    return "You're balanced! Keep making more green choices to improve your impact.";
  };

  // Score color
  const getScoreColor = () => {
    if (ecoScore >= 30) return "text-eco-green";
    if (ecoScore >= 0) return "text-eco-warning";
    return "text-eco-danger";
  };

  const getScoreBg = () => {
    if (ecoScore >= 30) return "bg-eco-green-light";
    if (ecoScore >= 0) return "bg-eco-warning/20";
    return "bg-destructive/10";
  };

  return (
    <MobileLayout title="Your Eco Report" showBack showHome>
      <div className="px-4 py-6 space-y-6">
        {/* Eco Score Card */}
        <Card className="overflow-hidden animate-scale-in">
          <CardHeader className={`${getScoreBg()} text-center pb-4`}>
            <div className="mx-auto w-24 h-24 rounded-full bg-card shadow-lg flex items-center justify-center mb-3">
              <span className={`text-4xl font-extrabold ${getScoreColor()}`}>
                {ecoScore}
              </span>
            </div>
            <CardTitle className="text-lg">Your Eco Score</CardTitle>
            <p className="text-sm text-muted-foreground">
              Formula: (Good × 10) – (Bad × 5)
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className={`p-4 rounded-xl ${isPositive ? "bg-eco-green-light" : "bg-destructive/10"} text-center`}>
              <p className={`font-bold text-lg ${isPositive ? "text-eco-green-dark" : "text-eco-danger"}`}>
                {getMessage()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ChartIcon className="w-5 h-5 text-eco-green" />
              Good vs Bad Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontWeight: 600, fontSize: 14 }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 8, 8, 0]}
                    barSize={40}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      style={{ fontWeight: 700, fontSize: 16 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-eco-green" />
                <span className="text-sm font-medium">Good: {goodCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-eco-danger" />
                <span className="text-sm font-medium">Bad: {badCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Prediction */}
        <Card className="border-2 border-eco-green/30 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full gradient-eco flex items-center justify-center flex-shrink-0">
                <EarthIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-eco-green mb-1">AI PREDICTION</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {getAIPrediction()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            variant="eco"
            size="lg"
            className="w-full"
            onClick={() => navigate("/habits")}
          >
            <LeafIcon className="w-5 h-5 mr-2" />
            Track More Habits
          </Button>
          <Button
            variant="eco-outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Keep tracking daily for accurate predictions! 📊
        </p>
      </div>
    </MobileLayout>
  );
};

export default ResultsPage;
