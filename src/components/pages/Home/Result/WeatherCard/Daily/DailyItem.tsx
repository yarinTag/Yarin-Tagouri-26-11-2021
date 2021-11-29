import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
} from "@mui/material";

//Imports Projects
import TemperComp from "../../../../../../shared/TemperComp";

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
    <div>
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
          <CardHeader title={moment.unix(day.epochDate).format("ddd")} />
          <CardContent>
            <TemperComp temper={day?.minTemp?.celsius} />
            <TemperComp temper={day?.maxTemp?.celsius} color="textSecondary" />
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: isMobile ? "35%" : "auto" }}
            image={day.icon}
          />
        </Card>
      </Tooltip>
    </div>
  );
};

export default DailyItem;
