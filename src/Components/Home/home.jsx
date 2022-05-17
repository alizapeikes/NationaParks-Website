import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import video from "../../Images/parksvideo.mp4";
import "./home.css";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DisplayParkContext } from "../State/displayParkContext";
import { WishListContext } from "../State/wishListContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Button,
  CardActionArea,
  CardActions,
  Paper,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
  Alert,
  Icon,
  InputBase,
  Divider,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Tooltip from "@mui/material/Tooltip";

export const Home = () => {
  const [page, setPage] = useState(0);
  const [parks, setParks] = useState([]);
  useEffect(() => {
    getParks();
  }, []);

  function getParks() {
    fetch(
      `https://developer.nps.gov/api/v1/parks?start=${page}&api_key=${"IwDmrGWpHFkUs5tLwy2Miv7L7M1nIoSndJyqltEk"}&limit=50`
    )
      .then((response) => response.json())
      .then((data) => setParks(data.data));
  }
  return (
    <div>
      <NationalParks parks={parks} setParks={setParks} />
      <BottomStepperBar page={page} setPage={setPage} getParks={getParks} />
    </div>
  );
};

const States = [
  "AK - Alaska",
  "AL - Alabama",
  "AR - Arkansas",
  "AS - American Samoa",
  "AZ - Arizona",
  "CA - California",
  "CO - Colorado",
  "CT - Connecticut",
  "DC - District of Columbia",
  "DE - Delaware",
  "FL - Florida",
  "GA - Georgia",
  "GU - Guam",
  "HI - Hawaii",
  "IA - Iowa",
  "ID - Idaho",
  "IL - Illinois",
  "IN - Indiana",
  "KS - Kansas",
  "KY - Kentucky",
  "LA - Louisiana",
  "MA - Massachusetts",
  "MD - Maryland",
  "ME - Maine",
  "MI - Michigan",
  "MN - Minnesota",
  "MO - Missouri",
  "MS - Mississippi",
  "MT - Montana",
  "NC - North Carolina",
  "ND - North Dakota",
  "NE - Nebraska",
  "NH - New Hampshire",
  "NJ - New Jersey",
  "NM - New Mexico",
  "NV - Nevada",
  "NY - New York",
  "OH - Ohio",
  "OK - Oklahoma",
  "OR - Oregon",
  "PA - Pennsylvania",
  "PR - Puerto Rico",
  "RI - Rhode Island",
  "SC - South Carolina",
  "SD - South Dakota",
  "TN - Tennessee",
  "TX - Texas",
  "UT - Utah",
  "VA - Virginia",
  "VI - Virgin Islands",
  "VT - Vermont",
  "WA - Washington",
  "WI - Wisconsin",
  "WV - West Virginia",
  "WY - Wyoming",
];
const SearchByState = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={States}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField id="standard-basic" {...params} label="State" />
      )}
    />
  );
};
const SearchBar = (props) => {
  const [searchWord, setSearchWord] = useState("");
  function handleChange(event) {
    setSearchWord(event.target.value);
  }
  function updateParks() {
    fetch(
      `https://developer.nps.gov/api/v1/parks?q=${searchWord}&api_key=${"IwDmrGWpHFkUs5tLwy2Miv7L7M1nIoSndJyqltEk"}&limit=50`
    )
      .then((response) => response.json())
      .then((data) => props.setParks(data.data))
      .then(console.log("testing" + searchWord));
  }
  return (
    <div className="searchBar">
      <Paper
        className="paper"
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 500,
          height: "3.5em",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by Keyword"
          inputProps={{ "aria-label": "Search by Keyword" }}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => updateParks()}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

const NationalParks = (props) => {
  return (
    <div>
      {/* <video autoPlay loop muted className="video">
        <source src={video} type="video/mp4"></source>
      </video> */}
      <SearchBar getParks={props.setParks} setParks={props.setParks} />
      <SearchByState />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginRight: "auto", marginLeft: "auto", width: "95%" }}
      >
        <Grid container spacing={4}>
          {props.parks.length === 0 ? (
            <div>loading...</div>
          ) : (
            props.parks.map((item, index) => (
              <NationalParksCard key={index} item={item} index={index} />
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

const NationalParksCard = (props) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const { wishList, setWishList } = useContext(WishListContext);
  const [alert, setAlert] = useState("Park added to wishlist!");
  function addToWishList() {
    const tempList = [...wishList];
    const index = tempList.findIndex((park) => park.id === props.item.id);
    if (index === -1) {
      setAlert("Park added to Wish List!");
      const newWishList = [...wishList, props.item];
      setWishList(newWishList);
    } else {
      setAlert("Park already in Wish List!");
    }
    setOpenAlert(true);
  }
  return (
    <Grid item xs={3}>
      <Card
        sx={{ maxWidth: 345, height: "100%" }}
        key={props.index}
        className="card"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.item.images[0].url}
            alt="park"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.item.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="cardActions">
          <IconAlert
            park={props.item}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            alert={alert}
          />
          <Tooltip title="Add to Wish List">
            <IconButton onClick={() => addToWishList()}>
              <FavoriteBorderIcon
                sx={{ color: "#1272D1", "&:hover": { color: "red" } }}
              />
            </IconButton>
          </Tooltip>
          <QuickView item={props.item} />
        </CardActions>
      </Card>
    </Grid>
  );
};

const IconAlert = (props) => {
  function closeAlert() {
    props.setOpenAlert(false);
  }
  return (
    <Collapse in={props.openAlert}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              closeAlert();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {props.alert}
      </Alert>
    </Collapse>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuickView = (props) => {
  const [open, setOpen] = React.useState(false);
  const { park, setPark } = useContext(DisplayParkContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const explorePark = () => {
    setPark(props.item);
    navigate("/explore");
  };
  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Quick View
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Carousel item={props.item} />
        <DialogTitle>{props.item.fullName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.item.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              explorePark();
            }}
          >
            Exlore Park
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ /* maxWidth: 400,*/ flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.item.images.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 300,
                  display: "block",
                  // maxWidth: 400,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.url}
                alt={step.altText}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

const BottomStepperBar = (props) => {
  const [value, setValue] = React.useState(0);
  function updatePage() {
    props.getParks();
    window.scrollTo(0, 0);
  }

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Previous"
          icon={<ArrowBackIcon />}
          onClick={
            props.page === 0
              ? () => props.setPage(0)
              : () => {
                  props.setPage(props.page - 50);
                  updatePage();
                }
          }
        />
        <BottomNavigationAction
          label="Next"
          icon={<ArrowForwardIcon />}
          onClick={
            props.start === 466
              ? () => props.setPage(466)
              : () => {
                  props.setPage(props.page + 50);
                  updatePage();
                }
          }
        />
      </BottomNavigation>
    </Box>
  );
};
