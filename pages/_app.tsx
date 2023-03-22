import '@/styles/globals.css';
import styles from '@/styles/App.module.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { pages } from './[slug]';

const title = 'Doodle Samples';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const samplesNames = Object.keys(pages);

  const [listExpanded, setListExpanded] = useState<boolean>(false);

  const oldPathSyntaxMatch = router.asPath.match(/(\?wgsl=[01])#(\S+)/);
  if (oldPathSyntaxMatch) {
    const slug = oldPathSyntaxMatch[2];
    router.replace(`/samples/${slug}`);
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <div className={styles.wrapper}>
        <nav
          className={`${styles.panel} ${styles.container}`}
          data-expanded={listExpanded}
        >
          <h1>
            <Link href="/">{title}</Link>
            <div
              className={styles.expand}
              onClick={() => {
                setListExpanded(!listExpanded);
              }}
            ></div>
          </h1>
          <div className={styles.panelContents}>
            <a href={`https://github.com/${process.env.REPOSITORY_NAME}`}>
              Github
            </a>
            <hr />
            <ul className={styles.exampleList}>
              {samplesNames.map((slug) => {
                const className =
                  router.pathname === `/[slug]` && router.query['slug'] === slug
                    ? styles.selected
                    : undefined;
                return (
                  <li
                    key={slug}
                    className={className}
                    onMouseOver={() => {
                      pages[slug].render.preload();
                    }}
                  >
                    <Link
                      href={`/${slug}`}
                      onClick={() => {
                        setListExpanded(false);
                      }}
                    >
                      {slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <Component {...pageProps} />
      </div>
    </>
  );
}
