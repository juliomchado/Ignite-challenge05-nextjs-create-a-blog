/* eslint-disable import/no-unresolved */
import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

import { FiUser, FiCalendar } from 'react-icons/fi';
import styles from './home.module.scss';
import Header from '../components/Header';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination.results);
  const [newPosts, setNewPosts] = useState(postsPagination.next_page);

  const getNewPosts = async () => {
    const getPosts = await fetch(newPosts).then(response => response.json());

    const formatPosts: Post[] = getPosts.results.map(post => {
      const format = {
        uid: post.uid,
        first_publication_date: new Date(
          post.last_publication_date
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        data: {
          title: post.data.title[0].text,
          subtitle: post.data.subtitle[0].text,
          author: post.data.author[0].text,
        },
      };

      return format;
    });

    const oldPostsUid = posts.filter(
      (data, index) => data.uid === formatPosts[index].uid
    );


    if (oldPostsUid.length === 0) {
      setPosts([...posts, ...formatPosts]);
      setNewPosts(getPosts.next_page);
    }
  };

  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        <Header />
        <ul>
          {posts.map(post => (
            <li key={post.uid} className={styles.postsContainer}>
              <Link href={`/post/${post.uid}`}>
                <a className={styles.posts}>
                  <h1>{post.data.title}</h1>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.postsInfos}>
                    <div>
                      <FiUser />
                      <time>{post.first_publication_date}</time>
                    </div>
                    <div>
                      <FiCalendar />
                      <span>{post.data.author}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {newPosts && (
          <button
            onClick={getNewPosts}
            type="button"
            className={styles.loadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: [
        'posts.title',
        'posts.subtitle',
        'posts.author',
        'posts.next_page',
      ],
      pageSize: 1,
    }
  );

  const { next_page } = response;

  const results = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.last_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: RichText.asText(post.data.title),
        subtitle: RichText.asText(post.data.subtitle),
        author: RichText.asText(post.data.author),
      },
    };
  });

  const postsPagination = {
    next_page,
    results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
