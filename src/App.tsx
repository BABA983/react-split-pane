import { useState } from 'react';
import './App.css';
import SplitPane, { TSplit } from './components';

function App() {
  const [split, setSplit] = useState<TSplit>('vertical');
  const [reverse, setReverse] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<boolean>(true);
  const [order, setOrder] = useState<0 | 1>(0);
  return (
    <div className="App">
      <div>
        <button onClick={() => setSplit('vertical')}>vertical</button>
        <button onClick={() => setSplit('horizontal')}>horizontal</button>
        <button onClick={() => setReverse(!reverse)}>reverse</button>
        <button onClick={() => setPercentage(!percentage)}>percentage</button>
        <button onClick={() => setOrder(0)}>order0</button>
        <button onClick={() => setOrder(1)}>order1</button>
      </div>
      {/* <SplitPane reverse={reverse}>
        <div>123</div>
        <div>asd</div>
      </SplitPane> */}
      <SplitPane
        split={split}
        percentage={percentage}
        initSize={200}
        minSize={split === 'vertical' ? [200, 400] : [100, 100]}
        reverse={reverse}
        order={order}
      >
        <div>
          <h1>first pane</h1>
          <h2>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h2>
          <h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h3>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h4>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h5>
          <h6>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h6>
        </div>
        <div>
          <h1>second pane</h1>
          <h2>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h2>
          <h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h3>
          <h4>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h4>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h5>
          <h6>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium laboriosam reiciendis eum quae excepturi itaque
            suscipit, sint blanditiis quidem accusantium ut inventore quo fugit.
            Doloremque eveniet harum inventore eius.0
          </h6>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
