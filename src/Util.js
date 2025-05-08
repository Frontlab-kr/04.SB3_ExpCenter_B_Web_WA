import CryptoJS from 'crypto-js'
import store from './store'

export function cAES256Encrypt(plaintext) {
  let key = CryptoJS.enc.Utf8.parse("32Bytestfirerenewalsystemkeydata");
  let iv = CryptoJS.enc.Utf8.parse("16Bytefirestring");

  let cipher = CryptoJS.AES.encrypt(plaintext, key, {
    iv : iv,
    padding : CryptoJS.pad.Pkcs7,
    mode : CryptoJS.mode.CBC
  });
  return cipher.toString()
}

export function ConvertNumberToTime(data) {
  let cMorning = ""

  if (data > 12) {
    cMorning = "오후"
    data -= 12
  } else {
    cMorning = "오전"
  }

  return `${cMorning} ${data}:00`
}

export function ConvertTime1(data) {
  let iHour = Number(data.substring(0,2))
  let cMorning = ""

  if (iHour > 12) {
    cMorning = "오후"
    iHour -= 12
  } else {
    cMorning = "오전"
  }

  return `${cMorning} ${iHour}:${data.substring(3,5)}`
}

export function sNowDate() {
  var sDate = new Date(),
  year = sDate.getFullYear(),
  month = (sDate.getMonth() + 1).toString().padStart(2, '0'),
  day = sDate.getDate().toString().padStart(2, '0'),
  hour = sDate.getHours().toString().padStart(2, '0'),
  min = sDate.getMinutes().toString().padStart(2, '0'),
  sec = sDate.getSeconds().toString().padStart(2, '0')

  return [year, month, day, hour, min, sec].join('')
}

export function ConvertTime2(data) {
  let iHour = Number(data.substring(0,2))

  return `${iHour}:${data.substring(3,5)}`
}

export function ConvertTimeToDate(data) {
  var sDate = new Date(data),
  year = sDate.getFullYear(),
  month = (sDate.getMonth() + 1).toString().padStart(2, '0'),
  day = sDate.getDate().toString().padStart(2, '0')

  return [year, month, day].join('.')
}

export function cReturnDateToString(DateTime) {
  return [DateTime.getFullYear(), (DateTime.getMonth() + 1).toString().padStart(2, '0'), DateTime.getDate().toString().padStart(2, '0')].join('-')
}

export function cTypeToPlaceNm(cType) {
  if (cType == "gwangnaru") {
    return "광나루"
  } else {
    return "보라매"
  }
}

export function getExtension(fileName) {
  var fileLength = fileName.length;
  //substring 메서드는 start에서 end까지(end는 포함 안 함) 부분 문자열을 포함하는 문자열을 반환합니다. 
  var lastDot = fileName.lastIndexOf('.');
  var fileExtension = fileName.substring(lastDot+1, fileLength);
  return fileExtension;
}

export function sGetFileType(s) {
  if (s == "") {
    return s;
  }
  var idx = 0;
  idx = s.indexOf("video");
  if (idx > -1) { return "10-동영상";}

  idx = s.indexOf("image");
  if (idx > -1) { return "20-이미지";}
  
  idx = s.indexOf("audio");
  if (idx > -1) { return "30-음악";}

  return "00-알 수 없음";
}

export function sGetId(s) {
  // return s.substring(0, 6);
  if (s == "") return s;
  if (s == "ALL") return s;
  if (s == "NONE") return s;
  
  var idx = s.indexOf("-");

  if (idx == -1) {
    return "";
  } else {
    return s.substring(0, idx);
  }
}

export function cRemoveBlankText(cText) {
  return cText.replace(/ /gi,"")
}

// export function bCheckMobilePhone(number){
//   return /^01([0|1|6|7|8|9])(-)([0-9]{3,4})(-)([0-9]{4})$/.test(number);
// }

