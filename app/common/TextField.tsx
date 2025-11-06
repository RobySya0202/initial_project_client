import { FormControl, InputLabel, TextField } from "@mui/material";

const Textfield = (props:{id:string, label:string}) => {
    const {id, label} = props
    return <FormControl>
        <InputLabel id={id}>{label}</InputLabel>
    </FormControl>
}

export {Textfield};