import React from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../frontend-api';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { CssBaseline, Typography, Grid, Link } from '@mui/material';

const Register = ({
	username,
	setUsername,
	password,
	setPassword,
	setToken,
	email,
	setEmail,
	firstName,
	setFirstName,
	lastName,
	setLastName,
}) => {
	const navigate = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (confirmPassword()) {
			const data = await registerUser({
				username,
				password,
				email,
				firstName,
				lastName,
			});

			const token = data.token;


            localStorage.setItem("token", JSON.stringify(token));
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem("username", username);
            data
                ? alert(`${data.message}`)
                : alert(`${data.error}`);
            if (token) {
                navigate.push("/Products");
            }
        }
    };


	const confirmPassword = () => {
		const password = document.querySelector('input[name=password');
		const confirm = document.querySelector('input[name=confirm');
		if (confirm.value !== password.value) {
			alert('Passwords must match.');
			return false;
		} else {
			return true;
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h4">
					Register
				</Typography>
				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="outlined"
						label="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					></TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						id="outlined"
						label="First Name"
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					></TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						id="outlined"
						label="Last Name"
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
					></TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						id="outlined"
						label="Enter Username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					></TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						type="password"
						name="password"
						id="outlined"
						label="Enter Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					></TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						type="password"
						name="confirm"
						id="outlined"
						label="Re-Type Password"
					></TextField>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
