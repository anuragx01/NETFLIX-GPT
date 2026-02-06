
import { Provider } from 'react-redux';
import Body from './components/Body';
import Appstore from './utlis/Appstore';

function App() {
  return (
   <Provider store = {Appstore}><Body/></Provider>
  );
}

export default App;