// export function formatBytes(bytes, decimals = 2) {
//   if (bytes === 0) return '0 Byte';
//   if (bytes === 1) return '1 Byte';

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// }

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function formatDate2(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateString) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
      return new Date(); // 형식이 틀리면 현재 날짜 반환
  }

  const [yyyy, mm, dd] = dateString.split('-').map(Number);
  const date = new Date(yyyy, mm - 1, dd);

  // 날짜 유효성 검사 (예: 2024-02-30 같은 잘못된 날짜 방지)
  if (date.getFullYear() !== yyyy || date.getMonth() !== mm - 1 || date.getDate() !== dd) {
      return new Date(); // 유효하지 않은 날짜면 현재 날짜 반환
  }

  return date;
}


export function bStringToBool(cString) {
  if (cString == "Y") {
    return true
  } else {
    return false
  }
}

export function cBoolToString(bBool) {
  if (bBool) {
    return "Y"
  } else {
    return "N"
  }
}

export function ReturnSelectArray(oSelectedExp) {
  let ReturnArray = []

  const ageFlags = [
    oSelectedExp.AGE1_YN,
    oSelectedExp.AGE2_YN,
    oSelectedExp.AGE3_YN,
    oSelectedExp.AGE4_YN,
    oSelectedExp.AGE5_YN,
    oSelectedExp.AGE6_YN,
    oSelectedExp.AGE7_YN
  ];

  ageFlags.forEach((flag, index) => {
    if (flag === "Y") {
      ReturnArray.push(store.state.zSelectYears2[index]);
    }
  });

  return ReturnArray
}

// export function s14OldCheck(birth) {
//   if (String(birth).length > 8) {
//     return false
//   }

//   var today = new Date();
//   var yyyy = today.getFullYear();
//   var mm = String(today.getMonth() + 1).padStart(2, '0');
//   var dd  = String(today.getDate()).padStart(2, '0');

//   if (parseInt(String(yyyy) + String(mm) + String(dd)) - parseInt(birth) - 140000 < 0) {
//     return false
//   }

//   return true
// }

export function s14OldCheck(birth) {
  if (!/^\d{8}$/.test(birth)) {
    console.log("!!!!!!!!!!!!!", birth);
    return false;  // 8자리 숫자가 아닐 경우 false
  }

  var today = new Date();
  var birthDate = new Date(
    parseInt(birth.substring(0, 4)),  // 연도
    parseInt(birth.substring(4, 6)) - 1,  // 월 (0부터 시작)
    parseInt(birth.substring(6, 8))   // 일
  );

  // 현재 날짜에서 14년 전 날짜 계산
  var minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 14);

  console.log(minDate, birthDate);

  return birthDate <= minDate;  // 생일이 14년 전보다 작거나 같으면 true
}

export function calculateAge(birthdateString) {
  // Parse the birth date string
  const year = parseInt(birthdateString.substring(0, 4), 10);
  const month = parseInt(birthdateString.substring(4, 6), 10) - 1; // Month is zero-indexed
  const day = parseInt(birthdateString.substring(6, 8), 10);

  const birthDate = new Date(year, month, day);
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}


// YYYY.MM.DD 형식 검사 (정확한 날짜 유효성 검사 포함)
export function isValidDateFormat(dateString) {
  const regex = /^(19|20)\d\d\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;

  if (!regex.test(dateString)) {
      return false;
  }

  // 날짜 유효성 검사 (예: 2024.02.30은 존재하지 않음)
  const [year, month, day] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);

  return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
  );
}



export function formatDateYYYYMMDDtoDot(dateStr) {
  if (!/^\d{8}$/.test(dateStr)) return dateStr; // 8자리 숫자 확인
  return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
}

export function formatDateYYYYMMDDtoDash(dateStr) {
  if (!/^\d{8}$/.test(dateStr)) return dateStr; // 8자리 숫자 확인
  return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}

export function MaskName(name) {
  // 글자가 2글자인 경우, 두 번째 글자를 '*'로 변경
  if (name.length === 2) {
    return name[0] + '*';
  }
  // 글자가 3글자 이상인 경우, 첫 번째와 마지막 글자 이외의 모든 글자를 '*'로 변경
  return name.replace(/(?<=^.)(.*)(?=.$)/, (match) => '*'.repeat(match.length));
}
