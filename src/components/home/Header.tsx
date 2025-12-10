import { useEffect, useRef, useState } from "react";
import LoginDialog from "../Dialog/LoginDialog/LoginDialog";
import { me, logout } from "../../services/userService";
import "./Header.scss";

type User = {
  id: number;
  name: string;
  email: string;
  image_url?: string;
  role?: string;
};

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await me();
        const data = res?.data?.data ?? res?.data;
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    void fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenu &&
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <>
      <header className="header">
        {/* Logo + Game */}
        <div className="header__logo">
          <span className="header__logo-icon">🟦</span>
          <div>
            <div className="header__title">Blox Fruits</div>
            <div className="header__switch">Switch Game ▼</div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="header__nav">
          <div>
            <span className="header__icon">🔄</span>
            Trade Ads{" "}
            <span className="header__badge">99+</span>
          </div>
          <div>
            <span className="header__icon">📋</span>
            Value List
          </div>
          <div>
            <span className="header__icon">🧮</span>
            Calculator
          </div>
          <div>
            <span className="header__icon">👥</span>
            Community
          </div>
          <div>
            <span className="header__icon">🔍</span>
            Search
          </div>
          <div>
            <span className="header__icon">🎁</span>
            Giveaways
          </div>
        </nav>
        {/* Right icons */}
        <div className="header__right">
          <span className="header__discord">🟦</span>
          <span className="header__chat">💬</span>
          {user ? (
            <div className="header__user" ref={userRef}>
              <button
                className="header__user-btn"
                onClick={() => setOpenMenu((prev) => !prev)}>
                {user.image_url ? (
                  <img
                    src={user.image_url}
                    alt={user.name}
                    className="header__avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="header__avatar--placeholder">
                    {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                )}
                <div className="header__user-info">
                  <div className="header__user-name">{user.name}</div>
                  <div className="header__user-role">{user.role}</div>
                </div>
              </button>

              {openMenu && (
                <div className="header__menu">
                  <div className="header__menu-user">
                    <div className="header__menu-name">{user.name}</div>
                    <div className="header__menu-email">{user.email}</div>
                  </div>
                  <button className="header__menu-item">Thông tin cá nhân</button>
                  <button className="header__menu-item">Cài đặt</button>
                  <button
                    className="header__menu-item header__menu-item--danger"
                    onClick={async () => {
                      try {
                        await logout();
                      } finally {
                        setUser(null);
                        setOpenMenu(false);
                      }
                    }}>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="header__login-btn"
              onClick={() => setOpenLogin(true)}>
              Login
            </button>
          )}
        </div>
      </header>

      <LoginDialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => {
          // refetch user info after login success
          void (async () => {
            try {
              const res = await me();
              const data = res?.data?.data ?? res?.data;
              setUser(data);
              setOpenMenu(false);
            } catch {
              setUser(null);
            }
          })();
        }}
      />
    </>
  );
};

export default Header;
