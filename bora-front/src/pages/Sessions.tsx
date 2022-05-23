import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Box,
  Button,
  Divider,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  List,
  ListItem,
  ListSubheader,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AxiosError } from "axios";
import React, { useEffect, useState, ChangeEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ptBR from "dayjs/locale/pt-br";
import api, { DateTime } from "../services/api";

export default function Sessions({ catalogueId }: any) {
  const [value, setValue] = React.useState<Date | null>(
    new Date("2022-01-01T00:00:00.000Z")
  );
  const [dates, setDates] = useState<any[]>([]);
  const [hours, setHours] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsId, setSessionsId] = useState();
  let test: any = null;
  const [loadSessions, setLoadSessions] = useState<any[]>([]);
  const [sessionsFuso, setSessionsFuso] = useState<DateTime[]>([
    {
      date: "",
      hour: "",
    },
  ]);
  const selected: any[] = sessionsFuso;
  console.log(selected);
  function handleButton(index: number) {
    if (sessions.length === 0) {
      test = value;
    }
    setSessions([...sessions, value]);
    console.log(sessionsFuso.length);
    if (sessionsFuso.length === 1 && sessions.length === 0) {
      sessionsFuso.pop();
    }

    Formatation(index);

    // let index = sessions.length;
  }

  async function handleEndButton() {
    for (let i = 0; i < sessionsFuso.length; i++) {
      setDates([...dates, sessionsFuso[i].date]);
    }

    for (let i = 0; i < sessionsFuso.length; i++) {
      setHours([...hours, sessionsFuso[i].hour]);
    }

    const formData = {
      sessionsFuso,
    };

    console.log(formData);

    for (let i = 0; i < sessionsFuso.length; i++) {
      try {
        const { data: id } = await api.createSession(sessionsFuso[i]);
        setSessionsId(id.id);
        const createData = {
          catalogueId,
          sessionsId,
        };
        await api.createSessions(createData);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function deleteSession(i: any) {
    const arrayDelete = sessionsFuso;
    const newArray = arrayDelete.splice(i, 1);
    const arraySession = sessions;
    const newSession = arraySession.splice(i, 1);
    //const insertArray = arrayDelete;

    setSessionsFuso(arrayDelete);
    setSessions(arraySession);
    console.log(selected);
  }

  function Formatation(index: any) {
    let month = "";
    let item = "";
    if (sessions.length === 0) {
      item = test.toString();
    }
    if (sessions.length != 0) {
      item = sessions[sessions.length - 1].toString();
    }

    console.log(sessions);
    console.log(item);
    let num = item;
    let fuso = 0;
    let time = "";
    let newNum = "";
    console.log(num);

    let counter = num.length;

    if (num[counter - 1] === ")") {
      if (num[4] === "M") {
        if (num[6] === "y") {
          month = "05";
        } else {
          month = "03";
        }
      }

      if (num[4] === "J") {
        if (num[6] === "n") {
          if (num[5] === "a") {
            month = "01";
          } else {
            month = "06";
          }
        } else {
          month = "07";
        }
      }

      if (num[4] === "N") {
        month = "11";
      }
      if (num[8] === "F") {
        month = "02";
      }
      if (num[4] === "A") {
        if (num[5] === "p") {
          month = "04";
        } else {
          month = "08";
        }
      }
      if (num[4] === "S") {
        month = "09";
      }
      if (num[4] === "O") {
        month = "10";
      }
      if (num[4] === "D") {
        month = "12";
      }
      newNum =
        num[8] +
        num[9] +
        "/" +
        month +
        "/" +
        num[11] +
        num[12] +
        num[13] +
        num[14];

      time = num[16] + num[17] + ":" + num[19] + num[20];
    } else {
      if (num[8] === "M") {
        if (num[10] === "y") {
          month = "05";
        } else {
          month = "03";
        }
      }

      if (num[8] === "J") {
        if (num[10] === "n") {
          if (num[9] === "a") {
            month = "01";
          } else {
            month = "06";
          }
        } else {
          month = "07";
        }
      }

      if (num[8] === "N") {
        month = "11";
      }
      if (num[8] === "F") {
        month = "02";
      }

      if (num[8] === "A") {
        if (num[9] === "p") {
          month = "04";
        }

        if (num[9] === "u") {
          month = "08";
        }
      }

      if (num[8] === "S") {
        month = "09";
      }
      if (num[8] === "O") {
        month = "10";
      }
      if (num[8] === "D") {
        month = "12";
      }
      newNum =
        num[5] +
        num[6] +
        "/" +
        month +
        "/" +
        num[12] +
        num[13] +
        num[14] +
        num[15];
      console.log(newNum);
    }
    let hour = 0;
    if (num[counter - 1] === ")") {
      console.log("nada");
    } else {
      hour = parseInt(num[17] + num[18]);
      if (hour < 3) {
        if (hour === 2) {
          fuso = 23;
          time = fuso.toString() + ":" + num[20] + num[21];
        }
        if (hour === 1) {
          fuso = 22;
          time = fuso.toString() + ":" + num[20] + num[21];
        }
        if (hour === 0) {
          fuso = 21;
          time = fuso.toString() + ":" + num[20] + num[21];
        }
      } else {
        fuso = hour - 3;
        time = fuso.toString() + ":" + num[20] + num[21];
      }
    }
    console.log(hour);

    const update = { date: newNum, hour: time };
    console.log(update);
    setSessionsFuso([...sessionsFuso, update]);
    setLoadSessions([...loadSessions, update]);
  }
  console.log(selected);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={ptBR}>
      <Header>
        <h1>Sessões:</h1>
      </Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "5vh",
            borderRadius: "20px",
            width: "70%",
            maxWidth: "70%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: "50vh",
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          <li key={`section`}>
            <ul>
              {sessionsFuso.length <= 1 && sessions.length === 0 ? (
                <h1>Ainda não tem sessões cadastradas</h1>
              ) : (
                selected.map((item, i) => (
                  <ListItem
                    key={i}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        type="button"
                        aria-label="delete"
                        onClick={() => deleteSession(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`Sessão: ${item.date} ${item.hour}`}
                    />
                  </ListItem>
                ))
              )}
            </ul>
          </li>
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Stack spacing={3}>
            <DateTimePicker
              label="Responsive"
              renderInput={(params) => <TextField {...params} />}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginLeft: "2vw",
              backgroundColor: "lightpink",
              color: "black",
            }}
            onClick={() => handleButton(sessions.length)}
          >
            Adicionar Sessão
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{
            marginTop: "5vh",
            backgroundColor: "purple",
            color: "white",
            height: "8vh",
            width: "15vw",
          }}
          onClick={() => handleEndButton()}
        >
          Terminar Cadastro
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

const Header = styled.div`
  margin-left: 15%;
`;
