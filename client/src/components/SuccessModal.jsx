import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Lottie from "lottie-react";

import checkMarkAnimation from "../assets/checkmark.json";
import Backdrop from "./Backdrop.jsx";

SuccessModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  modalIcon: PropTypes.string.isRequired,
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

export default function SuccessModal({
  handleClose,
  title,
  message,
  modalIcon,
}) {
  const [animateLottie, setAnimateLottie] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateLottie(true);
    }, 250);

    return () => clearTimeout(timeout);
  });

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="m-auto flex md:w-[40rem] w-10/12 max-w-fit flex-col items-center justify-center gap-12 bg-primary p-12 font-bold text-tertiary q-rounded-xl"
        variants={popIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="h-20 w-20 rounded-full bg-highlight">
          {animateLottie && modalIcon === "Checkmark" && <Checkmark />}
        </div>
        <div className="flex flex-col items-center justify-center q-gap-5 text-center">
          <p className="q-text-2xl">{title}</p>
          <p className="q-text-base">{message}</p>
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
