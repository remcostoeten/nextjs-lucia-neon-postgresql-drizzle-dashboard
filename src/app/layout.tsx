import ThemeWrapper from "@/components/base/ThemeWrapper"
import { Footer } from "@/components/landing/footer"
import '../styles/app.scss'
import Header from "./(non-dashboard)/(landing)/_components/navigation/header"
export default function RootLayout({ children }: PageProps) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="scroll-smooth "
      // color-scheme="dark"
      suppressHydrationWarning
    >

      <body className="antialiased bg-base">
        <ThemeWrapper>
          <Header />
          {children}
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  )
}
