import { useEffect, useState } from "react";
import { useWizard } from "@/index";
import Modal from "react-modal";
import {
  BsArrowClockwise,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsArrowRepeat,

BsX 
} from "react-icons/bs";

function StepFinal() {
  const { values, updateStep } = useWizard();
  const [truthy, setTruthy] = useState(true);
  const [checking, setChecking] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    const res = !truthy;
    setTruthy(res);
    updateStep("hideNext", res);
  }

  let data = {};
  Object.keys(values).forEach((stepId) => {
    data = {
      ...data,
      ...values[stepId],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      first()
    }, 2000)
  }, [])

  const first = () => {
    const newChecking = checking + 1;
    setChecking(1);
    setTimeout(() => {
      second()
    }, 2500)
  }
  const second = () => {
    setChecking(2);
    setTimeout(() => {
      setChecking(5)
      setIsOpen(true);
    }, 2000)
  }

  const checkingBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('win') !== -1) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      <h2 className="meeting-head">Video Conference</h2>
      <div className="flex ">
        <div className="checking">
          <ul>
            <li>  <div>{checking === 0 ? <BsArrowClockwise className="loading-icon w-6 h-6 fill-current" /> : <BsCheckCircleFill className="w-6 h-6 fill-current" />}</div>Network Status</li>
            <li>  <div>{checking === 1 ? <BsArrowClockwise className="loading-icon w-6 h-6 fill-current" /> : checking < 1 ? <></> : <BsCheckCircleFill className="w-6 h-6 fill-current" />}</div>Audio</li>
            <li>  <div>{checking === 2 ? <BsArrowClockwise className="loading-icon w-6 h-6 fill-current" /> : checking < 2 ? <></> : <BsExclamationCircleFill className="w-6 h-6 fill-current" />}</div>Camera</li>
            <li>  <div></div>Waiting</li>
          </ul>
        </div>
        <div className="meeting-screen">
          <div className="meeting-screen-loading">
            <BsArrowRepeat
              className="loading-icon-slow w-10 h-10 fill-current" />
            Device Checking
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Example Modal">
        <h2>Hello</h2>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default StepFinal;
