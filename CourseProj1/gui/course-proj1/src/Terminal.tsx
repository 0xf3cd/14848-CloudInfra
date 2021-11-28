import React, { useRef, useEffect, useState } from 'react';
import { XTerm } from 'xterm-for-react';
import { TerminalProps } from './common/interface';

export const Terminal = ({wsUrl}: TerminalProps) => {
  const xtermRef = useRef<XTerm>(null);

  const [input, _setInput] = useState<string>('');
  const inputRef = useRef(input);
  const setInput = (s: string) => {
    inputRef.current = s;
    _setInput(s);
  };

  useEffect(() => {
    console.log(`Terminal connecting to: ${wsUrl}`);
    const xt: XTerm = (xtermRef.current as any);

    /* Connect to the WebSocket server running in the container */
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      console.log('WebSocket connected.');
    };
    ws.onclose = () => {
      console.log('WebSocket closed.');
    };
    ws.onmessage = (event) => {
      console.log(`WebSocket received ${event.data.length} bytes.`);
      xt.terminal.write(event.data);
    };

    /* Initialize the terminal */
    xt.terminal.onKey(e => {
      const realInput = inputRef.current;
      const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
      if (e.domEvent.key === 'Enter') {
        console.log(`Sending: ${realInput}`);
        ws.send(realInput);
        xt.terminal.writeln('');
        setInput('');
      } else if (e.domEvent.key === 'Backspace') {
        if (realInput !== '') {
          xt.terminal.write('\b \b');
          setInput(realInput.slice(0, -1)); // Remove the last char.
        }
      } else if (printable) {
        xt.terminal.write(e.key);
        setInput(realInput + e.key);
      }
    });
  }, [wsUrl]);

  return (
    <XTerm ref={xtermRef} />
  );
};

export default Terminal;