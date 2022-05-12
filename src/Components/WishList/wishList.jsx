import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DisplayParkContext } from "../State/displayParkContext";
import { WishListContext } from "../State/wishListContext";
import { WishListProvider } from "../State/wishListContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";

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
  InputBase,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

export const WishList = () => {
  const { wishList, setWishList } = useContext(WishListContext);

  return (
    <div>
      <NationalParks wishList={wishList} setWishList={setWishList} />
    </div>
  );
};

const NationalParks = (props) => {
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginRight: "auto", marginLeft: "auto", width: "95%" }}
      >
        <Grid container spacing={4}>
          {props.wishList.length === 0 ? (
            <div>WishList is Empty.</div>
          ) : (
            props.wishList.map((item, index) => (
              <NationalParksCard
                key={index}
                item={item}
                index={index}
                setWishList={props.setWishList}
                wishList={props.wishList}
              />
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

const NationalParksCard = (props) => {
  function removeFromWishList() {
    const tempList = [...props.wishList];
    const index = tempList.findIndex((park) => park.id === props.item.id);
    tempList.splice(index, 1);
    props.setWishList(tempList);
  }
  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345, height: "100%" }} key={props.index}>
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
          <Tooltip title="Remove from Wish List">
            <IconButton onClick={() => removeFromWishList()}>
              <RemoveCircleOutlineIcon
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
