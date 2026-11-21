import { NavLink, useParams } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Context";
import { shoperyIcons } from "../../data/data";
import "./AccountSidebar.css";

const accountLinks = [
  { path: "orders", label: "Your Orders", icon: shoperyIcons.accountOrders },
  { path: "setting", label: "Settings", icon: shoperyIcons.accountSettings },
  { path: "address", label: "Address", icon: shoperyIcons.location },
  { label: "Payment Method", icon: shoperyIcons.checkout },
  {
    path: "notification",
    label: "Notification",
    icon: shoperyIcons.accountNotification,
  },
];

function AccountSidebar() {
  const { id } = useParams();
  const { handleLogout } = useContext(AuthContext);
  const LogoutIcon = shoperyIcons.accountLogout;
  const MenuIcon = shoperyIcons.listView;
  const CloseIcon = shoperyIcons.remove;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="account-sidebar-shell flex-shrink-0 ">
      <button
        type="button"
        className="account-sidebar__toggle d-inline-flex d-md-none align-items-center gap-2 my-3  "
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon className="account-sidebar__icon" />
        <span>Account menu</span>
      </button>
      {isDrawerOpen && (
        <div
          className="offcanvas-backdrop fade show d-lg-none"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      <div
        id="account-sidebar-drawer"
        className={`offcanvas-md offcanvas-end account-sidebar__drawer${isDrawerOpen ? " show" : ""}`}
      >
        <div className="offcanvas-header  d-md-none gap-3">
          <h2 id="account-sidebar-title" className="account-sidebar__title">
            My Account
          </h2>
          <button
            type="button"
            className="account-sidebar__close d-inline-flex align-items-center justify-content-center ms-auto"
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon className="account-sidebar__icon" />
          </button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="account-sidebar w-100 ps-0 p-3">
            <ul className="nav flex-column gap-1">
              {accountLinks.map(({ path, label, icon: Icon }) => (
                <li className="nav-item" key={label}>
                  {path ? (
                    <NavLink
                      to={`/account/${encodeURIComponent(id)}/${path}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className={({ isActive }) =>
                        `account-sidebar__item d-flex align-items-center gap-3${isActive ? " account-sidebar__item--active" : ""}`
                      }
                    >
                      <Icon className="account-sidebar__icon flex-shrink-0" />
                      <span>{label}</span>
                    </NavLink>
                  ) : (
                    <span
                      className="account-sidebar__item account-sidebar__item--disabled d-flex align-items-center gap-3"
                      title="Payment methods are not available yet"
                    >
                      <Icon className="account-sidebar__icon flex-shrink-0" />
                      <span>{label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="account-sidebar__logout mt-4 pt-3">
              <button
                type="button"
                className="account-sidebar__item d-flex align-items-center gap-3 w-100 text-start"
                onClick={() => {
                  setIsDrawerOpen(false);
                  handleLogout();
                }}
              >
                <LogoutIcon className="account-sidebar__icon flex-shrink-0" />
                <span>Log out</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AccountSidebar;
