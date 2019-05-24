import React from 'react';
// import LayoutContainer from './pages/LayoutContainer'
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       {this.props.children}
//     </div>
//   );
// }

class App extends React.Component{
  render() {
      return (
        <div className="App">
        { console.log("1", this.props.children) }
          {this.props.children}
        </div>
      )
  }
}

export default App;
