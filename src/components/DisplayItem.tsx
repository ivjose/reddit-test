/* eslint-disable react/no-danger */
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

type Props = {
  title: string;
  content: string;
  thumbnail: string | false | null;
  video?: any;
};

const DisplayItem: React.FC<Props> = ({ title, content, thumbnail, video }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {thumbnail && !video && (
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image={thumbnail}
            title="Contemplative Reptile"
          />
        )}

        {video && <div dangerouslySetInnerHTML={{ __html: video.html }} />}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DisplayItem;
