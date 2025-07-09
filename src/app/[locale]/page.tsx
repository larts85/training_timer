import { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Button from '@/components/Button/Button'
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

  return (
    <>
      <Header locale={locale} />
      <main>
        <h1>{translations.home.greeting}</h1>
        <Button cta="Save changes" className="btn-primary" />
      </main>
    </>
  )
}
