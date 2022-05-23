import {
  Box,
  Tab,
  Tabs,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { City, State } from "../services/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptBR from "dayjs/locale/pt-br";
import styled from "styled-components";

function Feminist() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [value, setValue] = React.useState<Date | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [state, setState] = useState("");
  const [date, setDate] = useState<any>();
  const [mapArray, setMapArray] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    state: "",
    city: "",
    date: "",
  });
  const empty = null;

  interface FormData {
    state: any;
    city: any;
    date: any;
  }

  useEffect(() => {
    async function loadPage() {
      const { data: statesData } = await api.getStates();
      setStates(statesData.states);
    }
    loadPage();
  }, []);

  const handleChangeState = (event: SelectChangeEvent) => {
    setState(event.target.value as string);

    getCities(parseInt(event.target.value));
    setFormData({ ...formData, state: event.target.value });
  };

  async function getCities(state: number) {
    try {
      const { data: cityData } = await api.getCities(state);
      setCities(cityData.cities);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    setFormData({ ...formData, city: event.target.value });
  };

  async function search() {
    Formatation();

    let session: any = await api.getSession(formData.date);
    console.log(session);
    let sessions = [];
    let searchResult = [];

    for (let i = 0; i < session.data.sessionId.length; i++) {
      let sessionId = session.data.sessionId[i].id;

      const result = await api.getSessions(sessionId);
      console.log(result);
      if (result.data.catalogueId != null) {
        sessions.push(result.data.catalogueId.catalogueId);
      }
      console.log(sessions);
    }

    let newSessions: any = [];
    for (let x = 0; x < sessions.length; x++) {
      let sum = 0;
      if (newSessions.includes(sessions[x])) {
        sum = 1;
      }
      if (sum === 0) {
        newSessions.push(sessions[x]);
      }
    }
    console.log(newSessions);

    for (let y = 0; y < newSessions.length; y++) {
      const createData = {
        state,
        city,
        sessions: newSessions[y],
      };
      const result = await api.getFeminist(createData);

      searchResult.push(result.data.catalogue);
      console.log(searchResult);
    }

    for (let w = 0; w < searchResult.length; w++) {
      const tagsArray = await api.getTagsArt(searchResult[w].tagsartId);

      const pg = await api.getMyPg(searchResult[w].classificationId);

      let createForm = {
        adress: searchResult[w].adress,
        duration: searchResult[w].duration,
        image: searchResult[w].image,
        link: searchResult[w].link,
        name: searchResult[w].name,
        price: searchResult[w].price,
        sinopse: searchResult[w].sinopse,
        tags: tagsArray.data.tags,
        pg: pg.data.pgs.name,
      };
      setMapArray([...mapArray, createForm]);
    }
    console.log(mapArray);
  }

  function Formatation() {
    let month = "";
    let item = "";
    if (value) {
      item = value.toString();
    }

    console.log(item);
    let num = item;

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
    if (newNum !== "") {
      setDate(newNum);
      setFormData({ ...formData, date: newNum });
    }
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "40px",
        }}
      >
        <Tabs aria-label="nav tabs example" value={value}>
          <Tab
            sx={{
              backgroundColor: "purple",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/teatro")}
            label="Teatro"
            href="/teatro"
          />
          <Tab
            sx={{
              backgroundColor: "orange",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/show")}
            label="Show"
            href="/show"
          />
          <Tab
            sx={{
              backgroundColor: "yellow",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            label="Dança"
            onClick={() => navigate("/danca")}
          />
          <Tab
            sx={{
              backgroundColor: "green",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/exposicao")}
            label="Exposição"
            href="/exposicao"
          />
          <Tab
            sx={{
              backgroundColor: "blue",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/eventos")}
            label="Eventos"
            href="/eventos"
          />
          <Tab
            sx={{
              backgroundColor: "purple",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/feminista")}
            label="Feminista"
            href="/feminista"
          />
          <Tab
            sx={{
              backgroundColor: "pink",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/lgbtqia")}
            label="LGBTQIA"
            href="/lgbtqia"
          />
          <Tab
            sx={{
              backgroundColor: "black",
              borderTopRightRadius: "25px",
              color: "white",
              borderTopLeftRadius: "5px",
            }}
            component="a"
            onClick={() => navigate("/artepreta")}
            label="Arte Preta"
            href="/artepreta"
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "end",
          paddingTop: "20px",
          paddingBottom: "20px",
          gap: "20px",
          backgroundColor: "purple",
        }}
      >
        <div>
          <InputLabel sx={{ color: "white" }} id="state">
            Estado
          </InputLabel>
          <Select
            sx={{
              width: "100px",
              color: "black",
              backgroundColor: "white",
            }}
            labelId="state"
            id="State"
            value={state}
            label="State"
            onChange={handleChangeState}
          >
            {states.map((s) => (
              <MenuItem value={s.id}>{s.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel sx={{ color: "white" }} id="city">
            Cidade
          </InputLabel>
          <Select
            sx={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
            }}
            labelId="city"
            id="City"
            value={city}
            label="City"
            onChange={handleChangeCity}
          >
            {cities.map((c: any) => (
              <MenuItem value={c.city.id}>{c.city.name}</MenuItem>
            ))}
          </Select>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={ptBR}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "white",
                  color: "black",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          sx={{
            backgroundColor: "gray",
            color: "white",
          }}
          onClick={() => search()}
        >
          Pesquisar
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mapArray.map((m) => (
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid red",
              borderRadius: "20px",
              width: "50%",
            }}
          >
            <Box>
              <Img width="300px" src={m.image} />
            </Box>
            <div>
              <Box>
                <h3>Titulo:{m.name}</h3>
                <h4>Sinopse:{m.sinopse}</h4>
                <h4>Endereço:{m.adress}</h4>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <h4>Duração:{m.duration}</h4>
                <h4>Preço:{m.price}</h4>
                <h4>Classificação:{m.pg}</h4>
              </Box>
              <h4>Link:{m.link}</h4>
            </div>
          </Box>
        ))}
      </Box>
    </>
  );
}

const Img = styled.img`
  width: "30px";
  height: "30px";
`;

export default Feminist;
