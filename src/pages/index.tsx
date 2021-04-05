/* eslint-disable import/no-unresolved */
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

import { FiUser, FiCalendar } from 'react-icons/fi'
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  // TODO

  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        <Header />
        <section className={styles.postsContainer}>
          <div className={styles.posts}>
            <h1>Como utilizar Hooks </h1>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.postsInfos}>
              <div>
                <FiUser />
                <time>15 Mar 2021</time>
              </div>
              <div>
                <FiCalendar />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </div>
          <div className={styles.posts}>
            <h1>Como utilizar Hooks </h1>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.postsInfos}>
              <div>
                <FiUser />
                <time>15 Mar 2021</time>
              </div>
              <div>
                <FiCalendar />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </div>
          <div className={styles.posts}>
            <h1>Como utilizar Hooks </h1>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.postsInfos}>
              <div>
                <FiUser />
                <time>15 Mar 2021</time>
              </div>
              <div>
                <FiCalendar />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </div>
        </section>
        <button type="button" className={styles.loadMorePosts}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const prismic = getPrismicClient();
  // const postsResponse = await prismic.query([]);

  // return {
  //   props: {}
  // }
// };
