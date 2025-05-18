import React, { useMemo, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import type { PaletteMode } from "@mui/material/styles";
import { ColorModeContext } from "./colorModeContext";

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#F4F7FE",
                  paper: "#fff",
                },
                text: {
                  primary: "#213547",
                },
              }
            : {
                background: {
                  default: "#0b1437",
                  paper: "#23272b",
                },
                text: {
                  primary: "#fff",
                },
              }),
        },
        typography: {
          fontFamily: '"DM Sans", sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
