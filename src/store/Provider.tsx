"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

import ThemeProvider from "@/components/theme/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
