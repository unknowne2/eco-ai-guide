import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircleIcon, LeafIcon } from "@/components/icons/EcoIcons";

interface Habit {
  id: string;
  label: string;
  emoji: string;
}

const goodHabits: Habit[] = [
  { id: "walk", label: "Walked or cycled instead of vehicle", emoji: "🚶" },
  { id: "lights", label: "Turned off lights when not in use", emoji: "💡" },
  { id: "water", label: "Saved water", emoji: "💧" },
  { id: "plastic", label: "Avoided single-use plastic", emoji: "🚫" },
  { id: "plant", label: "Planted or cared for a plant", emoji: "🌱" },
  { id: "recycle", label: "Recycled waste properly", emoji: "♻️" },
  { id: "reuse", label: "Reused items instead of buying new", emoji: "🔄" },
];

const badHabits: Habit[] = [
  { id: "ac", label: "Used AC for many hours", emoji: "❄️" },
  { id: "wasteWater", label: "Wasted water", emoji: "🚿" },
  { id: "usedPlastic", label: "Used single-use plastic", emoji: "🥤" },
  { id: "leftLights", label: "Left lights or fans on", emoji: "💡" },
  { id: "burnWaste", label: "Burned waste", emoji: "🔥" },
  { id: "longShower", label: "Took a very long shower", emoji: "🛁" },
  { id: "driveShort", label: "Drove for a short distance", emoji: "🚗" },
];

const HabitsPage = () => {
  const navigate = useNavigate();
  const [selectedGood, setSelectedGood] = useState<string[]>([]);
  const [selectedBad, setSelectedBad] = useState<string[]>([]);

  const toggleHabit = (id: string, isGood: boolean) => {
    if (isGood) {
      setSelectedGood((prev) =>
        prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
      );
    } else {
      setSelectedBad((prev) =>
        prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
      );
    }
  };

  const handleGenerateReport = () => {
    navigate("/results", {
      state: {
        goodCount: selectedGood.length,
        badCount: selectedBad.length,
        goodHabits: selectedGood,
        badHabits: selectedBad,
      },
    });
  };

  const totalSelected = selectedGood.length + selectedBad.length;

  return (
    <MobileLayout title="Daily Eco Check" showBack showHome>
      <div className="px-4 py-6 space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between bg-eco-green-light rounded-xl p-4">
          <div className="flex items-center gap-3">
            <LeafIcon className="w-6 h-6 text-eco-green" />
            <span className="font-semibold text-eco-green-dark">
              {totalSelected} habits tracked
            </span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-eco-green/20 rounded-lg text-xs font-bold text-eco-green">
              {selectedGood.length} Good
            </span>
            <span className="px-2 py-1 bg-eco-danger/20 rounded-lg text-xs font-bold text-eco-danger">
              {selectedBad.length} Bad
            </span>
          </div>
        </div>

        {/* Good Habits */}
        <Card className="border-eco-green/30 overflow-hidden">
          <CardHeader className="bg-eco-green-light/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-eco-green-dark">
              <CheckCircleIcon className="w-5 h-5 text-eco-green" />
              Good Habits
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the eco-friendly actions you did today
            </p>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {goodHabits.map((habit) => (
              <label
                key={habit.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedGood.includes(habit.id)
                    ? "bg-eco-green-light border-2 border-eco-green"
                    : "bg-muted/50 border-2 border-transparent hover:bg-muted"
                }`}
              >
                <Checkbox
                  checked={selectedGood.includes(habit.id)}
                  onCheckedChange={() => toggleHabit(habit.id, true)}
                  className="data-[state=checked]:bg-eco-green data-[state=checked]:border-eco-green"
                />
                <span className="text-lg">{habit.emoji}</span>
                <span className="flex-1 text-sm font-medium">{habit.label}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Bad Habits */}
        <Card className="border-eco-danger/30 overflow-hidden">
          <CardHeader className="bg-destructive/10 pb-3">
            <CardTitle className="flex items-center gap-2 text-eco-danger">
              <span className="w-5 h-5 rounded-full bg-eco-danger/20 flex items-center justify-center text-xs">⚠️</span>
              Bad Habits
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Be honest - which not-so-eco actions did you do?
            </p>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {badHabits.map((habit) => (
              <label
                key={habit.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedBad.includes(habit.id)
                    ? "bg-destructive/10 border-2 border-eco-danger"
                    : "bg-muted/50 border-2 border-transparent hover:bg-muted"
                }`}
              >
                <Checkbox
                  checked={selectedBad.includes(habit.id)}
                  onCheckedChange={() => toggleHabit(habit.id, false)}
                  className="data-[state=checked]:bg-eco-danger data-[state=checked]:border-eco-danger"
                />
                <span className="text-lg">{habit.emoji}</span>
                <span className="flex-1 text-sm font-medium">{habit.label}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Generate Report Button */}
        <Button
          variant="eco"
          size="xl"
          className="w-full"
          onClick={handleGenerateReport}
          disabled={totalSelected === 0}
        >
          <LeafIcon className="w-5 h-5 mr-2" />
          Generate My Eco Report
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Your honest tracking helps save the planet! 🌍
        </p>
      </div>
    </MobileLayout>
  );
};

export default HabitsPage;
