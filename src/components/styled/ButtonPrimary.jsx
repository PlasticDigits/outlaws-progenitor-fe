import { useTheme, Button } from "@mui/material";

export default function ButtonPrimary(props) {
    const theme = useTheme();
    return (
        <Button
            variant='contained'
            target="_blank" rel="noreferrer"
            disableElevation
            css={{ borderRadius: 20, textTransform: "none", fontSize: "16px" }}
            {...props}>{props?.children}</Button>)
}