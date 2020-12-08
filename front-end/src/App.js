import { Grommet} from 'grommet';
import Route from './route/route';
import Theme from './configuration/theme';
import { StateProvider } from './store/store';
const App =() => (
  <Grommet theme={Theme} style={{backgroundColor:"#F0F4EF"}}>      
    <StateProvider>
      <Route/>
    </StateProvider>
  </Grommet>
  );

export default App;
