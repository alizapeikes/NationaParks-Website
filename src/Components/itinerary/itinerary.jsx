import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography, Stack, Button } from "@mui/material";
import { ThingsTodoContext } from "../State/thingsToDoContext";
import CardMedia from "@mui/material/CardMedia";
import "./itinerary.css";

export const Itinerary = () => {
  const { thingsTodo, setThingsTodo } = useContext(ThingsTodoContext);

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
          borderRight: "auto",
          borderLeft: "auto",
        }}
      >
        <Typography sx={{ fontFamily: "Georgia" }} variant="h3" align="center">
          My {" " + thingsTodo.name + " "} Itinerary
        </Typography>
        {/* <Button>Hello</Button> */}
        <body>
          <form
            action="https://v2.convertapi.com/convert/web/to/pdf?Secret=5Gf4ohFCNhAoRjcI&download=attachment"
            method="post"
            enctype="multipart/form-data"
          >
            <input
              type="hidden"
              name="Url"
              value="https://alizapeikes.github.io/NationaParks-Website/#/itinerary"
            />
            <input type="hidden" name="FileName" value="Itinerary" />
            <input type="hidden" name="ConversionDelay" value="20" />
            <input type="submit" value="Convert file" />
          </form>
        </body>
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
