import { Outlet, useMatch } from 'react-router'
import AccountSidebar from '../../../Components/AccountSidebar/AccountSidebar';
import './AccountLayout.css';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';

function AccountLayout() {

  const sectionLabels = {
    orders: "Your Orders",
    address: "Address",
    notification: "Notifications",
    setting: "Settings",
  };
  const match = useMatch("/account/:id/:section?/:orderId?");
  const { id, section, orderId } = match?.params ?? {};
  const accountPath = `/account/${encodeURIComponent(id)}`;

  const items = [{ label: "Account", to: accountPath }];

  if (section === "orders" && orderId) {
    items.push(
      { label: "Your Orders", to: `${accountPath}/orders` },
      { label: "Order Details" },
    );
  } else if (sectionLabels[section]) {
    items.push({ label: sectionLabels[section] });
  }
  return (
    <>
      <Breadcrumb
        items={items}
      />
      <main className="account-layout ">
        <div className="account-layout__container container d-flex flex-column flex-md-row align-items-stretch gap-md-4">
          <AccountSidebar />

          <div className="account-layout__content flex-grow-1">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountLayout
