import { Routes, Route } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import BlogLayout from '@/layouts/BlogLayout'
import AdminLayout from '@/layouts/AdminLayout'
import HomePage from '@/features/home/HomePage'
import BlogIndexPage from '@/features/blog/pages/BlogIndexPage'
import ArticlePage from '@/features/blog/pages/ArticlePage'
import LoginPage from '@/features/admin/pages/LoginPage'
import DashboardPage from '@/features/admin/pages/DashboardPage'
import ArticlesListPage from '@/features/admin/pages/ArticlesListPage'
import ArticleEditPage from '@/features/admin/pages/ArticleEditPage'
import CategoriesPage from '@/features/admin/pages/CategoriesPage'
import PagesListPage from '@/features/admin/pages/PagesListPage'
import PageEditorPage from '@/features/admin/pages/PageEditorPage'
import SettingsPage from '@/features/admin/pages/SettingsPage'
import AboutPage from '@/features/pages/AboutPage'
import FaqPage from '@/features/pages/FaqPage'
import ContactPage from '@/features/pages/ContactPage'
import TherapyPage from '@/features/pages/TherapyPage'
import RetreatsPage from '@/features/pages/RetreatsPage'
import TrainingPage from '@/features/pages/TrainingPage'
import ResourcesPage from '@/features/pages/ResourcesPage'
import ShopPage from '@/features/pages/ShopPage'
import TheModelPage from '@/features/pages/TheModelPage'
import PillarGuide from '@/features/pages/PillarGuide'
import ServicePage from '@/features/pages/ServicePage'
import { PrivacyPage, TermsPage, DisclaimerPage } from '@/features/pages/legalPages'
import PlaceholderPage from '@/components/PlaceholderPage'
import ProtectedRoute from '@/router/ProtectedRoute'
import { useSiteSettings } from '@/features/site/useSettings'

export default function App() {
  // Hydrate the shared `site` config from the CMS; re-renders the tree on load.
  useSiteSettings()

  return (
    <Routes>
      {/* Public marketing pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="therapy" element={<TherapyPage />} />
        <Route path="retreats" element={<RetreatsPage />} />
        <Route path="training" element={<TrainingPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Route>

      {/* Blog + guide pages (lighter article template layout) */}
      <Route element={<BlogLayout />}>
        <Route path="articles" element={<BlogIndexPage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route path="the-model" element={<TheModelPage />} />
        <Route path="pillar-marriage-couples" element={<PillarGuide slug="pillar-marriage-couples" />} />
        <Route path="pillar-trauma-ptsd" element={<PillarGuide slug="pillar-trauma-ptsd" />} />
        <Route path="pillar-family-parenting" element={<PillarGuide slug="pillar-family-parenting" />} />
        <Route path="services/:slug" element={<ServicePage />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="articles" element={<ArticlesListPage />} />
        <Route path="articles/new" element={<ArticleEditPage />} />
        <Route path="articles/:slug/edit" element={<ArticleEditPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="pages" element={<PagesListPage />} />
        <Route path="pages/:key" element={<PageEditorPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
