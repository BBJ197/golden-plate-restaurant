import {
  faLocationCrosshairs,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import wine from "./assets/images/wine.webp";
import cocktails from "./assets/images/cocktails.webp";
import starter from "./assets/images/starter.webp";
import tastingMenu from "./assets/images/tasting-menu.webp";
import steak from "./assets/images/stake.webp";
import cake from "./assets/images/cake.webp";

export const menuItems = [
  {
    id: 1,
    name: "Wine Cellar",
    image: wine,
    text: "A curated list of rare vintages and sommelier-selected pours, by the glass or bottle.",
  },
  {
    id: 2,
    name: "Craft Cocktails",
    image: cocktails,
    text: "Seasonal cocktails and aged spirits, shaken and stirred to order.",
  },
  {
    id: 3,
    name: "Starters & Garden",
    image: starter,
    text: "Seasonal small plates and garden-fresh starters to open the evening.",
  },
  {
    id: 4,
    name: "Chef's Tasting Menu",
    image: tastingMenu,
    text: "A multi-course journey through the chef's finest dishes, paired with wine.",
  },
  {
    id: 5,
    name: "Prime Steaks & Chops",
    image: steak,
    text: "Dry-aged prime cuts, fire-seared and finished with classic sauces.",
  },
  {
    id: 6,
    name: "Pastry & Desserts",
    image: cake,
    text: "Handcrafted pastries and plated desserts to end the evening.",
  },
];

export const contactInfo = [
  {
    id: 1,
    icon: faLocationCrosshairs,
    text: "Jambo Building, Addisu Gebeya, Addis Ababa, Ethiopia, Ground Floor, No. 013",
  },
  { id: 3, icon: faPhone, text: "(251) 985-414412" },
  {
    id: 4,
    icon: faClock,
    text: "Tuesday - Sunday: 9:00 AM - 5:00 PM",
  },
  { id: 5, icon: faClock, text: "Monday: Closed" },
  { id: 6, icon: faGlobe, text: "www.goldenplate.com" },
];

export const socialLinks = [
  { id: "facebook", label: "Facebook", icon: faFacebook, href: "" },
  { id: "instagram", label: "Instagram", icon: faInstagram, href: "" },
  { id: "x", label: "X (Twitter)", icon: faXTwitter, href: "" },
];
