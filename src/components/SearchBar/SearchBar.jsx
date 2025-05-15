import { TextField, InputAdornment, Box, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
	const theme = useTheme();

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
			<TextField
				placeholder='Search...'
				variant='outlined'
				fullWidth
				sx={{
					backgroundColor: '#fff',
					borderRadius: 10,
					height: 46,
					width: 375,
					'& .MuiOutlinedInput-root': {
						paddingLeft: 5,
						paddingRight: 1.5,
						height: '100%',
					},
					[theme.breakpoints.up('sm')]: {
						width: 639,
						minWidth: 360,
						maxWidth: 720,
					},
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' sx={{ paddingRight: 1 }}>
							<SearchIcon sx={{ color: '#999' }} />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default SearchBar;
