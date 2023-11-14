import './App.css';
import {Box, Button, TextField} from "@mui/material";
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {useState} from "react";

function App() {
  const [arr, setArr] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
  const [output, setOutput] = useState('')

  const handleInputChange = (event, i) => {
    switch (event.target.name) {
      case 'ID':
        if (!isFinite(event.target.value) || isNaN(event.target.value) || event.target.value.toString().length !== 7 || arr.find(el => el.ID === event.target.value)) {
          setArr(prevState => [...prevState.map((el, index) => index === i ? {...el, error: true} : el)])
          return
        }
        setArr(prevState => [...prevState.map((el, index) => index === i ? {
          ...el,
          ID: event.target.value,
          error: false
        } : el)])
        break;
      case 'team1':
        setArr(prevState => [...prevState.map((el, index) => index === i ? {...el, team1: event.target.value} : el)])
        break;
      case 'team2':
        setArr(prevState => [...prevState.map((el, index) => index === i ? {...el, team2: event.target.value} : el)])
        break;
      case 'league':
        setArr(prevState => [...prevState.map((el, index) => index === i ? {...el, league: event.target.value} : el)])
        break;
    }
  }

  const handleSubmit = () => {
    const result = {}

    arr.forEach(el => {
      if (el.ID) {
        result[el.ID] = {
          team1: el.team1,
          team2: el.team2,
          league: el.league
        }
      }
    })
    setOutput(JSON.stringify(result))
  }

  return (
    <div className="App">
      <Box sx={{mt: 5}}>
        {arr.map((el, i) => (
          <Box key={i}>
            <TextField
              error={el.error}
              helperText={'ID have to contain 7 numbers or ID isn\'t identical'}
              type={'number'}
              name={'ID'}
              id="outlined-basic"
              label="ID"
              variant="outlined"
              onChange={event => handleInputChange(event, i)}
            />
            <TextField
              name={'team1'}
              id="outlined-basic"
              label="Team 1"
              variant="outlined"
              onChange={event => handleInputChange(event, i)}
              sx={{ml: 2}}
            />
            <TextField
              name={'team2'}
              id="outlined-basic"
              label="Team 2"
              variant="outlined"
              onChange={event => handleInputChange(event, i)}
              sx={{ml: 2}}
            />
            <TextField
              name={'league'}
              id="outlined-basic"
              label="League"
              variant="outlined"
              onChange={event => handleInputChange(event, i)}
              sx={{ml: 2}}
            />
          </Box>
        ))}
        <Box sx={{mt: 2, mb: 2}}>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >Get data</Button>
        </Box>
        <TextareaAutosize value={output}/>
      </Box>
    </div>
  );
}

export default App;
