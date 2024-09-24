import React, { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const languages = [
  { label: 'English', value: '/auto/en' },
  { label: 'Русский', value: '/auto/ru' },
  { label: 'Polski', value: '/auto/pl' }
];

const GoogleTranslate = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'auto',
          autoDisplay: false,
          includedLanguages: 'af,ak,ee,yo,zu,so,ig,ha,ga,sq,it,ar,ja,az,kn,eu,ko,bn,la,be,lv,bg,lt,ca,mk,zh-CN,ms,zh-TW,mt,hr,no,cs,fa,da,pl,nl,pt,en,ro,eo,ru,et,sr,tl,sk,fi,sl,fr,es,gl,sw,ka,sv,de,ta,el,te,gu,th,ht,tr,iw,uk,hi,ur,hu,vi,is,cy,id,yi',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
        },
        'google_translate_element'
      );
    };

    if (hasCookie('googtrans')) {
      setSelected(getCookie('googtrans'));
    } else {
      setSelected('/auto/en');
    }

    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

 
  return (
    <>
      <div
        id="google_translate_element"
        style={{ position: 'fixed',
            bottom: 0,
            left: 0,
            marginBottom: '15px',
            marginRight: '30px',
            zIndex: 9999,
            height: '15px' }}
      ></div>
     
    </>
  );
};

export default GoogleTranslate;
