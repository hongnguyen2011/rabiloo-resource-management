import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useAppLanguage} from '../../../hooks';

function HomeSidebar(props) {
  const {archives, description, social, title} = props;
  const {Strings} = useAppLanguage();

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{p: 2, bgcolor: 'grey.200'}}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{mt: 3}}>
        {Strings.social}
      </Typography>
      {social.map(network => (
        <Link
          display="block"
          variant="body1"
          href="https://rabiloo.com/vi/about-us"
          key={network.name}
          sx={{mb: 0.5}}>
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}

HomeSidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default HomeSidebar;
