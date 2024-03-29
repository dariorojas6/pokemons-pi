import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { editPokemon, getDetail, getPokemons, getTypes } from "../actions";

import styles from "../styles/Edit.module.css";
import ash from "../styles/Images/ash2.png";
import izq from "../styles/Images/chevron-left2.png";
import poke from "../styles/Images/poke.png";

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 3) {
    errors.name = "Debe tener un nombre de mas de tres letras";
  }

  if (!input.hp || input.hp < 0 || input.hp > 150) {
    errors.hp = "Debe tener hp entre 1 - 150";
  }

  if (!input.attack || input.attack < 0 || input.attack > 150) {
    errors.attack = "Debe tener ataque entre 1 - 150";
  }

  if (!input.defense || input.defense < 0 || input.defense > 150) {
    errors.defense = "Debe tener defensa entre 1 - 150";
  }

  if (!input.speed || input.speed < 0 || input.speed > 150) {
    errors.speed = "Debe tener velocidad entre 1 - 150";
  }

  if (input.types.length === 0) {
    errors.types = "Debe tener por lo menos un tipo";
  }

  return errors;
}

function EditPokemon() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const allPokemons = useSelector((state) => state.pokemons);
  const pokemonDetail = useSelector((state) => state.detail);
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  let btnDisabled =
    !(
      input.name.length &&
      input.hp &&
      input.attack &&
      input.defense &&
      input.speed &&
      input.types.length
    ) ||
    input.hp > 150 ||
    input.attack > 150 ||
    input.defense > 150 ||
    input.speed > 150;

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getDetail(id));
  }, [dispatch, allPokemons.length, id]);

  useEffect(() => {
    if (pokemonDetail.length) {
      setInput(pokemonDetail[0]);
    }
  }, [pokemonDetail.length, pokemonDetail]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value.toLowerCase(),
    });

    setErrors(
      validate({
        ...input,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const handleSelect = (ev) => {
    if (!input.types.includes(ev.target.value)) {
      setInput({
        ...input,
        types: [...input.types, ev.target.value],
      });
    }
  };

  const handleDeleteType = (ev) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ev),
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(editPokemon(id, input));
    alert("Pokemon editado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
    history.push(`/pokemons/${id}`);
    dispatch(getDetail(id));
    dispatch(getPokemons());
  };

  return (
    <div>
      <div className={styles.navBar}>
        <img src={izq} alt="izq"></img>
        <Link to={`/pokemons/${id}`}>
          <button className={styles.buttonHome}>Return to my pokemon</button>
        </Link>
      </div>
      <div className={styles.contGral}>
        <div className={styles.cardCreate}>
          <img src={ash} alt="ash" className={styles.ash} />
          <div className={styles.violetTitle}>
            <img src={poke} alt="poke" className={styles.poke}></img>
            <div className={styles.title}>Edit your pokemon</div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className={styles.inputs}
                  />
                  {errors.name && (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                </div>

                <div>
                  <div>Hp:</div>
                  <input
                    type="number"
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                  {errors.hp && <div className={styles.error}>{errors.hp}</div>}
                </div>

                <div>
                  <div>Attack:</div>
                  <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                  {errors.attack && (
                    <div className={styles.error}>{errors.attack}</div>
                  )}
                </div>

                <div>
                  <div>Defense:</div>
                  <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                  {errors.defense && (
                    <div className={styles.error}>{errors.defense}</div>
                  )}
                </div>

                <div>
                  <select
                    onChange={(e) => handleSelect(e)}
                    className={styles.select}
                    disabled={input.types.length >= 2}
                    defaultValue="title"
                  >
                    <option value="title" disabled name="types">
                      Types
                    </option>
                    {types.map((t) => {
                      return (
                        <option
                          value={t.name}
                          key={t.name}
                          className={styles.options}
                        >
                          {t.name[0].toUpperCase() + t.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>

                  <ul className={styles.types}>
                    {input.types.map((t) => {
                      return (
                        <li key={t} className={styles.types}>
                          {t[0].toUpperCase() + t.slice(1)}
                          <button
                            onClick={() => handleDeleteType(t)}
                            className={styles.deleteButton}
                          >
                            x
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {errors.types && (
                    <div className={styles.error}>{errors.types}</div>
                  )}
                </div>
              </div>

              <div className={styles.der}>
                <div>
                  <div>Speed:</div>
                  <input
                    type="number"
                    value={input.speed}
                    name="speed"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                  {errors.speed && (
                    <div className={styles.error}>{errors.speed}</div>
                  )}
                </div>
                <div>
                  <div>
                    Height <small>(cm)</small>:
                  </div>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                    placeholder="Height"
                    className={styles.inputs}
                  />
                </div>
                <div>
                  <div>
                    Weight <small>(kg)</small>:
                  </div>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                    placeholder="Weight"
                    className={styles.inputs}
                  />
                </div>
                <div>
                  <div>Image:</div>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputs}
                    placeholder="URL"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.button}
                  disabled={btnDisabled}
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPokemon;
