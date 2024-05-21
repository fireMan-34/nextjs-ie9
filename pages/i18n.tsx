import { serverSideTranslations, } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  const { pathname, query, asPath,  push} = useRouter();

  return <main>
    <p style={{ textAlign: 'center' }} >{t('lib')}</p>
    <dd>
      <dt>切换多语言</dt>
      <dl onClick={() => push({ pathname, query, }, { pathname, query }, { locale: 'zh_CN' })} >
        zh_CN
      </dl>
      <dl onClick={() => push({ pathname, query, }, { pathname, query }, { locale: 'en_US' })} >
        en_US
      </dl>
    </dd>
  </main>
};

export default I18nPage;