import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Container from '@material-ui/core/Container';

import { snoowrapClient } from 'lib/snoowrapClient';

import Layout from 'components/Layout';
import Comments from 'components/Comments';

type Params = {
  postId: string;
};

const fetchPost = (id: string) => {
  const posts = snoowrapClient.getSubmission(id);
  return posts.fetch().then((post) => {
    return post;
  });
};

const Post = () => {
  const { postId } = useParams<Params>();
  const { data, isLoading, error } = useQuery(['post', postId], () =>
    fetchPost(postId),
  );

  if (isLoading) return <div>...loading</div>;

  return (
    <Layout>
      <Container maxWidth="md" component="main">
        <h1>{data?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data?.selftext_html || '' }} />
        {data?.thumbnail !== 'self' && !data?.secure_media && (
          <img
            src={data?.url}
            alt={data?.title}
            style={{
              maxWidth: '100%',
              height: 'auto',
              margin: '0 auto',
              display: 'block',
            }}
          />
        )}
        {data?.secure_media?.type === 'youtube.com' && (
          <div
            dangerouslySetInnerHTML={{
              __html: data?.secure_media?.oembed?.html || '',
            }}
          />
        )}
        <h3>Comments:</h3>
        <Comments comments={data?.comments} />
      </Container>
    </Layout>
  );
};

export default Post;
