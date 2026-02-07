"use client";
import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { getTheme } from "@/styles/theme";
import {
  themeModeSelector,
  getEffectiveThemeMode,
  initThemeAction,
} from "@/modules/theme";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: { options: { key: string }; children: React.ReactNode }) {
  const { options, children } = props;
  const dispatch = useDispatch();
  const themeMode = useSelector(themeModeSelector);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const effectiveMode = getEffectiveThemeMode(themeMode, prefersDarkMode);
  const theme = React.useMemo(() => getTheme(effectiveMode), [effectiveMode]);

  React.useEffect(() => {
    dispatch(initThemeAction());
  }, [dispatch]);

  React.useEffect(() => {
    // Update body class for SCSS styling
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(`${effectiveMode}-mode`);
    }
  }, [effectiveMode]);

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
