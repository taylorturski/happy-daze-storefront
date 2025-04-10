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
                <a href="#">Custom Shop</a>
                <a href="#">Workshop</a>
                <a href="#">Journal</a>
                <a href="#">Contact</a>
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
            {/* Header */}
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "2px solid black",
              }}>
              <h1>Happy Daze Golf</h1>
              <nav style={{display: "flex", gap: "1rem"}}>
                <a style={navLinkStyle} href="#">
                  CUSTOM SHOP
                </a>
                <a style={navLinkStyle} href="#">
                  JOURNAL
                </a>
                <a style={navLinkStyle} href="#">
                  ABOUT
                </a>
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
