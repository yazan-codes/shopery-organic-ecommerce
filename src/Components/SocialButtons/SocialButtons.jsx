import { shoperyIcons } from "../../data/data";
import "./SocialButtons.css";

export default function SocialButtons({ includeLink = false }) {
  const networks = ["facebook", "twitter", "pinterest", "instagram", ...(includeLink ? ["link"] : [])];
  return <div className="social-buttons d-flex">
    {networks.map(network => {
      const Icon = shoperyIcons[network];
      return <button type="button" key={network} title="Preview only"><Icon /></button>;
    })}
  </div>;
}
