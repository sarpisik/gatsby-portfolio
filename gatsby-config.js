process.env.NODE_ENV === "production" ||
  require("dotenv").config({
    path: `.env.development`,
  })

module.exports = {
  siteMetadata: {
    title: `Sarp ISIK Portfolio`,
    description: `Full stack web developer portfolio with Strapi as headless CMS.`,
    author: `@sarpisik`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "tr",
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-layout",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_PROJECT_DATASET,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: process.env.GOOGLE_TRACK_ID,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sarp ISIK Portfolio Web App`,
        short_name: `Sarp ISIK`,
        start_url: `/`,
        background_color: `#6CD4F4`,
        theme_color: `#6CD4F4`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: `src/images/sarp_isik_dark_logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap.xml`,
        policy: [{ userAgent: "*", disallow: "" }],
      },
    },
    // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`,
  ],
}
