import React from "react";
import '../css/main.css'
import { RouterProvider } from "react-router-dom";
import Routers from './Routers'

class App extends React.Component {
    render() {
      return (
        <>
          <RouterProvider router={Routers}/>
        </>
      );
    }
  }

export default App