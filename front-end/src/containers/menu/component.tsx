import { FC, useState } from 'react';
import { MenuProps } from './types';
import { motion } from 'framer-motion';

export const Menu: FC<MenuProps> = () => {
  const [showDesafioText, setShowDesafioText] = useState<boolean>(false);
  // const variants = {
  //   open: { width: '450px' },
  //   closed: { width: '20px' },
  // }

  return (
    <nav className="fixed top-0 right-0 flex flex-col items-end h-screen text-yellow">
      <motion.div
        style={{ width: '10px' }}
        whileHover={{ width: '450px', transition: { duration: 0.3 } }}
        className="h-full bg-dark-orange"
        onHoverStart={() => setShowDesafioText(true)}
        onHoverEnd={() => setShowDesafioText(false)}
      >
        {showDesafioText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full"
          >
            <h3>Un desafío global</h3>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        style={{ width: '10px' }}
        whileHover={{ width: '450px' }}
        className="h-full bg-dark-green"
      />
      <motion.div
        style={{ width: '10px' }}
        whileHover={{ width: '450px' }}
        className="h-full bg-light-orange"
      />
      <motion.div
        style={{ width: '10px' }}
        whileHover={{ width: '450px' }}
        className="h-full bg-light-green"
      />
    </nav>
  );
};

export default Menu;
