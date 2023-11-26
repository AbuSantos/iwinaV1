import GlassPane from "@/components/GlassPane";
import Head from "../head";
import "@/styles/global.css";
import { Inter } from "@next/font/google";
import Sidebar from "@/components/Sidebar";

// const inter = Inter({
//   variable: "--font-inter",
// });

export default function DashboardRootLayout({children}){
    return (
    <html lang="en">
        <Head/>
        <body className="h-screen w-screen candy-mesh p-6">
            <GlassPane className="w-full h-full flex items-center justify-center">
                <Sidebar/>
                {children}
            </GlassPane>
            <div id="modal"></div>
        </body>
        </html>
     )
}