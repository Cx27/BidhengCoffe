import React, { createContext, useContext, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
    accent: string;
    border: string;
  };
}

const lightColors = {
  background: "#F9FAFB",
  cardBg: "#FFFFFF",
  textPrimary: "#1F2937",
  textSecondary: "#4B5563",
  primary: "#7C2D12",
  accent: "#D97706",
  border: "#E5E7EB",
};

const darkColors = {
  background: "#121212",
  cardBg: "#1E1E1E",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
  primary: "#9A3412",
  accent: "#F59E0B",
  border: "#374151",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceScheme = useDeviceColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(
    deviceScheme === "dark" ? "dark" : "light",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default function ThemeContextRoute() {
  return null;
}
