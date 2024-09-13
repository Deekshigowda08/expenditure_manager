import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expenditure manager",
  description: "Expenditure manager which can hold your all the expenditure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></body>
    </html>
  );
}
