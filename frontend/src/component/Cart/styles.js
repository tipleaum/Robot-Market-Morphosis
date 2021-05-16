import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },

  footer: {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    background: '#ffc400',
    color: 'black',
    align: 'center',
    padding: '16px',
    borderRadius: '20px'
  },
  footerLeft: {
    float: 'left',
    color: 'black',
    align: 'center',
  },
  footerRight: {
    float: 'right',
    color: 'black',
    align: 'center',
  },
}));