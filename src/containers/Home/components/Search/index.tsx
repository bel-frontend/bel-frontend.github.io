import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import style from './style.module.scss';

interface Arguments {
    value: string | undefined;
    onChange: (text: string) => void;
    onClear: () => void;
}

export const Search = ({ value, onChange, onClear }: Arguments) => {
    return (
        <TextField
            className={style.input}
            label="Пошук"
            value={value}
            fullWidth
            color="primary"
            variant="standard"
            onChange={(ev) => {
                onChange(ev.target.value);
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start" onClick={onClear}>
                        {value ? <ClearIcon /> : <SearchIcon />}
                    </InputAdornment>
                ),
            }}
        />
    );
};
