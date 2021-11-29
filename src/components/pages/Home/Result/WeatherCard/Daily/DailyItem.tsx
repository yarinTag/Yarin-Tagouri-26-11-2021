import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";

const DailyItem = ({ day }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const updateWindowDimensions = () => {
    if (window.innerWidth > 800) setIsMobile(false);
    else setIsMobile(true);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  }, [isMobile]);

  return (
    <Grid item>
      <Tooltip title={day.description} placement="top" arrow>
        {/* <Hidden smUp>
          <Typography variant="body2">{day.description}</Typography>
        </Hidden> */}
        <Card
          sx={{
            width: "100%",
            height: "100%",
            display: isMobile ? "flex" : "block",
          }}
        >
          <CardContent sx={{ minWidth: 150 }}>
            <CardHeader
              title={moment.unix(day.epochDate).format("ddd")}
              sx={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}
            />
            <Typography
              variant="h6"
              component="h4"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {day?.minTemp?.celsius}°
            </Typography>
            <Typography
              variant="h6"
              component="h4"
              sx={{ textAlign: "center" }}
            >
              {day?.maxTemp?.celsius}°
            </Typography>

            <CardMedia
              component="img"
              sx={{ width: isMobile ? 45 : 100 }}
              image={day.icon}
            />
          </CardContent>
        </Card>
      </Tooltip>
    </Grid>
  );
};

export default DailyItem;
