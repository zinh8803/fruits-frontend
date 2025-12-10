import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo + description */}
        <div className="footer__about">
          <div className="footer__logo">
            <div className="footer__icon"></div>
            <h2>Cosmic Values</h2>
          </div>

          <p>© 2025 Cosmic Values. All rights reserved.</p>
          <p>All trademarks are property of their respective owners.</p>

          <p className="footer__note">
            https://bloxfruitsvalues.com is a 3rd party website that is not
            affiliated or partnered with Blox Fruits. We are not endorsed by
            their respective owners.
          </p>
        </div>

        {/* Pages */}
        <div className="footer__col">
          <h3>Pages</h3>
          <ul>
            <li>Home</li>
            <li>Trade</li>
            <li>Values</li>
            <li>Top Donators</li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer__col">
          <h3>Socials</h3>
          <ul>
            <li>Discord</li>
            <li>X</li>
            <li>YouTube</li>
          </ul>
        </div>

        {/* Legal + Support */}
        <div className="footer__col">
          <h3>Legal</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>

          <h3 style={{ marginTop: "2rem" }}>Support</h3>
          <ul>
            <li>Discord Bot</li>
            <li>FAQ</li>
            <li>Our games</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
