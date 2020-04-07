import React, { useState, createContext } from 'react';
import Counter from './Counter';
import Info from './Info';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import { SampleProvider } from './contexts/sample';
import CenterPane from './components/CenterPane'

const ThemeContext = createContext('black');
const App = () => {
  // const [visible, setVisible] = useState(false);

  // return (
  //   <div>
  //     <button
  //       onClick={() => {
  //         setVisible(!visible);
  //       }}
  //       >
  //         {visible ? '숨기기' : '보이기'}
  //     </button>
  //     <hr />
  //     {visible && <Info />}
  //   </div>
  // )

  return (
    <main className='main'>
      <aside className='filter-aside'>
        사이드바
        <section className='filter-container'>
          <div>
            input range 1
          </div>
          <div>
            input range 1
          </div>
          <div>
            check boxes
          </div>
        </section>
      </aside>
      <CenterPane />
    </main>
  )
}

export default App;
