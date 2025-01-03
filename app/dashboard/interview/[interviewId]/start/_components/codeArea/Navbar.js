import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export const Navbar = (props) => {
    
    const [roomid, setRoomid] = useState('');

    function handleSelect(e) {
        props.selectlang(e.target.value);
    }

    const saveCode = () => {
        props.save();
        toast.success('Code saved successfully!', {
            duration: 2000,
            style: {
                fontFamily: 'Source Code Pro',
                fontSize: '12.5px',
            },
        });
    };

    const collab = () => {
        if (roomid === '') {
            toast.error('Enter joining ID', {
                duration: 2000,
                style: {
                    fontFamily: 'Source Code Pro',
                    fontSize: '12.5px',
                },
            });
            return;
        }
        navigate(`/join/${roomid}`);
    };

    return (
        <nav
            className="navbar navbar-light"
            style={{
                backgroundColor: props.dark ? 'rgb(39,39,39)' : '#f9f9f9',
                borderBottom: props.dark ? '1px solid #343a40' : '1px solid rgb(222,222,222)',
                height: '59px',
            }}
        >
            <div className="container-fluid">
                <Toaster />
                <a
                    href="/"
                    className="navbar-brand"
                    style={{
                        color: props.dark ? 'white' : 'black',
                        fontSize: '19.9px',
                        paddingLeft: '0.8vw',
                        fontWeight: 'normal',
                    }}
                >
                    <span
                        style={{
                            color: props.dark ? '#616161' : '#a7a0a0',
                            fontWeight: 'bold',
                            marginRight: '7px',
                            marginTop: '-3px',
                        }}
                    >
                        &#60;/&#62;
                    </span>
                    codeArea
                </a>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        onClick={saveCode}
                        title="Save"
                        style={{
                            marginRight: '4px',
                            marginTop: '2px',
                            height: '35px',
                            color: 'white',
                        }}
                    >
                        <SaveIcon sx={{ fontSize: '19px', color: props.dark ? 'white' : 'black' }} />
                    </Button>
                    <Button
                        title="Download"
                        onClick={props.download}
                        style={{
                            marginRight: '4px',
                            marginTop: '2px',
                            height: '35px',
                            color: 'white',
                        }}
                    >
                        <DownloadIcon sx={{ fontSize: '19px', color: props.dark ? 'white' : 'black' }} />
                    </Button>
                    <Button
                        onClick={props.toggleDark}
                        title="Dark mode toggle"
                        style={{
                            marginRight: '4px',
                            marginTop: '2px',
                            height: '35px',
                            color: 'white',
                        }}
                    >
                        <Brightness4Icon sx={{ fontSize: '19px', color: props.dark ? 'white' : 'black' }} />
                    </Button>
                    <Button
                        title="Run Code"
                        onClick={props.run}
                        size="medium"
                        sx={{
                            height: '35px',
                            marginTop: '2px',
                            fontSize: '12.95px',
                            color: 'white',
                            fontFamily: 'Source Code Pro',
                            textTransform: 'lowercase',
                        }}
                    >
                        <PlayArrowIcon sx={{ fontSize: '24px', color: props.dark ? 'white' : 'black' }} />
                    </Button>
                    <select
                        className="form-select mx-4"
                        style={{
                            width: '8vw',
                            fontSize: '12px',
                            marginTop: '1.9px',
                            height: '34px',
                        }}
                        aria-label="Default select example"
                        onChange={(e) => handleSelect(e)}
                        value={props.langsel}
                    >
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="py">Python</option>
                        <option value="c">C</option>
                    </select>
                    <Button onClick={props.closeModel}>Close</Button>
                </div>
            </div>
        </nav>
    );
};
