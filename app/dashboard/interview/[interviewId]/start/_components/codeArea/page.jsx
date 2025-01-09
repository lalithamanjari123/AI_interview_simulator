import { useState, useEffect, useLayoutEffect } from 'react';
import { Navbar } from './Navbar';
import { Output } from './Output';
import { TextEditor } from './TextEditor';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@mui/material';
import io from 'socket.io-client';

const socket = io(`http://localhost:3001`);

function CodeArea({ isOpen, closeModal, setUserAnswer }) {
  if(!isOpen) return null;
  const cppraw = '/cpp.txt';
  const javaraw = '/java.txt';
  const craw = '/c.txt';
  const pyraw = '/py.txt';

  const [dark, setDark] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Source Code Pro',
    }
  });

  const [code, setCode] = useState('');
  const [code1, setSendCode] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'java');
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('');
  const [authUser, setAuthUser] = useState(null);

  // Sending code to server for execution
  async function sendCode() {
    console.log('Sending code to server with:', {
        language: language,
        code: code,
        input: input
    });
    const resp = await fetch('http://localhost:3001/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            'language': language,
            'code': code,
            'input': input
        })
    });
    const data = await resp.json();
    console.log('Received output:', data); // Check the response from the server
    // Assuming the response structure is { output: [output, error, executionTime] }
    setOutput(data.output); // Ensure you're setting the output correctly
  }

  // Set programming language
  function setProplang(e) {
    setLanguage(e);
  }

  // Socket listener to update code based on room
  useLayoutEffect(() => {
    socket.on(`sendcode${room}`, code => {
      setCode(code.code);
      setLanguage(code.lang);
    });
  });

  // Set theme from localStorage
  useEffect(() => {
    if (!localStorage.getItem('dark')) return;
    if (localStorage.getItem('dark') === 'dark') {
      setDark(true);
    } else {
      setDark(false);
    }
    if (!localStorage.getItem('uid')) return;
    setAuthUser(localStorage.getItem('uid'));
  }, []);

  // Load code for the selected language
  useEffect(() => {
    const loadCode = async () => {
      let codeData = '';
      if (language === 'cpp') {
        codeData = await fetch(cppraw).then((res) => res.text());
      } else if (language === 'java') {
        codeData = await fetch(javaraw).then((res) => res.text());
      } else if (language === 'c') {
        codeData = await fetch(craw).then((res) => res.text());
      } else if (language === 'py') {
        codeData = await fetch(pyraw).then((res) => res.text());
      }
      console.log(codeData);
      setCode(codeData); // Set the code state after fetching
    };

    loadCode();
  }, [language]);

  // Emit code to the room (for collaboration)
  useEffect(() => {
    socket.emit('getcode', {
      code: code1,
      roomid: room,
      lang: language
    });
  }, [code1, language, room]);

  // Toggle between dark and light mode
  const toggleDark = () => {
    if (dark) {
      localStorage.setItem('dark', 'light');
      toast.success('Light Mode', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    } else {
      localStorage.setItem('dark', 'dark');
      toast.success('Dark Mode', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    }
    setDark(prev => !prev);
  };

  // Download the code file
  const download = async () => {
    const got = await fetch('http://localhost:3001/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'language': language,
        'code': code
      })
    });
    const blob = await got.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'code.txt');
    document.body.appendChild(link);
    link.click();
  };

  // Save the code
  const save = async () => {
    const got = await fetch('http://localhost:3001/savecode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'uid': authUser,
        'language': language,
        'code': code,
        'filename': 'main',
      })
    });
    const pos = await got.json();
    if (pos.success) {
      toast.success('Saved', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
      console.log("Saved answer:"+code);
      setUserAnswer(code);
      closeModal();
    
    } else {
      toast.error('Error Saving', {
        duration: 2000,
        style: {
          fontFamily: 'Source Code Pro',
          fontSize: '12.5px'
        },
      });
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Toaster />
          <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <>
              <Navbar 
                save={save} 
                download={download} 
                authUser={authUser} 
                setAuthUser={setAuthUser} 
                toggleDark={toggleDark} 
                dark={dark} 
                run={sendCode} 
                selectlang={setProplang} 
                langsel={language} 
                closeModel={closeModal}
              />
              <div className="codeditor" style={{ display: 'flex', flexDirection: 'row' }}>
                <TextEditor 
                  dark={dark} 
                  setroom={setRoom} 
                  code={setCode} 
                  setSendCode={setSendCode} 
                  c={code} 
                  lang={language} 
                />
                <Output 
                  dark={dark} 
                  input={input} 
                  setInput={setInput} 
                  op={output} 
                />
              </div>
            </>
          </div>
        </CssBaseline>
      </ThemeProvider>
      
    </div>
  );
}

export default CodeArea;
