import { Section } from "./Components/Section";
import { DogProvider, useDogContext } from './providers/dog-context';
import { CreateDogForm } from './Components/CreateDogForm';
import { Dogs } from './Components/Dogs';
export function App() {
  
  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={'Dogs: '}>
        <Dogs />
        <CreateDogForm />
      </Section>
    </div>
  );
}
