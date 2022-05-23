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
} from "@mui/material";

import { AxiosError } from "axios";
import React, { useEffect, useState, ChangeEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";

import api, {
  Category,
  City,
  State,
  Pg,
  Tag,
  SubCategory,
} from "../services/api";
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
  text: {
    display: "flex",
    flexDirection: "row",
  },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function Create({ setCatalogueId, catalogueId }: any) {
  const navigate = useNavigate();
  //const { setMessage } = useAlert();
  const [category, setCategory] = useState("");
  const [subcategory, setsubCategory] = useState("");
  const [tag, setTag] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setsubCategories] = useState<SubCategory[]>([]);
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
  const [link, setLink] = useState("");
  const [postId, setPostId] = useState(null);
  const [tagId, setTagId] = useState("");

  useEffect(() => {
    async function loadPage() {
      const { data: categoriesData } = await api.getCategories();
      setCategories(categoriesData.categories);

      const { data: subcategoriesData } = await api.getSubCategories();
      setsubCategories(subcategoriesData.subcategories);
      console.log(subcategories);
      const { data: tagsData } = await api.getTags();
      setTags(tagsData.tags);

      const { data: statesData } = await api.getStates();
      setStates(statesData.states);

      const { data: pgsData } = await api.getPgs();
      setPgs(pgsData.classifications);
    }
    loadPage();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    category: "",
    subcategory: "",
    sinopse: "",
    state: "",
    city: "",
    price: "",
    adress: "",
    pg: "",
    duration: "",
    tagsartId: "",
    link: "",
  });

  interface FormData {
    name: string;
    image: string;
    category: any;
    subcategory: any;
    sinopse: string;
    state: any;
    city: any;
    price: string;
    adress: string;
    pg: any;
    duration: string;
    tagsartId: any;
    link: string;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "image") {
      setimage(e.target.value);
    } else if (e.target.name == "sinopse") {
      setSinopse(e.target.value);
    } else if (e.target.name == "price") {
      setPrices(e.target.value);
    } else if (e.target.name == "adress") {
      setAdress(e.target.value);
    } else if (e.target.name == "duration") {
      setDuration(e.target.value);
    } else if (e.target.name == "link") {
      setLink(e.target.value);
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setFormData({ ...formData, category: event.target.value });
  };

  const handleChangeSubCategory = (event: SelectChangeEvent) => {
    setsubCategory(event.target.value as string);
    setFormData({ ...formData, subcategory: event.target.value });
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

  async function patchTag(postId: any, tags: any) {
    if (postId == null) {
      const { data: id } = await api.postTag(tags);
      console.log(id.id);
      setPostId(id.id);
      setTagId(id.id);
    } else {
      await api.patchTag(postId, tags);
    }
  }

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    setFormData({ ...formData, city: event.target.value });
  };

  const handleChangeTag = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;
    setTag(typeof value === "string" ? value.split(",") : value);

    patchTag(postId, tags);
    console.log(tag);
  };

  const handleChangePg = (event: SelectChangeEvent) => {
    setPg(event.target.value as string);
    setFormData({ ...formData, pg: event.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //setMessage(null);

    setFormData({
      name: name,
      image: image,
      category: parseInt(category),
      subcategory: parseInt(subcategory),
      sinopse: sinopse,
      state: parseInt(state),
      city: parseInt(city),
      price: price,
      adress: adress,
      pg: parseInt(pg),
      duration: duration,
      tagsartId: parseInt(tagId),
      link: link.toString(),
    });

    console.log(formData);

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
      !formData?.tagsartId ||
      !formData?.link
    ) {
      //setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    try {
      // setMessage({ type: "success", text: "Cadastro efetuado com sucesso!" });
      const { data: id } = await api.createArt(formData);
      setCatalogueId(id.id);
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
    navigate("/sessoes");
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "8vh",
          }}
        >
          <Box
            sx={{
              width: "80vw",
              maxWidth: "850px",
              display: "flex",
              flexDirection: "column",

              gap: "20px",
              paddingTop: "30px",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingBottom: "20px",
              borderTop: "1px solid black",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              justifyContent: "space-between",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <TextField
              name="name"
              sx={styles.input}
              label="Título"
              type="name"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
            />

            <TextField
              name="sinopse"
              sx={styles.input}
              label="Sinopse"
              multiline
              maxRows={5}
              type="sinopse"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.sinopse}
            />
            <TextField
              name="image"
              sx={styles.input}
              label="Imagem"
              type="link"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.image}
            />
          </Box>
          <Box
            sx={{
              width: "80vw",
              maxWidth: "850px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "40px",
              paddingTop: "8px",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingBottom: "20px",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            <div>
              <TextField
                name="adress"
                sx={styles.text}
                label="Endereço"
                type="adress"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.adress}
                fullWidth
              />
              <FormHelperText id="outlined-adress-helper-text">
                Digitar endereço no seguinte formato: Rua tal tal, 118 - Bairro.
              </FormHelperText>
            </div>
            <div>
              <TextField
                name="price"
                sx={styles.text}
                label="Valor"
                type="price"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                onChange={handleInputChange}
                value={formData.price}
              />
              <FormHelperText id="outlined-price-helper-text">
                Digitar valor mais barato e valor mais caro. Exemplo: 18,00 -
                80,00
              </FormHelperText>
            </div>
          </Box>
          <Box
            sx={{
              width: "80vw",
              maxWidth: "850px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              paddingBottom: "5vh",
              gap: "20px",
              paddingTop: "8px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderBottom: "1px solid black",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              justifyContent: "space-between",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <TextField
              name="duration"
              sx={styles.input}
              label="Duração"
              type="duration"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              value={formData.duration}
            />

            <div>
              <TextField
                name="link"
                sx={styles.text}
                label="Link"
                type="link"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.link}
                fullWidth
              />
              <FormHelperText id="outlined-link-helper-text">
                Inserir link de preferência. Pode ser de venda online, instagram
                ou o que for.
              </FormHelperText>
            </div>

            <div>
              <InputLabel id="state">Estado</InputLabel>
              <Select
                sx={{
                  width: "100px",
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
              <InputLabel id="city">Cidade</InputLabel>
              <Select
                sx={{
                  width: "200px",
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
            <div>
              <InputLabel id="category">Categoria</InputLabel>
              <Select
                sx={{
                  width: "150px",
                }}
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
            </div>
            <div>
              <InputLabel id="subcategory">SubCategoria</InputLabel>
              <Select
                sx={{
                  width: "150px",
                }}
                labelId="subcategory"
                id="subCategory"
                value={subcategory}
                label="Category"
                onChange={handleChangeSubCategory}
              >
                {subcategories.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel id="pg">Classificação</InputLabel>
              <Select
                sx={{
                  width: "100px",
                }}
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
            </div>
            <div>
              <InputLabel id="tags">Tags</InputLabel>
              <Select
                sx={{
                  width: "200px",
                }}
                labelId="tags"
                id="Tags"
                multiple
                value={tag}
                label="Tags"
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                onChange={handleChangeTag}
              >
                {tags.map((t) => (
                  <MenuItem value={t.id}>
                    <ListItemText primary={t.name} />
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button
              sx={{
                width: "200px",
                marginTop: "30px",
                background: "purple",
              }}
              variant="contained"
              type="submit"
            >
              Adicionar Sessões
            </Button>
          </Box>
        </Box>
      </Form>
      {/* </Box>  */}
    </>
  );
}
export default Create;
