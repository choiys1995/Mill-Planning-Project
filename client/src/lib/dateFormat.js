// eslint-disable-next-line no-extend-native
Date.prototype.format = function(fomatter) {
    if(!this.valueOf()) return '';

    const weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = this;

    return fomatter.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function(normalize){
        switch(normalize) {
            case 'yyyy': return date.getFullYear();                 //년 4자리
            case 'yy': return (date.getFullYear() % 1000).sub(2);   //년 2자리
            case 'MM': return (date.getMonth() + 1).sub(2);         //월 2자리
            case 'dd': return (date.getDate()).sub(2);          //일 2자리
            case 'KS': return weekKorShortName(date.getDay());      //요일 (한글 한글자)
            case 'KL': return weekKorName(date.getDay());           //요일 (한글 전체)
            case 'ES': return weekEngShortName(date.getDay());      //요일 (영어 세글자)
            case 'EL': return weekEngName(date.getDay());           //요일 (영어 전체)
            case 'HH': return date.getHours().sub(2);               //24시 기준 2자리
            case 'hh': return (date.getHours() % 12).sub(2);        //12시간 기준 2자리
            case 'mm': return date.getMinutes().sub(2);             //분 2자리
            case 'ss': return date.getSeconds().sub(2);             //초 2자리
            case 'a/p': return date.getHours() < 12 ? "오전" : "오후"//오전오후 구분
            default: return fomatter;     
        }
    });
}

// eslint-disable-next-line no-extend-native
String.prototype.string = function(len){
    let str = '', i = 0;
    while (i ++ < len) {
        str += this;
    }

    return str;
}

// eslint-disable-next-line no-extend-native
String.prototype.sub = function(len) {
    return "0".string(len - this.length) + this;
}

// eslint-disable-next-line no-extend-native
Number.prototype.sub = function(len) {
    return this.toString().sub(len);
}
