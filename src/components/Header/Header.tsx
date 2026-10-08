"use client";

import {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./Header.scss";

import {
  ECOSYSTEM_PRODUCTS,
  MENU_DEFS,
  MENU_KEYS,
} from "@/data/headerData";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [previewProductName, setPreviewProductName] = useState<string>("Slota");
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Detect scroll to decrease header size
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const headerWrapper = headerRef.current;
    if (!headerWrapper) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${headerWrapper.getBoundingClientRect().height}px`
      );
    };

    updateHeaderHeight();
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerWrapper);

    return () => resizeObserver.disconnect();
  }, []);

  // Detect screen size for responsive mode
  useEffect(() => {
    function checkSize() {
      setIsMobile(window.innerWidth < 1240);
    }
    checkSize();
    window.addEventListener("resize", checkSize, { passive: true });
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Smoothly center active chip on mobile
  useEffect(() => {
    if (activeMenu && chipRefs.current[activeMenu]) {
      chipRefs.current[activeMenu]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeMenu]);

  // Close menu on click outside or escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // FIX: was "Escape " (with a space), so it never matched
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openMenu = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
    const menuDef = MENU_DEFS[key];
    if (menuDef) {
      let nextPreviewName = "";

      if (menuDef.isProducts && menuDef.productItems && menuDef.productItems.length > 0) {
        const match = menuDef.productItems.find(p => pathname === `/products/${p.id}`);
        nextPreviewName = match ? match.name : menuDef.productItems[0].name;
      } else if (menuDef.items && menuDef.items.length > 0) {
        const match = menuDef.items.find(item => item.href && item.href.split("#")[0] !== "/" && pathname.startsWith(item.href.split("#")[0]));
        if (match) {
           nextPreviewName = match.product;
        } else {
           const currentProd = ECOSYSTEM_PRODUCTS.find(p => pathname === `/products/${p.id}`);
           if (currentProd) {
              const relatedItem = menuDef.items.find(item => item.product === currentProd.name);
              if (relatedItem) nextPreviewName = relatedItem.product;
           }
        }
        if (!nextPreviewName) {
           nextPreviewName = menuDef.items[0].product;
        }
      }

      if (nextPreviewName) {
        setPreviewProductName(nextPreviewName);
      }
    }
  };

  const handleDesktopMouseEnter = (key: string) => {
    if (!isMobile) {
      openMenu(key);
    }
  };

  const handleDesktopMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 180);
    }
  };

  const toggleMenuKey = (key: string) => {
    if (activeMenu === key) {
      setActiveMenu(null);
    } else {
      openMenu(key);
    }
  };

  const handleMenuDoubleClick = (key: string) => {
    const routeByMenuKey: Record<string, string> = {
      products: "/products",
      solutions: "/solutions",
      technology: "/technology",
    };
    const route = routeByMenuKey[key];

    if (route) navigateToHeaderRoute(route);
  };

  const handleMenuClick = (key: string) => {
    const routeByMenuKey: Record<string, string> = {
      products: "/products",
      solutions: "/solutions",
      technology: "/technology",
    };
    const route = routeByMenuKey[key];

    if (!isMobile && route) {
      navigateToHeaderRoute(route);
      return;
    }

    toggleMenuKey(key);
  };

  // Close menu on route change
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  const handleCategoryClick = (key: string) => {
    const routeByMenuKey: Record<string, string> = {
      products: "/products",
      solutions: "/solutions",
      technology: "/technology",
    };
    const route = routeByMenuKey[key];

    if (isMobile && route) {
      if (activeMenu === key) {
        navigateToHeaderRoute(route);
      } else {
        openMenu(key);
      }
      return;
    }

    openMenu(key);
  };

  const scrollToPageTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const navigateToHeaderRoute = (route: string) => {
    setActiveMenu(null);
    if (pathname === route) {
      scrollToPageTop();
      return;
    }
    router.push(route);
  };

  const handleHeaderLinkClick = (
    event: ReactMouseEvent<HTMLElement>,
    route: string
  ) => {
    setActiveMenu(null);
    if (pathname !== route) return;

    event.preventDefault();
    scrollToPageTop();
  };

  const currentMenuKey = activeMenu || "products";
  const currentMenuDef = (activeMenu && MENU_DEFS[activeMenu]) ? MENU_DEFS[activeMenu] : null;
  const currentPreviewProduct =
    ECOSYSTEM_PRODUCTS.find((p) => p.name === previewProductName) || ECOSYSTEM_PRODUCTS[0];

  const currentHoveredGenericItem = currentMenuDef?.items?.find((item) => item.product === previewProductName);
  const previewShot = currentHoveredGenericItem?.previewImage || currentPreviewProduct.shot;

  return (
    <div
      className="site-header-wrapper"
      ref={headerRef}
      onMouseLeave={handleDesktopMouseLeave}
      onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }}
    >
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <nav className="nav content-padding" aria-label="Main Navigation">
          <Link
            href="/"
            className="logo"
            onClick={(event) => handleHeaderLinkClick(event, "/")}
          >
            <Image
              src="/brand/logo-dark.png"
              alt="Infinium Softech"
              width={168}
              height={38}
              priority
            />
          </Link>

          {/* Desktop Nav Tabs */}
          <div className="nav-desktop">
            <Link
              href="/about"
              className={`nav-menu-btn ${!activeMenu && pathname === "/about" ? "is-route-active" : ""}`}
              onClick={(event) => handleHeaderLinkClick(event, "/about")}
              onMouseEnter={() => {
                if (!isMobile) setActiveMenu(null);
              }}
            >
              About
            </Link>

            {MENU_KEYS.map((key) => {
              const def = MENU_DEFS[key];
              const isOpen = activeMenu === key;
              const isRouteActive =
                !activeMenu &&
                ((key === "products" && pathname.startsWith("/products")) ||
                  (key === "solutions" && pathname === "/solutions") ||
                  (key === "technology" && pathname === "/technology"));
              return (
                <button
                  key={key}
                  type="button"
                  className={`nav-menu-btn ${isOpen ? "is-active" : ""} ${isRouteActive ? "is-route-active" : ""}`}
                  aria-expanded={isOpen}
                  onMouseEnter={() => handleDesktopMouseEnter(key)}
                  onClick={() => handleMenuClick(key)}
                  onDoubleClick={() => handleMenuDoubleClick(key)}
                >
                  {def.label}
                  <span className={`caret ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                    ▼
                  </span>
                </button>
              );
            })}

            <Link
              href="/contact"
              className={`nav-menu-btn ${!activeMenu && pathname === "/contact" ? "is-route-active" : ""}`}
              onClick={(event) => handleHeaderLinkClick(event, "/contact")}
              onMouseEnter={() => {
                if (!isMobile) setActiveMenu(null);
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Responsive Toggle & Action Button */}
          <div className="actions">
            <Link
              href="/book-a-demo"
              className="cta"
              onClick={(event) => handleHeaderLinkClick(event, "/book-a-demo")}
            >
              Book a Demo <span aria-hidden="true">→</span>
            </Link>

            {/* Mobile/Compact Trigger Button */}
            <div className="nav-compact">
              <button
                type="button"
                className={`compact-toggle-btn ${activeMenu ? "is-active" : ""}`}
                aria-label={activeMenu ? "Close menu" : "Open menu"}
                aria-expanded={!!activeMenu}
                aria-controls="mega-menu-dropdown"
                onClick={() => {
                  if (activeMenu) {
                    toggleMenuKey(activeMenu);
                  } else {
                    let defaultMenu = "products";
                    if (pathname.startsWith("/about")) defaultMenu = "about";
                    if (pathname.startsWith("/contact")) defaultMenu = "contact";
                    if (pathname.startsWith("/solutions")) defaultMenu = "solutions";
                    if (pathname.startsWith("/technology")) defaultMenu = "technology";
                    toggleMenuKey(defaultMenu);
                  }
                }}
              >
                <span className="compact-toggle-icon" aria-hidden="true">
                  <span className="bar bar-top" />
                  <span className="bar bar-middle" />
                  <span className="bar bar-bottom" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Remaining Space Blurred Backdrop Overlay */}
      {currentMenuDef && (
        <div
          className="mega-menu-backdrop"
          aria-hidden="true"
          onClick={() => setActiveMenu(null)}
          onMouseEnter={handleDesktopMouseLeave}
        />
      )}

      {/* Unified Mega Menu Dropdown (Desktop & Mobile) */}
      {(currentMenuDef || activeMenu === "about" || activeMenu === "contact") && (
        <div
          id="mega-menu-dropdown"
          className="mega-menu-panel"
          role="region"
          aria-label={`${currentMenuDef?.label || "Navigation"} menu`}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
        >
          <div className={`mega-menu-inner ${currentMenuDef?.key === "technology" ? "is-tech-menu" : ""}`}>
            {/* Left Content Column */}
            <div className="mega-left-col">
              {/* Category Eyebrow Header */}
              {currentMenuDef && (
                <div className="mega-eyebrow">
                  <span>{currentMenuDef.eyebrow}</span>
                  <span className="divider-line" aria-hidden="true" />
                </div>
              )}

              {/* Mobile / Tablet Horizontal Category Chip Tabs */}
              <div className="mobile-category-chips-wrapper">
                <div className="mobile-category-chips">
                  {/* FIX: About/Contact chips are never "selected" (filled).
                      Only the open menu chip is filled, so two chips can't be highlighted together. */}
                  <Link
                    href="/about"
                    className={`category-chip ${activeMenu === "about" || (!activeMenu && pathname === "/about") ? "is-selected" : ""}`}
                    aria-current={pathname === "/about" ? "page" : undefined}
                    onClick={(event) => handleHeaderLinkClick(event, "/about")}
                  >
                    About
                  </Link>

                  {MENU_KEYS.map((key) => {
                    const def = MENU_DEFS[key];
                    const isSelected = currentMenuKey === key;
                    return (
                      <button
                        key={key}
                        ref={(el) => {
                          chipRefs.current[key] = el;
                        }}
                        type="button"
                        className={`category-chip ${isSelected ? "is-selected" : ""}`}
                        aria-pressed={isSelected}
                        onClick={() => handleCategoryClick(key)}
                      >
                        {def.label}
                      </button>
                    );
                  })}

                  <Link
                    href="/contact"
                    className={`category-chip ${activeMenu === "contact" || (!activeMenu && pathname === "/contact") ? "is-selected" : ""}`}
                    aria-current={pathname === "/contact" ? "page" : undefined}
                    onClick={(event) => handleHeaderLinkClick(event, "/contact")}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Product Cards Layout (9 Products) */}
              {currentMenuDef?.isProducts && currentMenuDef.productItems && (
                <div className="products-grid">
                  {currentMenuDef.productItems.map((prod) => {
                    const isSelected = previewProductName === prod.name;
                    return (
                      <Link
                        key={prod.name}
                        href={`/products/${prod.id}`}
                        className={`product-card ${isSelected ? "is-selected" : ""}`}
                        onMouseEnter={() => setPreviewProductName(prod.name)}
                        onClick={(event) => {
                          setPreviewProductName(prod.name);
                          handleHeaderLinkClick(event, `/products/${prod.id}`);
                        }}
                      >
                        <span
                          className="badge-mark"
                          style={{ backgroundColor: prod.tint }}
                        >
                          {prod.logo ? (
                            <Image
                              src={prod.logo}
                              alt={prod.name}
                              width={22}
                              height={22}
                              className="badge-logo-img"
                            />
                          ) : (
                            prod.mark
                          )}
                        </span>
                        <div className="card-info">
                          <div className="card-header-row">
                            <span className="product-title">{prod.name}</span>
                            <span className="product-tag">{prod.tag}</span>
                          </div>
                          <span className="product-desc">{prod.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Generic Menu Links Layout (Industries, Solutions, Technology, Company, Demo) */}
              {!currentMenuDef?.isProducts && currentMenuDef?.items && (
                <div className={`links-grid ${currentMenuDef.key === "technology" ? "tech-links-grid" : ""}`}>
                  {currentMenuDef.items.map((item) => {
                    const isSelected = previewProductName === item.product;
                    const matchedProd = ECOSYSTEM_PRODUCTS.find((p) => p.name === item.product);
                    const targetHref = item.href || (matchedProd ? `#${matchedProd.id}` : "#ecosystem");
                    return (
                      <Link
                        key={item.name}
                        href={targetHref}
                        className={`link-card ${isSelected ? "is-selected" : ""}`}
                        onMouseEnter={() => setPreviewProductName(item.product)}
                        onClick={() => {
                          setPreviewProductName(item.product);
                          setActiveMenu(null);
                          if (item.href) {
                            if (item.href.includes("#")) {
                              const [hrefPath, hashId] = item.href.split("#");
                              if (pathname === hrefPath || (hrefPath === "" && hashId)) {
                                const el = document.getElementById(hashId);
                                if (el) {
                                  const targetY =
                                    el.getBoundingClientRect().top + window.scrollY - 130;
                                  window.scrollTo({ top: targetY, behavior: "smooth" });
                                }
                              }
                            }
                          } else if (matchedProd) {
                            window.dispatchEvent(
                              new CustomEvent("scroll-to-ecosystem-product", {
                                detail: { id: matchedProd.id },
                              })
                            );
                          }
                        }}
                      >
                        {item.LucideIcon ? (
                          <span className="link-tech-icon-wrap" aria-hidden="true" style={{ color: item.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <item.LucideIcon size={18} strokeWidth={2.2} />
                          </span>
                        ) : item.icon ? (
                          <span className="link-tech-icon-wrap" aria-hidden="true">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={22}
                              height={22}
                              className="badge-logo-img"
                            />
                          </span>
                        ) : (
                          <span
                            className="link-dot"
                            style={{ backgroundColor: item.tint }}
                            aria-hidden="true"
                          />
                        )}
                        <div className="link-info">
                          <span className="link-title">{item.name}</span>
                          <span className="link-desc">{item.desc}</span>
                        </div>
                        <span className="link-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Bottom bar of Mega Menu */}
              <div className="mega-bottom-bar">
                {/* <span className="bottom-count">9 products across 9 industries</span> */}
                <Link
                  href="#ecosystem"
                  className="bottom-link"
                  onClick={() => {
                    setActiveMenu(null);
                    window.dispatchEvent(
                      new CustomEvent("scroll-to-ecosystem-product", {
                        detail: { index: 0 },
                      })
                    );
                  }}
                >
                  {/* Browse the full ecosystem → */}
                </Link>
              </div>
            </div>

            {/* Right Preview Card (Hidden for Technology Menu) */}
            {currentMenuDef && currentMenuDef.key !== "technology" && (
              <div className="preview-card">
                <div
                  className="preview-image-wrapper"
                  style={{ backgroundColor: currentPreviewProduct.wash }}
                >
                  <Image
                    src={previewShot}
                    alt={currentPreviewProduct.name}
                    width={480}
                    height={300}
                    className="preview-img"
                    loading="eager"
                  />
                </div>
                <div className="preview-content">
                  <div className="preview-tag">{currentPreviewProduct.tag}</div>
                  <div className="preview-title">{currentPreviewProduct.name}</div>
                  <div className="preview-desc">{currentPreviewProduct.desc}</div>
                  <div className="preview-actions">
                    <Link
                      href="/book-a-demo"
                      className="btn-launch"
                      onClick={() => setActiveMenu(null)}
                    >
                      Launch demo <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      href={`#${currentPreviewProduct.id}`}
                      className="btn-details"
                      onClick={() => {
                        setActiveMenu(null);
                        window.dispatchEvent(
                          new CustomEvent("scroll-to-ecosystem-product", {
                            detail: { id: currentPreviewProduct.id },
                          })
                        );
                      }}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}