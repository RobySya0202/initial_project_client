import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const Datepicker = (props: { label: string; name: string }) => {
  const { label, name } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        name={name}
        slotProps={{
          textField: {
            InputLabelProps: { sx: { fontSize: 14 } },
            size: "small",
            sx: { "& .MuiOutlinedInput-root": { borderRadius: "12px" } },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export { Datepicker };
