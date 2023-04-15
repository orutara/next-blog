import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Footer } from '@/components/organisms/Footer'

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <body className="bg-[#f6f6f6] text-[#333333]">
          <Header />
          <div className="max-w-6xl mx-auto md:flex md:justify-between">
            <main className="md:flex-[0_1_65%]">
              <Main />
            </main>
            <aside className="md:flex-[0_1_32%]">
              <Sidebar />
            </aside>
          </div>
          <Footer />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument