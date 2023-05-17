import { useTheme } from "@mui/material";

export default function MenuLink(props) {
    const theme = useTheme();
    return (
        <a css={{
            color: theme.palette.grey[700],
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            },
            ...props?.css
        }} {...props}>
            {props?.children}
        </a>
    )
};