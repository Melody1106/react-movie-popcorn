import React, { useState } from 'react';
import './style.scss';
function SwitchTabs({ data, onTabToggle }) {
  //選擇的tab 初始值index[0]  index[1]
  const [selectedTab, setSelectedTab] = useState(0);
  //位置 初始值absolute 0
  const [left, setLeft] = useState(0);

  const activeTab = (element, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 1000);
    // 時間延遲，以確保在設定選中效果之前，背景位置的變更能夠正確顯示給使用者
    onTabToggle(element, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabsItems">
        {data.map((element, index) => {
          return (
            <span
              key={index}
              className="tabsItem"
              onClick={() => activeTab(element, index)}
            >
              {element}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
}

export default SwitchTabs;
