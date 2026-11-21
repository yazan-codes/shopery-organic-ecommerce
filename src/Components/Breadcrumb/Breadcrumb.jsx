import { Link } from "react-router";
import { shoperyIcons } from "../../data/data";
import "./Breadcrumb.css";

const HomeIcon = shoperyIcons.home;
const ChevronIcon = shoperyIcons.breadcrumbNext;

export default function Breadcrumb({ items }) {
  // let location= useLocation()
  // console.log(location.pathname)
  return (
    <nav className="page-breadcrumb">
      <ol className="container d-flex align-items-center flex-wrap gap-3">
        <li><Link to="/"><HomeIcon /></Link></li>
        {items.map((item, index) => (
          <li className="d-flex align-items-center gap-3" key={item.label}>
            <ChevronIcon />
            {index < items.length - 1 && item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : <span data-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
