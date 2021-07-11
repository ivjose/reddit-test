import { useState } from 'react';
import { useQuery } from 'react-query';
import { snoowrapClient } from 'lib/snoowrapClient';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import Layout from 'components/Layout';
import DisplayItem from 'components/DisplayItem';

type Data = {
  link: string;
  title: string;
  comments: any;
  name: string;
  content: string;
  thumbnail: string;
  thumbnailHeight: number | null | undefined;
  thumbnailWidth: number | null | undefined;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
    margin: '0 auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  chip: {
    marginLeft: theme.spacing(1),
    textTransform: 'capitalize',
  },
}));

async function fetchGroups(
  subreddit: string,
  sort: string,
): Promise<Data[] | undefined> {
  let posts = null;

  if (sort === 'new') {
    posts = await snoowrapClient.getSubreddit(subreddit).getNew({ limit: 9 });
  }

  if (sort === 'hot') {
    posts = await snoowrapClient.getSubreddit(subreddit).getHot({ limit: 9 });
  }

  const data = sort
    ? posts?.map((post) => ({
        link: post.url,
        title: post.title,
        content: post.selftext,
        comments: post.comments,
        imgUrl: post.url,
        name: post.name,
        thumbnail: post.thumbnail,
        thumbnailHeight: post.thumbnail_height,
        thumbnailWidth: post.thumbnail_width,
      }))
    : [];
  console.log(posts, 'DDDDDDDDDDDDDdd');

  //   if (sort === 'controversial') {
  //     throw new Error('Problem fetching data');
  //   }
  return data;
}

const sortList = ['hot', 'new', 'top', 'controversial'];

const Home: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState('hot');
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const { data, isLoading, error } = useQuery(['subreddit', selectedSort], () =>
    fetchGroups('ProjectDiablo2', selectedSort),
  );

  const handleSelect = (value: string) => {
    console.log('TEST');
    setSelectedSort(value);
  };

  //   console.log(isLoading, error, data, 'DDDDDDDDDd');

  return (
    <Layout>
      <Container maxWidth="md" component="main">
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box m={2}>
          {sortList.map((name) => (
            <Chip
              key={name}
              label={name}
              color={selectedSort === name ? 'primary' : 'default'}
              onClick={() => handleSelect(name)}
              className={classes.chip}
            />
          ))}
        </Box>
        <Box>
          {data?.map((item) => {
            console.log(item);

            return (
              <DisplayItem
                key={item.name}
                title={item.title}
                content={item.content}
                thumbnail={item.thumbnail}
                thumbnailHeight={item.thumbnailHeight}
                thumbnailWidth={item.thumbnailWidth}
              />
            );
          })}
        </Box>
        HOME
      </Container>
    </Layout>
  );
};

export default Home;

// t3_ohmx97
// t5_2kkfny
