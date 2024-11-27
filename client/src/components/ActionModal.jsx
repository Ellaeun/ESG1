import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Lottie from "lottie-react";

import checkMarkAnimation from "../assets/checkmark.json";
import Backdrop from "./Backdrop.jsx";

ActionModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.element.isRequired,
  modalIcon: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

const popIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.05,
      type: "spring",
      damping: 50,
      stiffness: 300,
    },
  },
  exit: { scale: 0.9, opacity: 0 },
};

export default function ActionModal({
  handleClose,
  title,
  message,
  modalIcon,
  action,
}) {
  const [animateLottie, setAnimateLottie] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateLottie(true);
    }, 250);

    return () => clearTimeout(timeout);
  });

  return (
    <Backdrop onClick={() => {}}>
      <motion.div
        className="m-auto flex w-10/12 max-w-fit flex-col items-center justify-center gap-12 bg-primary p-12 font-bold text-tertiary q-rounded-xl md:w-[40rem]"
        onClick={(e) => e.stopPropagation()}
        variants={popIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="h-20 w-20 rounded-full bg-highlight">
          {animateLottie && modalIcon === "Checkmark" && <Checkmark />}
        </div>
        <div className="flex flex-col items-center justify-center text-center q-gap-5">
          <p className="q-text-2xl">{title}</p>
          <div className="q-text-base">{message}</div>
        </div>
        <div className="flex w-full justify-between gap-10 text-primary">
          <button className="q-rounded-2xl bg-tertiary px-8 py-4 hover:bg-tertiary/50" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="q-rounded-2xl bg-highlight px-8 py-4 hover:bg-highlight-light"
            onClick={action}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
}

function Checkmark() {
  return (
    <Lottie
      animationData={checkMarkAnimation}
      loop={false}
      style={{ width: 80, height: 80 }}
    />
  );
}
