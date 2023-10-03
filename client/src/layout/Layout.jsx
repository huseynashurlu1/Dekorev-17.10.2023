import React, { useState }  from 'react'
import Header from '../components/Header/Navbar'
import Footer from '../components/Footer/Footer'
import { IntlProvider } from "react-intl";
import az from "../languages/az.json";
import en from "../languages/en.json";
import ru from "../languages/ru.json";
import Category from '../components/Category/Category'


const messages = {
  az: az,
  en: en,
  ru: ru
};

const Layout = (props) => {
  const [locale, setLocale] = useState("az");

  function handleLocaleChange(e) {
    setLocale(e);
  }

  return (
    <div className="layout">
        <IntlProvider locale={locale} messages={messages[locale]}>
        <Header  value={locale} onChange={handleLocaleChange}/>
        <Category />
          <main className="content">
              {props.children}
          </main>
          <Footer />
      </IntlProvider>
    </div>
  )
}

export default Layout