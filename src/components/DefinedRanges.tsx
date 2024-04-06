import React, { ReactNode } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { isSameDay } from 'date-fns';
import { CustomStyle, DateRange, DefinedRange } from '../types';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

type DefinedRangesProps = {
  // eslint-disable-next-line no-unused-vars
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
  labelIcon?: ReactNode;
  customStyle?: CustomStyle
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
  labelIcon = <ArrowRightOutlinedIcon sx={{ fontSize: "25px", color: (theme) => theme.palette.primary.main }} />,
  customStyle
}: DefinedRangesProps) => (
  <List>
    {ranges.map((range, idx) => (
      <ListItemButton
        key={idx}
        onClick={() => setRange(range)}
        sx={{
          backgroundColor: customStyle?.labelBgColor || "",
          "&:hover": {
            background: (theme) => customStyle?.labelBgOnHover || theme.palette.primary.light
          },
          paddingRight: "5px",
          ...isSameRange(range, selectedRange) && {
            backgroundColor: (theme) => customStyle?.activeLabelBgColor || theme.palette.primary.dark,
            color: customStyle?.activeLableColor || 'primary.contrastText',
            '&:hover': {
              backgroundColor: (theme) => customStyle?.activeLabelBgColor || theme.palette.primary.dark
            },
          }
        }}
      >
        <ListItemText
          primaryTypographyProps={{
            variant: 'body2',
            sx: {
              fontWeight: isSameRange(range, selectedRange)
                ? 'bold'
                : 'normal',
              display: "flex",
              textWrap: "nowrap",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: "100px",
              fontSize: "1rem"
            },
          }}
        >
          {range.label}
          {labelIcon && isSameRange(range, selectedRange) && (
            <>{labelIcon}</>
          )}
        </ListItemText>
      </ListItemButton>
    ))}
  </List>
);

export default DefinedRanges;