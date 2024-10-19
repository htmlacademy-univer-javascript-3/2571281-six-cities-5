import React from "react";
import MainPage from "./MainPage";

function App({ numberOfOffers }: { numberOfOffers: number }) {
  return (
    <div>
      <MainPage numberOfOffers={numberOfOffers} />
    </div>
  );
}

export default App;