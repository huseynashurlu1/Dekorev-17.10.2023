import { useState } from 'react';
import './Header/header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const SideNav = (props) => {
  const [selectedLocale, setSelectedLocale] = useState('az');

    const handleLocaleChange = (locale) => {
        props.onChange(locale)
        setSelectedLocale(locale);
    }
  return (
    <>
        {
          props.data ? <div className="sidenav">
          <div className="lang">
                     <Dropdown>
                         <Dropdown.Toggle variant="light" id="dropdown-basic">
                             <FormattedMessage id='Dil seçimi' defaultMessage='Dil seçimi'/>
                         </Dropdown.Toggle>

                         <Dropdown.Menu>
                             <Dropdown.Item onClick={() => handleLocaleChange('az')} selected={selectedLocale === 'az'}>Az</Dropdown.Item>
                             <Dropdown.Item onClick={() => handleLocaleChange('en')} selected={selectedLocale === 'en'}>En</Dropdown.Item>
                             <Dropdown.Item onClick={() => handleLocaleChange('ru')} selected={selectedLocale === 'ru'}>Ru</Dropdown.Item>
                         </Dropdown.Menu>
                     </Dropdown>
                     </div>
             <div className="pages">
               <Link to='/about'>Haqqımızda</Link>  
               <Link to='/contact'>Əlaqə</Link>  
               <Link to=''>İstifadəçi razılaşması</Link>  
               <Link to=''>Necə elan yerləşdirmək olar?</Link>  
             </div> 
   </div> : null
        }
    </>
  )
}
export default SideNav