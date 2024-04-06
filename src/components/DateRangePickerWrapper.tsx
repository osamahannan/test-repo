import React, { ReactNode } from 'react';

import { Box } from '@mui/material';
import DateRangePicker from './DateRangePicker';

// eslint-disable-next-line no-unused-vars
import { DateRange, CustomStyle, DefinedRange } from '../types';

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  currentDateRnage?: DateRange | null;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  // eslint-disable-next-line no-unused-vars
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
  locale?: Locale;
  labelIcon?: ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  customStyle?: CustomStyle;
  showConfirmSection?: boolean;
  showBorderedDate?: boolean;
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => {
  const {
    closeOnClickOutside,
    wrapperClassName,
    toggle,
    open,
    initialDateRange,
    currentDateRnage
  } = props;

  const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    setDateRange({ ...currentDateRnage })

    toggle();
  };

  const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  return (
    <Box sx={{ position: 'relative' }}>
      {
        open && (
          <Box
            sx={{
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              bottom: 0,
              zIndex: 0,
              right: 0,
              left: 0,
              top: 0,
            }}
            onKeyDown={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <Box sx={{ position: 'relative', zIndex: 1 }} className={wrapperClassName} >
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} {...props} />
      </Box>
    </Box>
  );
};

export default DateRangePickerWrapper;