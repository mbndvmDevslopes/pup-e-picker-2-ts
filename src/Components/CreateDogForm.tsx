import { ReactEventHandler, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogContext } from "../providers/dog-context";
import { Dog } from "../types";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { createDog } = useDogContext();
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [newDog, setNewDog] = useState<Omit<Dog, "id">>({
      name: "",
      description: "",
      image: selectedImage,
      isFavorite: false,
    });

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => setNewDog({ ...newDog, [e.target.name]: e.target.value });

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog(newDog);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input type="text" value={newDog.name} name='name' required onChange={handleChange}/>
        <label htmlFor="description">Dog Description</label>
        <textarea name="description" value={newDog.description} id="" cols={80} rows={10} onChange={handleChange}></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
        value={newDog.image}
        name='image'
          id=""
          onChange={(e) => {
            handleChange;
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
