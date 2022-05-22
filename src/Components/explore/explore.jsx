import React, { useState, useEffect, useContext } from "react";
import { DisplayParkContext } from "../State/displayParkContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import DirectionsIcon from "@mui/icons-material/Directions";
import Container from "@mui/material/Container";
import "./explore.css";
import CardContent from "@mui/material/CardContent";
import { ThingsTodoContext } from "../State/thingsToDoContext";
import weatherPic from "../../Images/weather.png";
import CardMedia from "@mui/material/CardMedia";
import NPPic from "../../Images/NationalParkPic.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EmailIcon from "@mui/icons-material/Email";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const Explore = () => {
  const parkContext = useContext(DisplayParkContext);
  const [currPark, setCurrPark] = useState([]);
  const [thingsTodoList, setThingsTodoList] = useState([]);
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    getPark();
  }, []);
  function getPark() {
    console.log([parkContext.parkState.parkCode]);
    fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=
        ${parkContext.parkState.parkCode}
      &api_key=${"8yqhe2WFRMWYNZgBFRmxnub058irC6R85P9uUSIE"}`
    )
      .then((response) => response.json())
      .then((data) => setCurrPark(data.data));

    fetch(
      `https://developer.nps.gov/api/v1/thingstodo?parkCode=${
        parkContext.parkState.parkCode
      }&api_key=${"IwDmrGWpHFkUs5tLwy2Miv7L7M1nIoSndJyqltEk"}`
    )
      .then((response) => response.json())
      .then((data) => setThingsTodoList(data.data));
  }
  return (
    <div>
      <img src={NPPic} alt={""} width="100%"></img>

      {currPark.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={2} className="sideBar">
              <SideNav setChoice={setChoice} choice={choice} />
            </Grid>
            <Grid item xs={9.5}>
              <Typography className="parkTitle" variant="h2" align="center">
                {parkContext.parkState.fullName}
              </Typography>
              <Divider />
              {parkContext.parkState.parkCode === "" ? (
                <div>Please Choose a Park...</div>
              ) : (
                <div className="main-content">
                  <Display
                    choice={choice}
                    park={parkContext.parkState}
                    thingsTodoList={thingsTodoList}
                    setThingsTodoList={setThingsTodoList}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

const Display = (props) => {
  switch (props.choice) {
    case 0:
      return (
        <ThingsToDo thingsTodoList={props.thingsTodoList} park={props.park} />
      );
    case 1:
      return <Contact park={props.park} />;
    case 2:
      return <Arrival park={props.park}></Arrival>;
    case 3:
      return <Weather park={props.park} />;
  }
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SideNav = (props) => {
  function handleChange(event, newValue) {
    props.setChoice(newValue);
  }

  return (
    <Box
      sx={{
        flexGrow: 2,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
        marginLeft: "10%",
        marginTop: "65%",
        boxShadow: 1,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={props.choice}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab className="tab" label="Things To Do" {...a11yProps(0)} />
        <Tab className="tab" label="Contact" {...a11yProps(1)} />
        <Tab className="tab" label="Arrival Info" {...a11yProps(2)} />
        <Tab className="tab" label="Weather" {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

const ThingsToDo = (props) => {
  const { thingsTodo, setThingsTodo } = useContext(ThingsTodoContext);

  return (
    <div>
      <Container className="centerItem">
        <Box
          className="centerItem"
          sx={{
            boxShadow: 2,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 10,
            m: 1,
            borderRadius: 2,
            borderRight: "auto",
            borderLeft: "auto",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Typography gutterBottom variant="h4" component="div" align="center">
            Things To Do
          </Typography>
          {props.thingsTodoList.length !== 0 ? (
            props.thingsTodoList.map((item, index) => (
              <ThingToDoItem
                key={index}
                item={item}
                thingsTodo={thingsTodo}
                setThingsTodo={setThingsTodo}
                park={props.park}
              />
            ))
          ) : (
            <div>No information found for the selected park</div>
          )}
        </Box>
      </Container>
    </div>
  );
};

const ThingToDoItem = (props) => {
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("Added!");
  const [alertType, setAlertType] = useState("success");
  function addToItinerary() {
    const tempList = [...props.thingsTodo.list];
    const index = tempList.findIndex((todo) => todo.id === props.item.id);
    if (index === -1) {
      const newThingsTodo = [
        ...props.thingsTodo.list,
        {
          id: props.item.id,
          name: props.item.title,
          description: props.item.shortDescription,
          reservation: props.item.isReservationRequired,
          image: props.item.images[0].url,
        },
      ];
      props.setThingsTodo({ name: props.park.fullName, list: newThingsTodo });
      setAlertText("Added!");
      setAlertType("success");
    } else {
      setAlertText("Already in Itinerary");
      setAlertType("info");
    }
    setOpen(true);
  }
  return (
    <div>
      <Stack paddingTop="5%" direction="row" spacing={2}>
        <div>
          <img
            minHeight="325px"
            minWidth="400px"
            height="325px"
            width="400px"
            className="thingstodo-image"
            src={props.item.images[0].url}
            alt={props.item.images[0].altText}
          ></img>
        </div>

        <div className="desc-text-and-button">
          <div className="description-text">
            <Typography
              fontWeight="bold"
              sx={{
                fontFamily: "Helvetica",
              }}
            >
              {props.item.title}
            </Typography>
            <Typography sx={{ fontStyle: "italic", paddingBottom: "3%" }}>
              Reservation Required:
              {props.item.isReservationRequired === "true" ? " Yes" : " No"}
            </Typography>
            <Typography>{props.item.shortDescription}</Typography>
          </div>
          <div className="add-button-wrapper">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4B90F0" }}
              onClick={() => addToItinerary()}
            >
              Add To Itinerary
            </Button>
          </div>
          <div className="added-to-itinerary-alert">
            <AddedToItineraryAlert
              open={open}
              setOpen={setOpen}
              alertText={alertText}
              alertType={alertType}
            />
          </div>
        </div>
      </Stack>
    </div>
  );
};

const AddedToItineraryAlert = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={props.open}>
        <Alert
          severity={props.alertType}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.alertText}
        </Alert>
      </Collapse>
    </Box>
  );
};

const Weather = (props) => {
  return (
    <div className="centerItem">
      <Card className="centerItem" sx={{ width: "80%", marginTop: ".8%" }}>
        <CardActionArea>
          <CardContent sx={{ paddingTop: "8%" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align="center"
            >
              Weather
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center">
              {props.park.weatherInfo}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="180"
            image={weatherPic}
            alt="Weather Pic"
          />
        </CardActionArea>
      </Card>
    </div>
  );
};

const Contact = (props) => {
  return (
    <div>
      <Container className="centerItem">
        <Box
          sx={{
            boxShadow: 2,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 10,
            m: 1,
            borderRadius: 2,
            width: "85%",
            borderRight: "auto",
            borderLeft: "auto",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Typography gutterBottom variant="h4" component="div" align="center">
            Contact
          </Typography>
          <div>
            <Typography variant="h5" component="div">
              Phone
            </Typography>
            <List>
              {props.park.contacts.phoneNumbers.map((item, index) => (
                <ListItem>
                  <ListItemIcon>
                    <LocalPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.phoneNumber} />
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Typography sx={{ mt: 2 }} variant="h5" component="div">
              Email
            </Typography>
            <List>
              {props.park.contacts.emailAddresses.map((item, index) => (
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.emailAddress} />
                </ListItem>
              ))}
            </List>
          </div>

          <div>
            <Typography variant="h5" component="div">
              Addresses
            </Typography>
            <List>
              {props.park.addresses.map((item, index) => (
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      (item.line2 && item.line2 + ": ") +
                      item.line1 +
                      "\n" +
                      item.city +
                      ", " +
                      item.stateCode +
                      " " +
                      item.postalCode
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Typography sx={{ mt: 2 }} variant="h5" component="div">
              Directions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DirectionsIcon />
                </ListItemIcon>
                <ListItemText primary={props.park.directionsInfo} />
              </ListItem>
            </List>
          </div>
        </Box>
      </Container>
    </div>
  );
};

const Arrival = (props) => {
  return (
    <div>
      <Container className="centerItem">
        <Box
          className="centerItem"
          sx={{
            boxShadow: 2,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 10,
            m: 1,
            borderRadius: 2,
            width: "85%",
            borderRight: "auto",
            borderLeft: "auto",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Typography gutterBottom variant="h4" component="div" align="center">
            Arrival Info
          </Typography>
          <div>
            <Typography variant="h5" component="div">
              Operating Hours
            </Typography>
            {props.park.operatingHours.map((item, index) => (
              <List>
                <ListItem key={index}>
                  <ListItemText primary={item.description} />
                </ListItem>
                <ListItem className="operating-hours-info" key={index}>
                  <ListItemText
                    primary={"Sunday: " + item.standardHours.sunday}
                  />
                </ListItem>
                <ListItem className="operating-hours-info" key={index}>
                  <ListItemText
                    primary={"Monday: " + item.standardHours.monday}
                  />
                </ListItem>
                <ListItem className="operating-hours-info" key={index}>
                  <ListItemText
                    primary={"Tuesday: " + item.standardHours.tuesday}
                  />
                </ListItem>
                <ListItem key={index} className="operating-hours-info">
                  <ListItemText
                    primary={"Wednesday: " + item.standardHours.wednesday}
                  />
                </ListItem>
                <ListItem key={index} className="operating-hours-info">
                  <ListItemText
                    primary={"Thursday: " + item.standardHours.thursday}
                  />
                </ListItem>
                <ListItem key={index} className="operating-hours-info">
                  <ListItemText
                    primary={"Friday: " + item.standardHours.friday}
                  />
                </ListItem>
                <ListItem key={index} className="operating-hours-info">
                  <ListItemText
                    primary={"Saturday: " + item.standardHours.saturday}
                  />
                </ListItem>
              </List>
            ))}
          </div>
          <div>
            <Typography variant="h5" component="div">
              Entrance Fees
            </Typography>
            <List>
              {props.park.entranceFees.map((item, index) => (
                <div>
                  <ListItem>
                    <ListItemText primary={"Title: " + item.title} />
                  </ListItem>

                  <ListItem>
                    <ListItemText primary={"Descrption: " + item.description} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={"Cost: $" + item.cost} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
          <div>
            <Typography variant="h5" component="div">
              Entrance Passes
            </Typography>
            <List>
              {props.park.entrancePasses.map((item, index) => (
                <div>
                  <ListItem>
                    <ListItemText primary={"Title: " + item.title} />
                  </ListItem>

                  <ListItem>
                    <ListItemText primary={"Descrption: " + item.description} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={"Cost: $" + item.cost} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        </Box>
      </Container>
    </div>
  );
};
