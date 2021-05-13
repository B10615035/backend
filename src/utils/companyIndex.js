// const companyList = ['中華電信', '台達電子', '邑富', '利凌企業', '英業達', '研揚IOT', '鈊象電子', '緯創資通', '研揚SDD1', '研揚SDD2']
const companyList = ['中華電信', '台達電子', '邑富', '利凌企業', '英業達', '研揚科技', '鈊象電子', '緯創資通']

const companyName = (index) => {
    return companyList[index]
}

const companyIndex = (name) => {
    for (let i = 0; i < companyList.length; i++) {
        if (companyList[i] == name)
            return i
    }
    return
}

export {companyName, companyIndex}