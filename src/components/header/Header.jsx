import './style.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/movix-logo.svg';
import { useNavigate } from 'react-router-dom';

//icon 放大鏡
import { HiOutlineSearch } from 'react-icons/hi';
// close icon
import { VscChromeClose } from 'react-icons/vsc';
// burger icon
import { SlMenu } from 'react-icons/sl';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAll, setShowAll] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleOpenSearch = () => {
    setShowSearch(true);
  };

  const handleOpemMobileMenu = () => {
    setMobileMenu(true);
  };
  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${showAll}`}>
      <ContentWrapper>
        <div className="navContainer">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
          </div>
          <ul className="menuItems">
            <li className="menuItem">電影</li>
            <li className="menuItem">戲劇</li>
            <li className="menuItem">
              <HiOutlineSearch onClick={handleOpenSearch} />
            </li>
          </ul>
        </div>
        {/* 手機版menu */}
        <div className="mobileMenuItems">
          <HiOutlineSearch />
          <VscChromeClose onClick={() => setMobileMenu(false)} />
          <SlMenu onClick={handleOpemMobileMenu} />
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input type="text" />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
