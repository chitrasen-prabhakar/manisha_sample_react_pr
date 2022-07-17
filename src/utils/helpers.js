import { notification } from "antd";
import XLSX from "xlsx";

// helps in parsing attrubibute to compatible type 3 data in the conditions form
const conditionsFormJsonParser = values => {
  return Object.keys(values).map(categories => {
    return {
      title: categories,
      key: categories,
      children: Object.keys(values[categories]).map(subCategories => {
        return {
          title: subCategories,
          key: `${categories}+${subCategories}`,
          children: values[categories][subCategories].map(individualCategories => ({
            title: individualCategories,
            key: `${categories}+${subCategories}+${individualCategories}`
          }))
        }
      })
    }
  })
}

// convert file to base 64
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

// check if the logged in user has certain permission or not
const checkPermissionByName = (permissionToBeChecked) => {
  let hasPermission = false;
  if (localStorage) {
    let permissions = localStorage.getItem('ls.userPermissions') && JSON.parse(localStorage.getItem('ls.userPermissions'));
    permissions.OPS_CAMPAIGN && permissions.OPS_CAMPAIGN.forEach(permission => {
      if (permission.name === permissionToBeChecked) hasPermission = true;
    })
  }
  return hasPermission;
}

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

const handleResponse = (response, type, fetchData, hideForm, handleLoader) => {

  if(handleLoader) {
      handleLoader(false);
  }
  if(response?.statusCode === 200) {
    if(response?.data?.data) {
      if(type !== 'fetched') {
        openNotificationWithIcon("success", "Success", `Transaction ${type} successfully`);
      }
      if (fetchData) {
        fetchData()
      };
      if (hideForm) {
        hideForm();
      }
    } else {
      openNotificationWithIcon("error", "Error", response?.data?.error?.errorMessage);
      //if(response?.data?.error?.errorCode === '505') {
          // localStorage.clear();
          // window.location.assign(`${window.location.origin}/#/login`);
      //}
    }
  } else {
      openNotificationWithIcon("error", "Error", "Something went wrong. Please try again");
  }
}


async function csvFileReader(csv) {
  let base64String = await getBase64(csv);
  base64String = base64String.split(",")[1];

  // get the email list by reading the base64
  const excelFile = XLSX.read(base64String, { type: "base64" });
  const sheetNameList = excelFile.SheetNames;
  const data = XLSX.utils.sheet_to_csv(
    excelFile.Sheets[sheetNameList[0]]
  );
  return data.split('\n');

}

function formSelectMapper(data= [], text, value) {
  const mappedData = data.map(item=> {
    const obj = {text:'', value: ''}
    if(text && value && item[text] && item[value]){
      obj.text = item[text];
      obj.value = item[value];
    }else{
      obj.text = item;
      obj.value =item;
    }
    

    return obj;
  })

  return mappedData;
}

/**
 *
 * @param {*} func
 * @param {*} delay
 */
const debounce = (func, delay) => {
  let debounceTimer;

  // @ts-ignore
  return (...rest) => {
    // @ts-ignore
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(context, rest);
    }, delay);
  };
};


export { conditionsFormJsonParser, getBase64, openNotificationWithIcon, handleResponse, checkPermissionByName, csvFileReader, formSelectMapper, debounce }
