import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Grid, Paper, TextField} from "@mui/material";
import {LocationState, useAuth} from '../../../auth/AuthProvider';
import './Login.css'

interface LoginScreenProps {
    postLoginFunc?: () => void
}

const Login: React.FC<LoginScreenProps> = (props): JSX.Element => {
    const { postLoginFunc } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const validate = (): void => {
        if (!!username) {
            setIsUsernameInvalid(false);
        } else {
            setIsUsernameInvalid(true);
        }

        if (!!password) {
            setIsPasswordInvalid(false);
        } else {
            setIsPasswordInvalid(true);
        }
        handleSubmit();
    };

    function usernameChange(event: any) {
        setIsUsernameInvalid(false);
        setUsername(event.target.value);
    }

    function passwordChange(event: any) {
        setIsPasswordInvalid(false);
        setPassword(event.target.value);
    }

    const handleSubmit = async () => {
        if (!isUsernameInvalid && !isPasswordInvalid) {
            // proceed to submit
            try {
                await auth.signin(username, password);

                const { state } = location as { state: LocationState }
                const navigationDest = state?.from?.pathname || "/";

                postLoginFunc && postLoginFunc();
                navigate(navigationDest, { replace: true })

            } catch (err) {
                // Failed login. show something to the user
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid>
                <Paper elevation={10} className={'paper-style'} style={{ padding: '10px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <Grid textAlign={'center'}>
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField label='Username'
                            name="username"
                            placeholder='Enter username'
                            variant="standard"
                            value={username}
                            onChange={usernameChange}
                            error={isUsernameInvalid}
                            helperText={isUsernameInvalid && "required field"}
                            fullWidth required />
                        <TextField label='Password'
                            name="password"
                            placeholder='Enter password'
                            variant="standard"
                            type='password'
                            value={password}
                            onChange={passwordChange}
                            error={isPasswordInvalid}
                            helperText={isPasswordInvalid && "required field"}
                            fullWidth required />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='submit' color='primary' variant="contained" className={'button-style'} style={{ width: '50%' }} onClick={validate}>Sign in</Button>
                    </div>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login;
