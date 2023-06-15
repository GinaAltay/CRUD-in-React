import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const URL = 'https://64449cb3914c816083bce3d9.mockapi.io/Animal';

  const [animals, setAnimals] = useState([{}]);
  const [newAnimalName, setNewAnimalName] = useState('');
  const [newAnimalType, setNewAnimalType] = useState('');

  const [updatedAnimalName, setUpdateAnimalName] = useState('');
  const [updatedAnimalType, setUpdateAnimalType] = useState('');

  useEffect(() => {
    getAnimals();
  }, []);

  function getAnimals() {
    fetch(URL).then(data => data.json()).then(data => setAnimals(data));
  }

  function deleteAnimal(id) {
    fetch(URL + `/${id}`, {
      method: 'Delete'
    }).then(() => getAnimals());
  }

  function postNewAnimal(event) {
    event.preventDefault();

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newAnimalName,
        type: newAnimalType
      })
    }).then(() => getAnimals());
  }
  function updateAnimal(e, animalObject) {
    e.preventDefault();

    let updatedAnimalObject = {
      ...animalObject,

      name: updatedAnimalName,
      type: updatedAnimalType
    };
    fetch(`${URL}/${animalObject.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnimalObject)
    }).then(() => getAnimals());
  }

  return (
    <div className="App">
      <form>
        <h3>post new animal form</h3>
        <label>Name</label>
        <input onChange={e => setNewAnimalName(e.target.value)} />

        <label>Type</label>
        <input onChange={e => setNewAnimalType(e.target.value)} />

        <button onClick={e => postNewAnimal(e)}>Submit</button>
      </form>
      <hr />

      {animals.map((animal, index) =>
        <div key={index}>
          <div className="container">
            name:{animal.name}
            <br />
            <br />
            type:{animal.type}
            <br />
            <button onClick={() => deleteAnimal(animal.id)}>Delete</button>
          </div>

          <form className="update-container">
            <label>Update Name</label>
            <input onChange={e => setUpdateAnimalName(e.target.value)} />
            <br />

            <label>Update Type</label>
            <input onChange={e => setUpdateAnimalType(e.target.value)} />
            <br />

            <button onClick={e => updateAnimal(e, animal)}>Update</button>
          </form>
          <hr />
        </div>
      )}
    </div>
  );
}
export default App;
