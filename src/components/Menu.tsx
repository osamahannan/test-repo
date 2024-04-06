/* eslint-disable object-curly-newline */
import React, { ReactNode } from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
  CustomStyle,
} from "../types";
import { MARKERS } from "./Markers";
import DefinedRanges from "./DefinedRanges";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  onSave?: () => void;
  onCancel?: () => void;
  labelIcon?: ReactNode;
  customStyle?: CustomStyle;
  showConfirmSection?: boolean;
  showBorderedDate?: boolean;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
    labelIcon,
    onSave,
    onCancel,
    customStyle,
    showConfirmSection = true,
    showBorderedDate = true,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper elevation={5}>
      <Grid>
        <Grid container direction="row" wrap="nowrap">
          <Grid minWidth="176px" maxHeight={425} overflow="auto">
            <DefinedRanges
              selectedRange={dateRange}
              ranges={ranges}
              setRange={setDateRange}
              labelIcon={labelIcon}
              customStyle={customStyle}
            />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid>
            <Grid
              container
              sx={{ padding: "20px 25px" }}
              alignItems="center">
              <Grid
                item
                sx={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 15px",
                  gap: "8px",
                  ...(showBorderedDate && {
                    border: (theme) =>
                      `1px solid ${customStyle?.startDateBorderColor ||
                      theme.palette.primary.main
                      }`,
                    borderRadius: "4px",
                  }),
                  minWidth: "250px",
                }}>
                <CalendarTodayOutlinedIcon sx={{
                  fontSize: "1rem",
                  marginBottom: "2.5px"
                }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                  {startDate
                    ? format(startDate, "dd MMMM yyyy", { locale })
                    : "Start Date"}
                </Typography>
              </Grid>
              <Grid item sx={{ flex: 1, textAlign: "center" }}>
                <ArrowRightAlt
                  // color="action"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    marginTop: "5px",
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 15px",
                  gap: "8px",
                  ...(showBorderedDate && {
                    border: (theme) =>
                      `1px solid ${customStyle?.endDateBorderColor ||
                      theme.palette.primary.main
                      }`,
                    borderRadius: "4px",
                  }),
                  minWidth: "250px",
                }}>
                <CalendarTodayOutlinedIcon sx={{
                  fontSize: "1rem",
                  marginBottom: "2.5px"
                }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                  {endDate
                    ? format(endDate, "dd MMMM yyyy", { locale })
                    : "End Date"}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              direction="row"
              justifyContent="center"
              wrap="nowrap"
              padding="0 15px">
              <Month
                {...commonProps}
                value={firstMonth}
                setValue={setFirstMonth}
                navState={[true, canNavigateCloser]}
                marker={MARKERS.FIRST_MONTH}
                locale={locale}
              />
              <Divider orientation="vertical" flexItem />
              < Month
                {...commonProps}
                value={secondMonth}
                setValue={setSecondMonth}
                navState={[canNavigateCloser, true]}
                marker={MARKERS.SECOND_MONTH}
                locale={locale}
              />
            </Grid >
            {showConfirmSection && (
              <>
                <Divider />
                <Grid
                  container
                  sx={{
                    padding: "0.8rem 1rem",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}>
                  <Button variant="outlined" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={onSave}>
                    Apply
                  </Button>
                </Grid>
              </>
            )}
          </Grid >
        </Grid >
      </Grid >
    </Paper >
  );
};

export default Menu;