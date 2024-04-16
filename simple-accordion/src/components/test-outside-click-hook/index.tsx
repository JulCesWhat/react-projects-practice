import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const TestOutsideClickHook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className="container">
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div className="dropdown">Dropdown</div>}
    </div>
  );
};
export default TestOutsideClickHook;
