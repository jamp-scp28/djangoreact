import React, {useState} from 'react'
import SideNav, { NavItem, NavIcon, NavText, NavHeader, NavTitle, NavSubTitle} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router'
import { IoIosSpeedometer, IoMdPricetags, IoMdPin } from 'react-icons/io'

// Be sure to include styles at some point, probably during your bootstraping

const nothing = () => {}

const SideBar = (props) => {

    const [isSelected, Select] = useState(false)
    const [isToggled, Toggle] = useState(false)
    const [isExpanded, expande] = useState(false)

    
    return (
        <SideNav
            onSelect={(selected) => {
             Select(selected)
        // Add your code here
                props.history.push(`/${selected}`)

            }}
            onToggle={(expanded) => {
                Toggle(!isToggled)
                expande(expanded)
                props.handleSideBarToggle ? 
                props.handleSideBarToggle()
                :
                nothing()
                

            }}    
            
            style={{
                
                position: 'fixed',
                height: '100%',
                minwidth: '0',
                zIndex: '1',
                left: '0',
                background: 'linear-gradient(to right, #3A6073, #16222A)',
                overflowX: 'hidden',
                transition: '0.5s',
                

            }}
        >           
            <SideNav.Toggle />

            {isToggled ? 
            <>
            <NavItem className="pt-3">
               
                    <img src={require('../layout/img/site/logo_transparent.png')} 
                         width="35"
                         height="35"
                         alt="React Bootstrap logo"
                         className="ml-4"
                    />
                    
               
                
                    
                
            </NavItem>
            <NavItem className="mt-4">
                <center><h3>Main Menu</h3></center>

            </NavItem>
            </>

            :
            null    
        }




            
            <SideNav.Nav className="mt-4"  defaultSelected={isSelected}>
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <IoIosSpeedometer size='2em'/>
                    </NavIcon>
                   
                    <NavText style={{ textAlign: 'center' }}>
                        Dashboard
                    </NavText>
                    
                </NavItem>


                <NavItem eventKey="list">
                    <NavIcon>
                        <IoMdPricetags size='2em'/>
                    </NavIcon>
                    <NavText>
                        Products
                    </NavText>
                
                </NavItem>

                <NavItem eventKey="locations">
                    <NavIcon>
                        <IoMdPin size='2em'/>
                    </NavIcon>
                    <NavText>
                        Locations
                    </NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
    )

}
export default withRouter(SideBar)
