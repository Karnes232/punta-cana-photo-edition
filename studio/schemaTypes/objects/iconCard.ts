import { defineField, defineType } from "sanity"

// The icons the site can draw beside a card, by name. Each value matches a
// lucide-react icon in src/utils/cardIcons.js; adding one here also needs
// adding it there.
export const cardIcons = [
  { title: "Clipboard with check (planning)", value: "clipboard-check" },
  { title: "Badge with check (quality)", value: "badge-check" },
  { title: "People (team, guests)", value: "users" },
  { title: "Fork and knife (catering)", value: "utensils" },
  { title: "Headphones (audiovisual)", value: "headphones" },
  { title: "Hotel (venues)", value: "hotel" },
  { title: "Truck (logistics)", value: "truck" },
  { title: "Shield with check (safety)", value: "shield-check" },
  { title: "Map pin (local)", value: "map-pin" },
  { title: "Speech bubble (communication)", value: "message-circle" },
  { title: "Wallet (budget)", value: "wallet-cards" },
  { title: "Sparkles (design)", value: "sparkles" },
  { title: "Party popper (celebration)", value: "party-popper" },
  { title: "Check mark", value: "check" },
  { title: "House (villa)", value: "home" },
  { title: "Calendar with check (wedding day)", value: "calendar-check" },
  { title: "Map with pin (venue search)", value: "map-pinned" },
  { title: "Globe (cultural weddings)", value: "globe" },
  { title: "Car (transportation)", value: "car-front" },
  { title: "Camera (photography)", value: "camera" },
  { title: "Handshake with heart (coordination)", value: "heart-handshake" },
  { title: "Flower (flowers)", value: "flower-2" },
  { title: "Document with check (certificate)", value: "file-check-2" },
  { title: "Phone (phone video)", value: "smartphone" },
  { title: "Music notes (music)", value: "music-2" },
  { title: "Person with check (coordinator)", value: "user-round-check" },
  { title: "Video camera (video)", value: "video" },
  { title: "Crossed fork and knife (dinner)", value: "utensils-crossed" },
  { title: "Calendar with check (date)", value: "calendar-check-2" },
  { title: "Document (agreement)", value: "file-text" },
]

// A card with an icon, a title and a short text, e.g. one service in
// "What We Manage" or one reason in "Why Sertuin".
export const iconCard = defineType({
  name: "iconCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: cardIcons },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
})
