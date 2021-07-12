/* eslint-disable no-self-compare */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Listing, Submission } from 'snoowrap';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { snoowrapClient } from 'lib/snoowrapClient';
import Layout from 'components/Layout';
import DisplayItem from 'components/DisplayItem';

import { usePrevious } from 'hooks/usePreviouse';

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
  loadMorebutton: {
    maxWidth: 400,
    margin: '0 auto',
    padding: '20px 0',
  },
}));

async function fetchGroups(
  subreddit: string,
  sort?: string,
  total?: number,
): Promise<Listing<Submission> | null> {
  const pageLimit = 9;
  if (sort === 'new') {
    const posts = await snoowrapClient
      .getSubreddit(subreddit)
      .getNew({ limit: pageLimit })
      .then((currentData) => {
        if (!total) return currentData;
        return currentData.fetchMore({ amount: total });
      });

    return posts;
  }

  if (sort === 'top') {
    const posts = await snoowrapClient
      .getSubreddit(subreddit)
      .getTop({ limit: pageLimit })
      .then((currentData) => {
        if (!total) return currentData;
        return currentData.fetchMore({ amount: total });
      });

    return posts;
  }

  if (sort === 'controversial') {
    const posts = await snoowrapClient
      .getSubreddit(subreddit)
      .getControversial({ limit: pageLimit })
      .then((currentData) => {
        if (!total) return currentData;
        return currentData.fetchMore({ amount: total });
      });

    return posts;
  }

  if (sort === 'rising') {
    const posts = await snoowrapClient
      .getSubreddit(subreddit)
      .getRising({ limit: pageLimit })
      .then((currentData) => {
        if (!total) return currentData;
        return currentData.fetchMore({ amount: total });
      });

    return posts;
  }

  const posts = await snoowrapClient
    .getSubreddit(subreddit)
    .getHot({ limit: pageLimit })
    .then((currentData) => {
      if (!total) return currentData;
      return currentData.fetchMore({ amount: total });
    });

  return posts;
}

const sortList = ['hot', 'new', 'top', 'controversial', 'rising'];

const Home: React.FC = () => {
  const classes = useStyles();
  const [selectedSort, setSelectedSort] = useState('hot');
  const prevSort = usePrevious(selectedSort);
  const [total, setTotal] = useState(0);

  const [text, setText] = useState('');
  const [debounceText] = useDebounce(text, 1500);

  const { data, isLoading, error } = useQuery(
    ['subreddit', debounceText, selectedSort, total],
    () => fetchGroups(debounceText, selectedSort, total),
    {
      keepPreviousData: true,
    },
  );

  const handleSelect = (value: string) => {
    setSelectedSort(value);
  };

  const hanldeAddMore = () => {
    setTotal((prevState) => prevState + 10);
  };

  useEffect(() => {
    if (selectedSort !== prevSort) {
      setTotal(0);
    }
  }, [selectedSort, prevSort]);

  if (isLoading) return <h1>...loading</h1>;
  console.log(debounceText, 'DDD');

  return (
    <Layout>
      <Container maxWidth="md" component="main">
        <Paper component="div" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Subreddit name"
            inputProps={{ 'aria-label': 'Subreddit name' }}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
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
        <Grid container justifyContent="center" spacing={3}>
          {data?.map((item) => {
            return (
              <Grid key={item.id} item xs={4}>
                <Link to={`post/${item.id}`}>
                  <DisplayItem
                    title={item.title}
                    content={item.selftext}
                    thumbnail={item.thumbnail !== 'self' && item.url}
                    video={
                      item.secure_media?.type === 'youtube.com' &&
                      item.secure_media.oembed
                    }
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Box className={classes.loadMorebutton}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={hanldeAddMore}
          >
            Load More
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
