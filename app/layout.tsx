import Link from "next/link";
import {ReactNode} from "react";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body style={{margin: 0, fontFamily: "monospace"}}>
        <div style={{display: "flex", minHeight: "100vh"}}>
          {/* Sidebar */}
          <aside
            style={{
              width: "240px",
              borderRight: "2px solid black",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
            <div>
              <h3 style={{marginBottom: "0.5rem"}}>MY CART</h3>
              <p>
                Total: <strong>$750.00</strong>
              </p>
              <button>CHECK OUT</button>
            </div>

            <div>
              <h3 style={{marginBottom: "0.5rem"}}>CATEGORIES</h3>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}>
                <Link href="/custom-shop">Custom Shop</Link>
                <Link href="/workshop">Workshop</Link>
                <Link href="/journal">Journal</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>

            <div>
              <h3>UNDERGROUND GC</h3>
              <p style={{fontSize: "0.8rem", color: "blue"}}>
                Get a discount code :)
              </p>
              <form style={{display: "flex", marginTop: "0.5rem"}}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: "0.25rem",
                    border: "1px solid black",
                  }}
                />
                <button style={{marginLeft: "0.5rem"}}>→</button>
              </form>
            </div>
          </aside>

          {/* Main content */}
          <main style={{flex: 1}}>
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "2px solid black",
              }}>
              <Link href="/" style={{fontWeight: "bold", fontSize: "1.5rem"}}>
                Happy Daze Golf
              </Link>
              <nav style={{display: "flex", gap: "1rem"}}>
                <Link href="/custom-shop" style={navLinkStyle}>
                  CUSTOM SHOP
                </Link>
                <Link href="/journal" style={navLinkStyle}>
                  JOURNAL
                </Link>
                <Link href="/about" style={navLinkStyle}>
                  ABOUT
                </Link>
              </nav>
            </header>

            <section style={{padding: "2rem"}}>{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}

const navLinkStyle = {
  border: "2px solid black",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  fontWeight: "bold",
};
