import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <section>
      <div className="relative w-full bg-primary-black">
        <div className="flex justify-center py-16">
          <img className="w-32" src="images/logo-coag.png" alt="COAG" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
