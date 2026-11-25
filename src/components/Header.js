import { HeaderStyle } from "./HeaderStyle";

const Header = () => {
  const navItems = [
    "Home",
    "About",
    "Services",
    "Skills",
    "Project",
    "Contact",
  ];

  return (
    <header style={HeaderStyle.headerbox}>
      <p style={HeaderStyle.paragraph}>ROHIT KUMAR</p>

      <nav style={HeaderStyle.nav}>
        {navItems.map((item) => (
          <button key={item} style={HeaderStyle.button}>
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
