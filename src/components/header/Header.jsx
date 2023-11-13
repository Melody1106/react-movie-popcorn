import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

//icon 放大鏡
import { HiOutlineSearch } from "react-icons/hi";
// close icon
import { VscChromeClose } from "react-icons/vsc";
// burger icon
import { SlMenu } from "react-icons/sl";
import { useState } from "react";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const handleOpenSearch = () => {
    setShowSearch(true);
  };
  return (
    <header className="header">
      <ContentWrapper>
        <div className="navContainer">
          <div className="logo">
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
          <VscChromeClose />
          <SlMenu />
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
