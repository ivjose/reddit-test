import Layout from 'components/Layout';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { snoowrapClient } from 'lib/snoowrapClient';
import Container from '@material-ui/core/Container';
import Comments from 'components/Comments';

const fetchComment = (id: string) => {
  const comments = snoowrapClient.getComment(id);
  return comments.fetch().then((comment) => {
    return comment;
  });
};

type Params = {
  commentId: string;
};

const Comment: React.FC = () => {
  const { commentId } = useParams<Params>();
  const { data, isLoading, error } = useQuery(['post', commentId], () =>
    fetchComment(commentId),
  );

  if (isLoading) return <div>...loading</div>;
  return (
    <Layout>
      <Container maxWidth="md" component="main">
        <div
          dangerouslySetInnerHTML={{
            __html: data?.body_html || '',
          }}
        />
        <Comments comments={data?.replies} />
      </Container>
    </Layout>
  );
};

export default Comment;
