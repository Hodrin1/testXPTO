import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./component/Home.js";
import Post from "./component/Post.js";
import Patch from "./component/Patch.js";
import Delete from "./component/Delete.js";
import CustomTableCell from "./component/CustomTableCell.js";
import List from "./component/List.js";
import  Grid  from './component/Grid.js';
import Tablexpto from './component/Tablexpto.js'

function App() {
  return (
    <div>
    <Tablexpto/>
    </div>
  );
}

export default App;
