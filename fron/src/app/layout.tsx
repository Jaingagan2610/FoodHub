import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Food Ordering App",
  description: "Role-based Food Ordering System with Country Access",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
