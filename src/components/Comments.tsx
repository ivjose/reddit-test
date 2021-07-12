/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingLeft: 40,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    textDecoration: 'none',
  },
  iconButton: {
    padding: 10,
  },
}));

type Props = {
  comments: any;
};

const Comments: React.FC<Props> = ({ comments }) => {
  const classes = useStyles();
  const [open, setOpen] = useState('');

  const handleToggleComment = (id: string) => {
    setOpen((prevId) => (prevId !== id ? id : ''));
  };

  return (
    <List className={classes.root}>
      {comments.map((comment: any) => {
        const hasReplies = comment.replies.length > 0;

        return (
          <React.Fragment key={comment.id}>
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      component={Link}
                      to={`/comment/${comment.id}`}
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: comment?.body_html || '',
                        }}
                      />
                    </Typography>
                  </>
                }
              />
              {hasReplies && (
                <IconButton
                  type="button"
                  className={classes.iconButton}
                  aria-label="toggle"
                  onClick={() => hasReplies && handleToggleComment(comment.id)}
                >
                  {open === comment.id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </ListItem>
            <Divider component="li" />

            {hasReplies && (
              <Collapse in={comment.id === open} timeout="auto" unmountOnExit>
                <Comments comments={comment.replies} />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comments;
