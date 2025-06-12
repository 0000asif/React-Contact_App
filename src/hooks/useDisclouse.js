import { useState } from "react";

const useDisclouse = () => {
   const [isOpen, setIsopen] = useState(false);

   const onOpen = () => {
      setIsopen(true);
   };

   const onClose = () => {
      setIsopen(false);
   };
   return { isOpen, onOpen, onClose };
};

export default useDisclouse;