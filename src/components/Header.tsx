import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { getMonth, getYear, setMonth, setYear } from "date-fns";

interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
}: HeaderProps) => {
  const MONTHS =
    typeof locale !== "undefined"
      ? [...Array(12).keys()].map(
        (d) =>
          locale.localize?.month(d, {
            width: "abbreviated",
            context: "standalone",
          })
      )
      : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: "5px" }}>
        {!prevDisabled && (
          <IconButton
            sx={{
              // padding: '10px',
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
              backgroundColor: "unset",
            }}
            disabled={prevDisabled}
            onClick={onClickPrevious}
          // size="large"
          >
            <ChevronLeft color={prevDisabled ? "disabled" : "primary"} />
          </IconButton>
        )}
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{ disablePortal: true }}
            sx={{
              "& .MuiSelect-select": {
                color: (theme) => `${theme.palette.primary.main} !important`,
                paddingRight: "10px !important",
              },
              "& .MuiSelect-icon": {
                color: (theme) => theme.palette.primary.main,
                display: "none"
              },
              "&:before": {
                border: "unset"
              },
              "&:after": {
                border: "none"
              },
              "&:hover": {
                "&:not(.Mui-disabled, .Mui-error)": {
                  "&:before": {
                    border: "unset"
                  }
                }
              }
            }}>
            {MONTHS.map((month, idx) => (
              <MenuItem
                key={month}
                value={idx}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light
                  }
                }}
              >
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            MenuProps={{ disablePortal: true }}
            sx={{
              "& .MuiSelect-select": {
                color: (theme) => `${theme.palette.primary.main} !important`,
                paddingRight: "0 !important"
              },
              "& .MuiSelect-icon": {
                color: (theme) => theme.palette.primary.main,
                display: "none"
              },
              "&:before": {
                border: "unset"
              },
              "&:after": {
                border: "none"
              },
              "&:hover": {
                "&:not(.Mui-disabled, .Mui-error)": {
                  "&:before": {
                    border: "unset"
                  }
                }
              }
            }}>
            {generateYears(date, 30).map((year) => (
              <MenuItem
                key={year}
                value={year}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light
                  }
                }}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid >

      <Grid item sx={{ padding: "5px" }}>
        {!nextDisabled && (
          <IconButton
            sx={{
              // padding: '10px',
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
              backgroundColor: "unset",
            }}
            disabled={nextDisabled}
            onClick={onClickNext}
          // size="large"
          >
            <ChevronRight color={nextDisabled ? "disabled" : "primary"} />
          </IconButton>
        )}
      </Grid>
    </Grid >
  );
};

export default Header;