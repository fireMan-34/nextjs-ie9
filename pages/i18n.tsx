import { serverSideTranslations, } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }){

  const i18n = await serverSideTranslations(locale, [ 'common' ]);

  return {
    props: {
      ...i18n,
    }
  }
}


function I18nPage() {

  const { t } = useTranslation('common');

  return <main>
    <p style={{ textAlign: 'center' }} >{t('lib')}</p>
  </main>
};

export default I18nPage;