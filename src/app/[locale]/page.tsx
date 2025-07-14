import { Metadata } from 'next'
import { Dashboard } from '@/components/Dashboard/Dashboard'
import { getTranslations } from '@/utils/translations'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const translations = await getTranslations(locale)

  return {
    title: translations.home.pageTitle,
    description: translations.home.metaDescription,
  }
}

export default function HomePage() {
  return <Dashboard />
}
