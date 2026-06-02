import Button, { ButtonProps } from '@mui/material/Button';

export const AppButton = ({ sx, ...props }: ButtonProps) => {
    return (
        <Button
            disableElevation
            sx={{
                borderRadius: 999,
                px: 2,
                py: 0.75,
                fontWeight: 600,
                ...sx,
            }}
            {...props}
        />
    );
};
