import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CameraAlt } from '@mui/icons-material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Webcam from 'react-webcam';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormHelperText }  from '@mui/material';
import logo from "./assets/Manulife-Logo.jpg";
import gologo from "./assets/logo.png";
import { FormControl } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App({formik, loadingFLag}) {
  const webcamRef = React.useRef(null);
  const [cameraFlag, setCameraFlag] = React.useState(true);
  const [videoFlag, setvideoFlag] = React.useState(true);
  
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    formik.setFieldValue("picture", imageSrc.split(',')[1]);
    setCameraFlag(false);
  }, [webcamRef]);

  const recapture = React.useCallback(() => {
    formik.setFieldValue("picture", "");
    formik.setFieldValue("video", "");
    setCameraFlag(true);
    setvideoFlag(true);
  }, [webcamRef]);
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div> 
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingFLag}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        <Box sx={{ flexGrow: 11 }}>
          <AppBar position="static">
            <Toolbar style={{backgroundColor: "#00a758", fontSize: 40, height: 80, fontWeight: 'bold'}}>
              <Grid container spacing={10}>
                <Grid item xs={1} md={1}></Grid>
                <Grid item xs={4} md={4}>
                  <div style={{height: 65}}></div>
                  <img style={{height: 100}} src={gologo} align="left"/>
                </Grid>
                <Grid item xs={2} md={2}></Grid>
                <Grid item xs={4} md={4} >
                  <div style={{height: 80}}></div>
                  <img style={{height: 50}} src={logo} align="right"/>
                </Grid>
                <Grid item xs={1} md={1}></Grid>
              </Grid>              
            </Toolbar>
          </AppBar>
          <Card style={{backgroundColor: "#00a758", height: window.innerHeight - 80}}>
            <CardContent>
              <Box sx={{ m: 7 }} /> 
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={10}>
                  <Grid item xs={1} md={1}>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Item style={{padding: 50, borderRadius: 50}}>
                      <TextField 
                        fullWidth 
                        label="Nama" 
                        variant="outlined" 
                        width="100%" 
                        name="name"
                        helperText=" "
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="select-label">Gender</InputLabel>
                        <Select
                          fullWidth
                          labelId="select-label"
                          id="gender-select"
                          name="gender-select"
                          align="left"
                          value={formik.values.gender}
                          label="Gender" 
                          onChange={(event) => {
                            formik.setFieldValue("gender", event.target.value);
                          }}
                        >
                          <MenuItem value={"L"}>Laki - laki</MenuItem>
                          <MenuItem value={"P"}>Perempuan</MenuItem>
                        </Select>  
                        <FormHelperText> </FormHelperText>                    
                      </FormControl>
                      <TextField 
                        fullWidth 
                        label="Domisili" 
                        variant="outlined" 
                        width="100%" 
                        name="domisili"
                        helperText=" "
                        multiline
                        rows={5}
                        onChange={formik.handleChange}
                        value={formik.values.domisili}
                      />
                      <TextField 
                        fullWidth 
                        label="Bahasa" 
                        variant="outlined"
                        disabled 
                        width="100%" 
                        name="bahasa"
                        helperText=" "
                        value={formik.values.language}
                      /> 
                      <FormControl fullWidth>
                        <InputLabel id="select-label">Presenter Gender</InputLabel>
                        <Select
                          fullWidth
                          labelId="gender-presenter"
                          id="gender-presenter"
                          name="gender-presenter"                        
                          value={formik.values.presenterGender}
                          label="Presenter Gender" 
                          align="left"
                          onChange={(event) => {
                            formik.setFieldValue("presenterGender", event.target.value);
                          }}
                        >
                          <MenuItem value={"L"}>Laki - laki</MenuItem>
                          <MenuItem value={"P"}>Perempuan</MenuItem>  
                        </Select>  
                        <FormHelperText> </FormHelperText>                    
                      </FormControl>
                      <Stack spacing={2}>
                        <Button onClick={cameraFlag ? capture: recapture} variant="contained" endIcon={<CameraAlt />}>
                          {cameraFlag ? 
                            <div>Take Picture</div> : 
                            <div>Retake Picture</div>
                          }
                        </Button>
                      </Stack>                    
                    </Item>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Item style={{padding: 50, borderRadius: 50}}>
                      <Stack direction="column" spacing={2}>
                        {
                          formik.values.video ?
                            <video controls autoPlay={true} style={{height: 470}}>
                              <source src={formik.values.video} type="video/mp4" />
                                Sorry, your browser doesn't support embedded videos.
                            </video>    :
                            formik.values.picture ?
                            <img style={{height: 470}} src={"data:image/jpeg;base64," + formik.values.picture} />                            :
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              height="470"
                            />                    
                        }
                        <Button 
                          type='submit' 
                          variant="contained" 
                          endIcon={<VideoLibraryIcon />}
                        >
                          Generate Video
                        </Button>
                      </Stack>                    
                    </Item>
                  </Grid>
                  <Grid item xs={1} md={1}>
                  </Grid>
                </Grid>
              </Box>         
            </CardContent>
          </Card>
        </Box>
      </div>
    </form>
  );
}

export default App;