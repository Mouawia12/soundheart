/**
 * UI chrome strings (nav, buttons, form labels). Long-form marketing copy
 * lives in per-page content modules (e.g. features/home/content.ts) and will
 * ultimately be served by the CMS. Keeping strings out of JSX keeps the app
 * ready for the Arabic (RTL) build.
 */
const en = {
  nav: {
    about: 'About',
    model: 'The Model',
    therapy: 'Therapy',
    retreats: 'Retreats',
    training: 'Training',
    resources: 'Resources',
    shop: 'Shop',
    contact: 'Contact',
    book: 'Book a consultation',
  },
  common: {
    bookConsultation: 'Book a consultation',
    read: 'Read',
    readArticle: 'Read the article',
    viewAllArticles: 'View all articles',
    menu: 'Menu',
  },
} as const

export default en
