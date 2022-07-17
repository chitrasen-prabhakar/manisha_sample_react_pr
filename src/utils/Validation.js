const required = val => {
    if (val === null || typeof val === "undefined" || val === "") {
      return false;
    }
    return true;
  };
  
  const numberValidation = val => {
    const re = /^[0-9\b]+$/;
    if (!re.test(val)) {
      return false;
    }
    return true;
  };
  
  const panValidate = val => {
    const regpan = /^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/;
    if (!regpan.test(val)) {
      return false;
    } else {
      return true;
    }
  };
  
  const validateMobileNumber = val => {
    const mobReg =/^(?![9]{10})(?:[6|7|8|9][0-9]{9})$/;
    if (!mobReg.test(val)) {
      return false;
    }
    return true;
  };
  
  const numberWithCommas = (nStr) => {
    var x = nStr;
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0) {
        afterPoint = x.substring(x.indexOf('.'), x.length);
    }
       
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if (otherNumbers != '') {
        lastThree = ',' + lastThree;
    }
        
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  }
  
  const removeComma = (valWithComma) => {
    var retval = 0;
    if(valWithComma != undefined && valWithComma != '' ){
        var retval = valWithComma.toString().replace(/,/g, '');
    }
    return retval;
  }
  
  const isAlpha = (str)=> {
    if( /^[A-Za-z ]+$/.test(str) && str.length > 3){
      return true;
    }
    return false;
  }
  const emailValidation = (str) =>{
    if(/^[a-z0-9]+[\.a-z0-9+_-]+(\.[a-z0-9+_-]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|consulting|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(str)){
  
     return true;
    }
    return false;
  }
  
  const noSpecial =(str)=>{
    if(/^[a-zA-Z0-9]+$/.test(str)){
      return true;
    }
    return false;
  }
  
  const validateMinGrossIncome = (value)=>{
    const finalNumber = Number(removeComma(value));
    if (finalNumber < 8000) {
      return false;
    }
    return true;
  }
  const validFullName = (value)=>{
    var regName = /^[A-Za-z\s]+$/;
    if(value.trim().split(' ').length<2){
      return false
    }else{
      let validationPass = false;
      let nameArr = value.split(' ')
      for (var i = 0; i < nameArr.length; i++) {
        if(regName.test(nameArr[i])){
          validationPass = true;
        }else{
          validationPass = false;
          break;
        }
      }
      return validationPass
    }
  }
  const validPincode = (value)=>{
    var regName = /^[1-9][0-9]{5}$/;
    if(!regName.test(value)){
        return false;
    }else{
        return true;
    }
  }
  
  const calculateEmi = (tenure, roi, loanAmount) => {
    try {
      const roiDecimal = roi / 1200;
      const increasedRoi = roiDecimal + 1;
      let finalCalcuation = null;
      let dividendRoi = 1;
      let emiRunTime = null;
      const finalTenure = Number (tenure);
      let finalRoi = 1;
      for (let k = 1; k <= finalTenure; k++) {
        finalRoi *= increasedRoi;
      }
      finalCalcuation = finalRoi / (finalRoi - 1);
      if (dividendRoi !== null && finalRoi !== null) {
        emiRunTime = Number (loanAmount) * roiDecimal * finalCalcuation;
      }
      return emiRunTime;
    } catch (err) {
      throw new Error (err);
    }
  };
  
  const displayWithComma = (num) => {
    if(num!= undefined)
    {
        num = num.toString().replace(/,/g, '').replace(/^0+/, '');
        let lastThree = num.substring(num.length - 3);
        let otherNumbers = num.substring(0, num.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    }
  }
  
  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
  }
const gstValidate =  {
    url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
    email: /^[a-z0-9]+[\.a-z0-9+_-]+(\.[a-z0-9+_-]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|consulting|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    alnum: /^[A-Za-z0-9]+$/,
    alnumwithspace: /^[A-Za-z0-9 ]+$/,
    alpha: /^[A-Za-z]+$/,
    alphawithspace: /^[A-Za-z ]+$/,
    number: /^[0-9]+$/,
    postcode: /^([1-9][0-9]{5})$/,
    mobile: /^(?![9]{10})(?:[6|7|8|9][0-9]{9})$/,
    pancard: /^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/,
    DateBelow2000 : /^(195[2-9]|19[6-9][0-9])\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/,
    //timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
    dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
    hexadecimal: /^[0-9a-fA-F]+$/,
    //hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    //ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    //ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,

    //IPV4 + IPV6
    //ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/

    //ONLY IP V4
    ip: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    vehiclenumber:/^[A-Za-z]{2}[0-9]{2}[A-Za-z]{0,2}[0-9]{4}$/

}

 export {
    required,
    numberValidation,
    panValidate,
    validateMobileNumber,
    numberWithCommas,
    removeComma,
    isAlpha,
    emailValidation,
    validateMinGrossIncome,
    noSpecial,
    validFullName,
    validPincode,
    calculateEmi,
    displayWithComma,
    getCookie
  };
