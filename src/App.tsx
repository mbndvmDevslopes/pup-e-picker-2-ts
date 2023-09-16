import { Section } from './Components/Section';
import { CreateDogForm } from './Components/CreateDogForm';
import { Dogs } from './Components/Dogs';
import { useDogContext } from './providers/useDogContext';

export function App() {
  const { activeTab } = useDogContext();
  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={'Dogs: '}>
        {activeTab !== 'create-dog-form' && <Dogs />}
        {activeTab === 'create-dog-form' && <CreateDogForm />}
      </Section>
    </div>
  );
}
