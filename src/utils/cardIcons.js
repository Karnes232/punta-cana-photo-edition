import {
  BadgeCheck,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Globe2,
  Headphones,
  Home,
  Hotel,
  MapPin,
  MapPinned,
  MessageCircle,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Utensils,
  WalletCards,
} from "lucide-react";

// Card icons by the name chosen in Sanity (studio/schemaTypes/objects/iconCard.ts,
// which lists the same names for editors).
export const cardIcons = {
  "badge-check": BadgeCheck,
  "calendar-check": CalendarCheck,
  check: Check,
  "clipboard-check": ClipboardCheck,
  globe: Globe2,
  headphones: Headphones,
  home: Home,
  hotel: Hotel,
  "map-pin": MapPin,
  "map-pinned": MapPinned,
  "message-circle": MessageCircle,
  "party-popper": PartyPopper,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  truck: Truck,
  users: Users,
  utensils: Utensils,
  "wallet-cards": WalletCards,
};

// The icon for a name, or a check mark for an unknown one.
export const cardIcon = (name) => cardIcons[name] || Check;
