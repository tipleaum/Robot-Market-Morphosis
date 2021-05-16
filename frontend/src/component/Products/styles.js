import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    
  },
  root: {
    flexGrow: 1,
    float: 'left',
  },
  grid: {
    marginTop: '75px',
    marginLeft: '25px',
    marginRight: '25px'
  }
}));