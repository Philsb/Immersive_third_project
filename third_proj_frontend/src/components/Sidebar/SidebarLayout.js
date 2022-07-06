import React from 'react'
import { Link } from 'react-router-dom';
import Divider from '../Divider/Divider';

const SidebarLayout = (props) => {
  const block = "sidebar-layout";
  const {children, links, profileLink } = props;

  return (
    <div className={`${block}__root`}>
      <aside className={`${block}__sidebar`}>
        <Link to={""}>
          <div className={`${block}__icon-container`}>
            <i  className={`fa fa-home`}/>
          </div>
        </Link>
        <Link to={profileLink.to}>
          <div className={`${block}__icon-container`}>
            
            <i  className={`fa ${profileLink.iconClass}`}/>
          
          </div>
        </Link>
        

        <Divider/>
        {links.map ((link)=>{
          return (
            <Link to={link.to}>
              <div className={`${block}__icon-container`}>
                  <i  className={`fa ${link.iconClass}`}/>
              </div>
            </Link>);
        })}
      </aside>
      <main className={`${block}__main-content`}>
        {children}
      </main>
    </div>

    
  )
}

export default SidebarLayout;