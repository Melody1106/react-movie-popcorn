import './style.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/movix-logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';

//icon 放大鏡
import { HiOutlineSearch } from 'react-icons/hi';
// close icon
import { VscChromeClose } from 'react-icons/vsc';
// burger icon
import { SlMenu } from 'react-icons/sl';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  // const [showAll, setShowAll] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  //設置最後scrollY的狀態
  const [lastscrollY, setLastScrollY] = useState(0);
  //設置navbar的 css 狀態 會有 top & hide
  const [showNavCss, setShowNavCss] = useState('top');

  //當路由location改變時，這個useEffect會被觸發
  useEffect(() => {
    window.scrollTo(0, 0);
    //將視窗的滾動位置移動到 (0, 0) 的坐標，即頁面的頂部
  }, [location]);

  const controlNavbarHight = () => {
    //如果視窗的滾動位置大於200，設置hide樣式
    if (window.scrollY > 200) {
      if (window.scrollY > lastscrollY) {
        //如果視窗的滾動位置大於最後scrollY的狀態(一直下滑)，設置hide樣式
        setShowNavCss('hide');
      } else {
        setShowNavCss('show');
      }
    } else {
      setShowNavCss('top');
    }

    //更新最後scrollY的狀態
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbarHight);
    //返回一個清理函數是為了確保在組件卸載或 useEffect 依賴發生變化時，清理掉之前設置的效果或資源，從而確保代碼的正確性和效能。
    return () => {
      window.removeEventListener('scroll', controlNavbarHight);
    };
  }, [lastscrollY]);

  const handleOpenSearch = () => {
    setShowSearch(true);
  };

  const handleOpemMobileMenu = () => {
    setMobileMenu(true);
  };

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setQuery('');
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
    <header
      className={`header ${mobileMenu ? 'mobileView' : ''} ${showNavCss}`}
    >
      <ContentWrapper>
        <div className="navBetween ">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <ul className="menuItems">
              <li className="menuItem wrap">
                {/* <HiOutlineSearch onClick={handleOpenSearch} /> */}
                <input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <HiOutlineSearch />
              </li>
              <li className="menuItem" onClick={() => navigationMovieHandler()}>
                電影
              </li>
              <li className="menuItem" onClick={() => navigationTvHandler()}>
                戲劇
              </li>
            </ul>
          </div>
        </div>
        {/* 手機版menu */}
        <div className="mobileMenuItems">
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={handleOpemMobileMenu} />
          )}
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
              {/* <VscChromeClose onClick={() => setShowSearch(false)} /> */}
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
