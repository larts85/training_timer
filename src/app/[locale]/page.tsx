import { Metadata } from 'next'
import AppClient from '@/components/App/AppClient'
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const translations = await getTranslations(locale)

  return <AppClient locale={locale} greeting={translations.home.greeting} />
}
