import React, { useCallback, useEffect , useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function InputFormLocal({rtcClient}) {
  const label = 'あなたの名前'
  const classes = useStyles();
  const [ name, setName ] = useState('')
  const [ disabled, setDisabled ] = useState(false)
  const [ isComposed, setIsComposed] = useState(false)
  // onCompositionEnd onCompositionStart onCompositionUpdate

  useEffect(() => {
    const disabled = name === '';
    setDisabled(disabled)
  }, [name])

  const initializeLocalPeer = useCallback(
    (e) => {
      rtcClient.localPeername = name;
      console.log({rtcClient})
      rtcClient.setRtcClient()
      e.preventDefault();
    }, [name, rtcClient]
  );

  if(rtcClient.localPeername !== '') return <></>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {label}を入力してください
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={label}
            name="name"
            onChange={ (e) => setName(e.target.value) }
            onCompositionEnd={() => {setIsComposed(false)}}
            onCompositionStart={() => {setIsComposed(true)}}
            value = {name}
            onKeyDown={(e) => {
                console.log(e.target.value)
                if (isComposed) return;
                if (e.target.value === '') return
                if (e.key === 'Enter') initializeLocalPeer(e);
            }}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
            onClick={(e) => {
              initializeLocalPeer(e);
            }}

          >
            決定
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}