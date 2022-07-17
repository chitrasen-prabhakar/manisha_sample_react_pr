//lib imports
import { Layout, Menu } from "antd";

//component imports
import ActiveLink from "src/components/layouts/ActiveLink";
import { RollbackOutlined } from "@ant-design/icons";

//hook imports
import usePermission from "src/components/hooks/usePermission";


import { MENULIST } from '../../utils/menu';

const { Sider } = Layout;
const { SubMenu } = Menu;
function BaseSidebar() {
  const permissions = usePermission();

  const displayMenu = (nestedMenu,index) =>{ 
    
    return(
    nestedMenu.map((nestedMenu, nestIndex) => (
        nestedMenu.menuIsVisible &&
        (nestedMenu.permission.length===0 || permissions.some(nesteditem => nestedMenu.permission.includes(nesteditem)))) &&
        <Menu.Item key={`nest${index+''+nestIndex}`} icon={nestedMenu.icon}>
          <ActiveLink href={nestedMenu.path} activeClassName="">
            <a>{nestedMenu.menu}</a>
          </ActiveLink>
        </Menu.Item>
    )
    )
}



  return (
    <Sider collapsible>
      <div className="text-center logo">
        <ActiveLink href="/" activeClassName="">
          <a>
            <img src="/images/logo.png" width="120" />
          </a>
        </ActiveLink>
      </div>
      <Menu theme="dark" mode="inline">
        {
          MENULIST.map((menuListItem, index) => (
            menuListItem.menuIsVisible && (menuListItem.permission.length===0 || permissions.some(item => menuListItem.permission.includes(item))) && 
            (typeof menuListItem.nestedMenu !="undefined" && menuListItem.nestedMenu.length>0
              ? (
                <SubMenu key={`sub${index}`} icon={menuListItem.icon} title={menuListItem.menu}>
                  {
    
                      menuListItem.nestedMenu.map((menuListSubItem, indexSub) => (
                        (typeof menuListSubItem.nestedMenu !="undefined" && menuListSubItem.nestedMenu.length>0) ?
                        (<SubMenu key={`subsub${indexSub}`} icon={menuListSubItem.icon} title={menuListSubItem.menu}>
                          {displayMenu(menuListSubItem.nestedMenu, indexSub)}
                        </SubMenu> ):
                        //displayMenu(menuListItem.nestedMenu, index)
                        menuListSubItem.menuIsVisible &&
                        (menuListSubItem.permission.length===0 || permissions.some(nesteditem => menuListSubItem.permission.includes(nesteditem))) &&
                        <Menu.Item key={`nest${index+''+indexSub}`} icon={menuListSubItem.icon}>
                          <ActiveLink href={menuListSubItem.path} activeClassName="">
                            <a>{menuListSubItem.menu}</a>
                          </ActiveLink>
                        </Menu.Item>
                      ))
                      
                    
                  }
                </SubMenu>
                
              )
              : 
              <Menu.Item key={index} icon={menuListItem.icon}>
                <ActiveLink href={menuListItem.path} activeClassName="">
                  <a>{menuListItem.menu}</a>
                </ActiveLink>
              </Menu.Item>
            )
            ))
          }
        {/* {

          MENULIST.map((menuListItem, index) => (
            menuListItem.menuIsVisible &&
            (menuListItem.permission.length===0 || permissions.some(item => menuListItem.permission.includes(item))) &&
            <>
            {(typeof menuListItem.nestedMenu !="undefined" && menuListItem.nestedMenu.length>0 ? 
              (
                <SubMenu key={`sub${index}`} icon={menuListItem.icon} title={menuListItem.menu}>
                  {menuListItem.nestedMenu.map((nestedMenu, nestIndex) => (
                      nestedMenu.menuIsVisible &&
                      permissions.some(nesteditem => nestedMenu.permission.includes(nesteditem))) &&
                      <Menu.Item key={nestIndex} >
                        <ActiveLink href={nestedMenu.path} activeClassName="">
                          <a>{nestedMenu.menu}</a>
                        </ActiveLink>
                      </Menu.Item>
                  )}
                </SubMenu>
              ) 
              : 
              (
                <Menu.Item key={index} icon={menuListItem.icon}>
                  <ActiveLink href={menuListItem.path} activeClassName="">
                    <a>{menuListItem.menu}</a>
                  </ActiveLink>
                </Menu.Item>
              ) 
            )}
            </>
          ))
        } */}
        
        

      </Menu>
    </Sider>
  );
}

export default BaseSidebar;
