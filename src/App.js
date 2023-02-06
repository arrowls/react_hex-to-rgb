import {useEffect, useState} from "react";

function App() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [copied, setCopied] = useState(false);

  function toRgbString() {
    setRgb('');
    setCopied(false);
    if (hex.length !== 6) return;

    const split = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!split) return;
    return `rgb(${
        parseInt(split[1], 16)
    }, ${
        parseInt(split[2], 16)
    }, ${
        parseInt(split[3], 16)
    })`;
  }

  function copy() {
    if (!rgb) return;
    navigator.clipboard.writeText(rgb + ';')
        .then(() => setCopied(true));
  }

  useEffect(() => {
    setRgb(toRgbString());
  }, [hex])

  return (
    <div className="App" style={{ backgroundColor: rgb, }}>
      <div className="hex-convert">
        <div className="hex-input-group">
          <input type="text"
                 className="hex-input"
                 value={hex}
                 onInput={(e) => setHex(e.target.value)}
                 maxLength={6}
          />
        </div>
        <span className="rgb-output" onClick={copy}>
          <span className="material-icons">
            {copied ? 'done' : 'content_copy'}
          </span>
          {rgb}
        </span>
      </div>
    </div>
  );
}

export default App;
