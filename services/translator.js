const getStringTranslated = (id, lang, langmap) => {
    if(langmap == null) {
        return 'TBD: '+id;
    }

    if(langmap.length == 0) {
        return 'TBD: '+id;
    }

    var _langFiltered = langmap.filter(l => l.codemsg == id);
    if(_langFiltered.length == 0) {
        return 'TBD: '+id;
    }else{
        var _temp = _langFiltered[0][lang] == '' ? _langFiltered[0]['en'] : _langFiltered[0][lang]
        if(_temp.charAt(0) == "\"") {
            _temp = _temp.substring(1, _temp.length);
        }
        return _temp
    }
}
  
export default {
    getStringTranslated
}
  