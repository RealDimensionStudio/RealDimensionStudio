import studioData from "../data/studioData";
import logo from "../assets/RDS Logo final_V04.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PageHeader({ currentPath = "/", onNavigate }) {
  const { studio } = studioData;

  const handleNavigate = (href) => (event) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate(href);
      return;
    }
    window.location.href = href;
  };

  return (
    <header className="relative z-20 border-b border-brand-lightYellow/10 bg-brand-darker/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="/" onClick={handleNavigate("/")} className="flex items-center gap-3">
          <img src={logo} alt={studio.name} className="h-10 w-10 object-contain" />
          <div className="leading-none">
            <div className="text-brand-red text-sm tracking-[0.24em] uppercase font-normal">
              Real Dimension Studio
            </div>
            <div className="text-brand-lightYellow/40 text-[10px] tracking-[0.3em] uppercase mt-1">
              Post Production Studio
            </div>
          </div>
        </a>

        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm tracking-widest uppercase">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavigate(item.href)}
              className={`transition-colors duration-200 ${currentPath === item.href ? "text-brand-red" : "text-brand-lightYellow/60 hover:text-brand-lightYellow"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}