import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography, Stack, Button } from "@mui/material";
import { ThingsTodoContext } from "../State/thingsToDoContext";
import CardMedia from "@mui/material/CardMedia";
import "./itinerary.css";

export const Itinerary = () => {
  function converToPDF() {
    //fetch(`https://v2.convertapi.com/convert/web/to/pdf?Secret=5Gf4ohFCNhAoRjcI`).then(.then((response) => response.json()))
    //     fetch(
    //       `https://developer.nps.gov/api/v1/thingstodo?parkCode=
    //     ${"park.parkCode"}
    //   &api_key=${"8yqhe2WFRMWYNZgBFRmxnub058irC6R85P9uUSIE"}`
    //     )
    //       .then((response) => response.json())
    //       .then((data) => props.setThingsTodoList(data.data));
  }
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
          {" "}
          My Itinerary
        </Typography>
        <Button>Hello</Button>
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
            <input type="submit" value="Convert file" />
          </form>
        </body>
        <DisplayThingsTodo />
      </Box>
    </Container>
  );
};

const DisplayThingsTodo = () => {
  const { thingsTodo, setThingsTodo } = useContext(ThingsTodoContext);
  return (
    <div>
      {thingsTodo.map((item, index) => (
        <div>
          <Stack
            className="itineraryList"
            width="70%"
            paddingTop="5%"
            direction="row"
            spacing={2}
          >
            <CardMedia
              component="img"
              height="140"
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
