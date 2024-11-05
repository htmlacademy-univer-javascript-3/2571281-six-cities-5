import MainPage from './Main';

function App({ numberOfOffers }: { numberOfOffers: number }) {
  return (
    <div>
      <MainPage numberOfOffers={numberOfOffers} />
    </div>
  );
}

export default App;
