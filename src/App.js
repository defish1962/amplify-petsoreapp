import "./App.css";
import { Pets } from "./ui-components";
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";
import { AddPet } from "./ui-components";
import { useState } from "react";
import { PetDetails } from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Storage } from "@aws-amplify/storage";

<Pets />;
function App({ user, signOut }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();
  const [updatePet, setUpdatePet] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const formOverride = {
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age,
    },
    TextField29766924: {
      placeholder: breed,
    },
    TextField31802686: {
      placeholder: about,
    },
    TextField31802693: {
      placeholder: color,
    },
    TextField31802700: {
      placeholder: image,
    },
    image: {
      src:
        updatePet == null
          ? "https://images.unsplash.com/photo-1651347897093-454b8b9ea5a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F2YWNob258fHx8fHwxNjU2Njk2MDYw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
          : updatePet.image,
    },
    Button31802708: {
      isDisabled: !updatePet ? true : false,
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },
    Icon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
      },
    },
  };

  const petDetailsOverrides = {
    Close: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowDetails(false);
      },
    },
  };
  const navbarOverrides = {
    Button: {
      style: {
        cursor: "pointer",
      },
      onClick: signOut,
    },
    image: {
      //src: "https://img.icons8.com/color/50/000000/cat",
      src: user?.attributes?.profile,
    },
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(!showForm);
      },
    },
  };
  return (
    <div className="App">
      <NavBar width={"100%"} overrides={navbarOverrides} />
      <header className="App-header">
        {showDetails && (
          <PetDetails
            overrides={petDetailsOverrides}
            pet={pet}
            style={{ textAlign: "left", margin: "1rem" }}
          />
        )}

        {showForm && (
          <AddPet
            pet={updatePet}
            overrides={formOverride}
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
          />
        )}

        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              Breed: { color: "blue" },
              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails);
                  setPet(item);
                },
              },

              Button31572681: {
                onClick: () => {
                  if (!showForm) setShowForm(true);
                  setUpdatePet(item);
                  setName(item.name);
                  setColor(item.color);
                  setAge(item.age);
                  setBreed(item.breed);
                  setAbout(item.about);
                  setImage(item.image);
                },
              },
            },
          })}
        />
      </header>
      <Footer width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);
