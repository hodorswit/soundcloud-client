import React from "react";
import DevTools from "mobx-react-devtools";

function App({ children }) {
  return (
    <div>
      {children}
      <DevTools />
    </div>
  );
}

export default App;
