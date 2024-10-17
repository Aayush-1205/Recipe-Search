import StoreProvider from "./StoreProvider";
import '@/app/globals.css'

export const metadata = {
  title: "Recipe - Search",
  description: "Created by Aayush",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
