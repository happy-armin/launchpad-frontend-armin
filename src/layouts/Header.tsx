import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenu from '../components/HamburgerMenu';
import ConnectWallet from '../components/ConnectWallet';

import '../styles/layouts/header.scss';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'is-sticky' : ''}`}>
      <Link to="/" className="header__logo">
        LaunchPad
      </Link>
      <div className="header-right-bar">
        <ConnectWallet />
        <nav className="header__nav">
          <ul>
            <li>
              <Link to="/create">Create Pool</Link>
            </li>
            <li>
              <Link to="/pools">IDOs</Link>
            </li>
            <li>
              <Link to="/block">Block List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <HamburgerMenu />
    </header>
  );
}
