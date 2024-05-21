import { serverSideTranslations, } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CookieStorage } from 'utils/client.cookie';
import { NEXT_LOCALE } from 'constants/index';

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

  const changeLocaleRoute = (locale: 'zh_CN'|'en_US') => () => {
    const cookie = new CookieStorage();
    cookie.set(NEXT_LOCALE, locale, );
    push({ pathname, query }, asPath, { locale });
  };

  return <main>
    <p style={{ textAlign: 'center' }} >{t('lib')}</p>
    <dl>
      <dt>切换多语言</dt>
      <dd onClick={changeLocaleRoute('zh_CN')} >
        zh_CN
      </dd>
      <dd onClick={changeLocaleRoute('en_US')} >
        en_US
      </dd>
      {/* can jump with locale, but no use layout */}
      <dd>
        <Link href={"/settings"} >settings</Link>
      </dd>
      <dd>
        <Link href={"/doc"} >doc</Link>
      </dd>
    </dl>
  </main>
};

export default I18nPage;