import React, { useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography, Stack } from "@mui/material";
import { ThingsTodoContext } from "../State/thingsToDoContext";
import CardMedia from "@mui/material/CardMedia";
import "./itinerary.css";

export const Itinerary = () => {
  const { thingsTodo, setThingsTodo } = useContext(ThingsTodoContext);
  const exportRef = useRef();
  return (
    <Container>
      <Box
        sx={{
          boxShadow: 3,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          p: 10,
          m: 5,
          borderRadius: 2,
          //textAlign: "center",
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Typography sx={{ fontFamily: "Georgia" }} variant="h3" align="center">
          My {" " + thingsTodo.name + " "} Itinerary
        </Typography>

        <DisplayThingsTodo thingsTodo={thingsTodo} />
      </Box>
    </Container>
  );
};

const DisplayThingsTodo = (props) => {
  return (
    <div>
      {props.thingsTodo.list.map((item, index) => (
        <div>
          <Stack
            className="itineraryList"
            width="70%"
            paddingTop="5%"
            direction="row"
            spacing={8}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt="parkImage"
              className="roundImage"
            />
            <div>
              <Typography
                fontWeight="bold"
                sx={{
                  fontFamily: "Georgia",
                  color: "#13352C",
                  fontSize: "1.2em",
                }}
              >
                {item.name}
              </Typography>
              <Typography>{item.description}</Typography>
            </div>
          </Stack>
        </div>
      ))}
    </div>
  );
};
