import {
  Box,
  Button,
  Divider,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState, ChangeEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePopper } from "react-popper";
import FocusTrap from "focus-trap-react";

import { DayPicker } from "react-day-picker";
import api, { Category, City, State, Pg, Tag } from "../services/api";
import Form from "../components/Form";
//import useAlert from "../hooks/useAlert";

const styles = {
  container: {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function Create() {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  const [inputValue, setInputValue] = useState<string>("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const navigate = useNavigate();
  //const { setMessage } = useAlert();
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [pgs, setPgs] = useState<Pg[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [sinopse, setSinopse] = useState("");
  const [state, setState] = useState("");
  const [price, setPrices] = useState("");
  const [adress, setAdress] = useState("");
  const [pg, setPg] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    async function loadPage() {
      const { data: categoriesData } = await api.getCategories();
      setCategories(categoriesData.categories);

      const { data: tagsData } = await api.getTags();
      setTags(tagsData.tags);

      const { data: statesData } = await api.getStates();
      setStates(statesData.states);

      const { data: pgsData } = await api.getPgs();
      setPgs(pgsData.pgs);
    }
    loadPage();
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    category: "",
    sinopse: "",
    state: "",
    city: "",
    price: "",
    adress: "",
    pg: "",
    duration: "",
    tags: "",
    date: "",
  });

  interface FormData {
    name: string;
    image: string;
    category: any;
    sinopse: string;
    state: string;
    city: string;
    price: string;
    adress: string;
    pg: any;
    duration: string;
    tags: any;
    date: any;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "image") {
      setimage(e.target.value);
    }
    if (e.target.name == "sinopse") {
      setSinopse(e.target.value);
    }
    if (e.target.name == "price") {
      setPrices(e.target.value);
    }
    if (e.target.name == "adress") {
      setAdress(e.target.value);
    }
    if (e.target.name == "duration") {
      setDuration(e.target.value);
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setFormData({ ...formData, category: event.target.value });
  };

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

  const handleChangeTag = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
    setFormData({ ...formData, tags: event.target.value });
  };

  const handleChangePg = (event: SelectChangeEvent) => {
    setPg(event.target.value as string);
    setFormData({ ...formData, pg: event.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //setMessage(null);

    // setFormData({
    //   name: name,
    //   pdfUrl: pdfUrl,
    //   category: parseInt(category),
    //   discipline: parseInt(discipline),
    //   instructor: parseInt(instructor),
    // });

    if (
      !formData?.name ||
      !formData?.image ||
      !formData?.category ||
      !formData?.sinopse ||
      !formData?.state ||
      !formData?.city ||
      !formData?.price ||
      !formData?.adress ||
      !formData?.pg ||
      !formData?.duration ||
      !formData?.tags ||
      !formData?.date
    ) {
      //setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    try {
      await api.createArt(formData);
      // setMessage({ type: "success", text: "Cadastro efetuado com sucesso!" });
      navigate("/app/adicionar");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        //   setMessage({
        //     type: "error",
        //     text: error.response.data,
        //   });
        return;
      }
      // setMessage({
      //   type: "error",
      //   text: "Erro, tente novamente em alguns segundos!",
      // });
    }
  }

  return (
    <>
      {/* <TextField
          sx={{ marginX: "auto", marginBottom: "25px", width: "450px" }}
          label="Pesquise por disciplina"
        />
        <Divider sx={{ marginBottom: "35px" }} />
        <Box
          sx={{
            marginX: "auto",
            width: "700px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/app/disciplinas")}
            >
              Disciplinas
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/app/pessoas-instrutoras")}
            >
              Pessoa Instrutora
            </Button>
            <Button variant="contained" onClick={() => navigate("/app/adicionar-prova")}>
              Adicionar
            </Button>
          </Box> */}
      <Form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "80vw",
            maxWidth: "850px",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "20vh",
            gap: "8px",
          }}
        >
          <TextField
            name="name"
            sx={styles.input}
            label="Name"
            type="name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />
          <TextField
            name="sinopse"
            sx={styles.input}
            label="sinopse"
            type="sinopse"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.sinopse}
          />
          <TextField
            name="image"
            sx={styles.input}
            label="image"
            type="image"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.image}
          />
          <TextField
            name="adress"
            sx={styles.input}
            label="adress"
            type="adress"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.adress}
          />

          <TextField
            name="price"
            sx={styles.input}
            label="price"
            type="price"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.price}
          />
          <TextField
            name="duration"
            sx={styles.input}
            label="duration"
            type="duration"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.duration}
          />

          <InputLabel id="state">Estado</InputLabel>
          <Select
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

          <InputLabel id="city">Cidade</InputLabel>
          <Select
            labelId="city"
            id="City"
            value={city}
            label="City"
            onChange={handleChangeCity}
          >
            {cities.map((c: any) => (
              <MenuItem value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>

          <InputLabel id="category">Categoria</InputLabel>
          <Select
            labelId="category"
            id="Category"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
          >
            {categories.map((c) => (
              <MenuItem value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
          <InputLabel id="pg">Classificação</InputLabel>
          <Select
            labelId="pg"
            id="pg"
            value={pg}
            label="Pg"
            onChange={handleChangePg}
          >
            {pgs.map((p) => (
              <MenuItem value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>

          <InputLabel id="itags">Tags</InputLabel>
          <Select
            labelId="tags"
            id="Tags"
            value={tag}
            label="Tags"
            onChange={handleChangeTag}
          >
            {tags.map((t) => (
              <MenuItem value={t.id}>{t.name}</MenuItem>
            ))}
          </Select>

          <div ref={popperRef}>
            <input
              type="text"
              value={inputValue}
              className="input-reset pa2 ma2 bg-white black ba"
            />
            <button
              ref={buttonRef}
              type="button"
              className="pa2 bg-white button-reset ba"
              aria-label="Pick a date"
              onClick={handleButtonClick}
            >
              <span role="img" aria-label="calendar icon">
                📅
              </span>
            </button>
          </div>
          {isPopperOpen && (
            <FocusTrap
              active
              focusTrapOptions={{
                initialFocus: false,
                allowOutsideClick: true,
                clickOutsideDeactivates: true,
                onDeactivate: closePopper,
              }}
            >
              <div
                tabIndex={-1}
                style={popper.styles.popper}
                className="dialog-sheet"
                {...popper.attributes.popper}
                ref={setPopperElement}
                role="dialog"
              >
                <DayPicker
                  mode="multiple"
                  min={1}
                  selected={days}
                  onSelect={setDays}
                />
              </div>
            </FocusTrap>
          )}

          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Box>
      </Form>
      {/* </Box> */}
    </>
  );
}
export default Create;
