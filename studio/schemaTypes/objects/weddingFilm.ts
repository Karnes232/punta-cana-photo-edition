import { defineField, defineType } from "sanity"

// A short film shown as a poster until played.
export const weddingFilm = defineType({
  name: "weddingFilm",
  title: "Film",
  type: "object",
  fields: [
    defineField({ name: "caption", title: "Caption", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/mp4" },
      description: "MP4, portrait, a few MB at most.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "image",
      description: "Shown before the film plays; same shape as the video.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "caption", media: "poster" } },
})
