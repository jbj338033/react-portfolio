import { useEffect, useState, useCallback, memo, useMemo, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import * as S from "./style";
import { useThemeStore } from "../../../stores/theme";
import { debounce } from "lodash";

interface NavItem {
  readonly id: string;
  readonly label: string;
}

type ScrollDirection = "up" | "down" | null;
type Theme = "light" | "dark";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "activities", label: "Activities" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "archiving", label: "Archiving" },
  { id: "career", label: "Career" },
] as const;

const HEADER_HEIGHT = 60;
const SCROLL_THRESHOLD = 100;
const INTERSECTION_THRESHOLD = [0, 0.2, 0.4, 0.6, 0.8, 1];
const SCROLL_DEBOUNCE_TIME = 50;

interface ThemeToggleProps {
  theme: Theme;
  isScrolled: boolean;
  onClick: () => void;
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isScrolled: boolean;
  onClick: (id: string) => void;
}

interface MobileNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

const ThemeToggle = memo(({ theme, isScrolled, onClick }: ThemeToggleProps) => (
  <S.ThemeToggle
    isScrolled={isScrolled}
    onClick={onClick}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
  </S.ThemeToggle>
));

ThemeToggle.displayName = "ThemeToggle";

const NavItemComponent = memo(
  ({ item, isActive, isScrolled, onClick }: NavItemProps) => (
    <S.NavItem
      onClick={() => onClick(item.id)}
      isScrolled={isScrolled}
      isActive={isActive}
      role="menuitem"
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </S.NavItem>
  )
);

NavItemComponent.displayName = "NavItemComponent";

const MobileNavItem = memo(
  ({ item, isActive, onClick }: MobileNavItemProps) => (
    <S.MobileNavItem
      onClick={() => onClick(item.id)}
      isActive={isActive}
      role="menuitem"
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
      isScrolled={false}
    >
      {item.label}
    </S.MobileNavItem>
  )
);

MobileNavItem.displayName = "MobileNavItem";

const HomeHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useThemeStore();

  const handleNavClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    window.scrollTo({
      top: element.offsetTop - HEADER_HEIGHT,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  }, []);

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);

        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else if (currentScrollY < lastScrollY.current) {
          setScrollDirection("up");
        }

        lastScrollY.current = currentScrollY;
      }, SCROLL_DEBOUNCE_TIME),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const renderDesktopNav = useMemo(
    () => (
      <S.DesktopNav role="navigation" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            isScrolled={scrollY > 0}
            onClick={handleNavClick}
          />
        ))}
        <ThemeToggle
          theme={theme as Theme}
          isScrolled={scrollY > 0}
          onClick={toggleTheme}
        />
      </S.DesktopNav>
    ),
    [activeSection, scrollY, theme, handleNavClick, toggleTheme]
  );

  const renderMobileNav = useMemo(
    () => (
      <S.MobileNav
        isOpen={isMenuOpen}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={handleNavClick}
          />
        ))}
      </S.MobileNav>
    ),
    [isMenuOpen, activeSection, handleNavClick]
  );

  return (
    <S.HeaderWrapper>
      <S.Container
        isScrolled={scrollY > 0}
        isHidden={scrollDirection === "down" && scrollY > SCROLL_THRESHOLD}
      >
        <S.Inner>
          <S.Logo
            isScrolled={scrollY > 0}
            onClick={() => handleNavClick("home")}
            role="banner"
            tabIndex={0}
          >
            JMO's Portfolio
          </S.Logo>

          {renderDesktopNav}

          <S.MobileControls>
            <ThemeToggle
              theme={theme as Theme}
              isScrolled={scrollY > 0}
              onClick={toggleTheme}
            />
            <S.MenuButton
              isScrolled={scrollY > 0}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <AiOutlineClose size={24} aria-hidden="true" />
              ) : (
                <AiOutlineMenu size={24} aria-hidden="true" />
              )}
            </S.MenuButton>
          </S.MobileControls>
        </S.Inner>
      </S.Container>

      {renderMobileNav}
    </S.HeaderWrapper>
  );
};

export default memo(HomeHeader);
