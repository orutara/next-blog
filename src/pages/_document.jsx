import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body className="bg-[#f6f6f6] text-[#333333]">
          <Header />
          <div className="max-w-6xl mx-auto md:flex">
            <main className="md:flex-[0_1_70%]">
              <Main />
            </main>
            <aside className="md:flex-[0_1_30%]">
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