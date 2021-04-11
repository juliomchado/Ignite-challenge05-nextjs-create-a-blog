import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(param) {

  const { slug } = param.post;

  return (
    <>
      <Head>
        <title>Post | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        <Header />
        <img className={styles.postImage} src="/images/postTest.png" alt="Post" />
        <div className={styles.postsInfoContainer}>
          <div className={styles.posts}>
            <h1>Criando um app CRA do zero</h1>
            <div className={styles.postsInfos}>
              <div>
                <FiUser />
                <time>15 Mar 2021</time>
              </div>
              <div>
                <FiCalendar />
                <span>Joseph Oliveira</span>
              </div>
              <div>
                <FiClock />
                <time>4 min</time>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export const getStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  // TODO

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  // const prismic = getPrismicClient();
  // const response = await prismic.getByUID(TODO);

  const { slug } = context.params;

  const post = {
    slug,
  };

  // TODO
  return {
    props: {
      post,
    },
  };
};


