'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme="system" // Automatically uses system theme (light/dark)
      enableSystem={true}   // Enables system theme detection
      attribute="class"     // Adds a class to the HTML element for theme styling
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
