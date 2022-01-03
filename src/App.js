
import Main from './page/Main'
import Login from './page/Login'
import Footer from './component/Footer'
import Header from './component/Header'
import Imginfo from './component/Imginfo'
import Write from './page/Write'
import {Route, Link, useHistory} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Main}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/write" component={Write}></Route>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
