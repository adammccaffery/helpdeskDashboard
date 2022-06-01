import logo from './logo.svg';
import './App.css';

// Components
import TitleHeader from "./components/titleHeader";
import CardCategory from "./components/cardCategory";

function App() {

  return (
    <div className="App">
      <div className="categoryContainer">
        <CardCategory title="Helpdesk" cards={[
          {"name":"Action Required","value":"51","customClasses":"warningImportant"},
          {"name":"Unassigned","value":"5","customClasses":"warningCaution"},
          {"name":"Open Today","value":"26"},
          {"name":"Resolved Today","value":"12"}
        ]}/>
        <CardCategory title="Database" cards={[
          {"name":"Incidents","value":"30"},
          {"name":"Service Requests","value":"12"},
          {"name":"Open Today","value":"1"},
          {"name":"Resolved Today","value":"1"}
        ]}/>
        <CardCategory title="IT Operations" cards={[
          {"name":"Action Required","value":"13","customClasses":"warningImportant"},
          {"name":"Unassigned","value":"1","customClasses":"warningCaution"},
          {"name":"Open Today","value":"0"},
          {"name":"Resolved Today","value":"0"}
        ]}/>
      </div>
    </div>
  );
}

export default App;
