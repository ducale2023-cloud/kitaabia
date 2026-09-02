import "./globals.css";
export const viewport={width:"device-width",initialScale:1,viewportFit:"cover"};
export const metadata={title:"KITAABIA — Read. Learn. Grow.",description:"A modern digital book library."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
