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
  const [query, setQuery] = useState('');

  const handleOpenSearch = () => {
    setShowSearch(true);
  };

  const handleOpemMobileMenu = () => {
    setMobileMenu(true);
  };

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      //1秒後關閉搜尋欄
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationMovieHandler = () => {
    navigate('/explore/movie');
    setMobileMenu(false);
  };

  const navigationTvHandler = () => {
    navigate('/explore/tv');
    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${showAll}`}>
      <ContentWrapper>
        <div className="navContainer">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationMovieHandler()}>
              電影
            </li>
            <li className="menuItem" onClick={() => navigationTvHandler()}>
              戲劇
            </li>
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
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
