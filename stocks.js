import { json } from "express";

const stocks = [
    "AT&T", "유아이패스", "애플", "테슬라", "서던", "슐럼버거" ,"소파이 테크놀로지", "루시드 그룹", "필립스 66", "파이오니어 내츄럴 리소스",
     "AMD", "ASML", "AstraZeneca ADR", "Constellation Energy", "CSX", "JD닷컴 ADR", "KLA", "달러트리", "넷이즈",
     "넷플릭스", "데이터도그", "덱스컴", "도큐사인", "램리서치", "로스 스토어스", "루시드", "룰루레몬", "마벨 테크놀러지",
     "마이크로칩 테크", "마이크로소프트", "마이크론 테크놀로지", "매치 그룹", "메르카도리브레", "메타", "모더나",
    
    ]

const stockImageURL = {
    "애플": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201812022340",
    "AT&T": "https://gateway.foresee.com/sites/att/production/trigger/sitelogo_m.png",
    "넷플릭스": "http://cdnimage.dailian.co.kr/news/202107/news_1626825864_1013628_m_1.png",
    "테슬라": "https://mblogthumb-phinf.pstatic.net/20160720_1/ooc1001_1468993578490XkftQ_PNG/Screenshot_2016-07-20-12-15-12-1.png?type=w800",
    "마이크로소프트": "https://img.hankyung.com/photo/202111/01.27950322.1.jpg",
    "매치 그룹": "https://blog.kakaocdn.net/dn/b3mJ97/btrcNnctseH/fKOPJqVcRhhsHN8m3fZ1rk/img.png",
    "AMD": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/1280px-AMD_logo_pre-2013.svg.png",
    "메타": "https://file.mk.co.kr/meet/yonhap/2021/10/29/image_readtop_2021_1024237_0_073011.jpg",
    "모더나": "http://img.etoday.co.kr/pto_db/2020/05/20200518225955_1461463_419_267.jpg",

}

export function createMyStockLists(count) {
    
    let list = []
    Array.from(Array(count).keys())
    .forEach(element => {
        const randomJson = getRandomJSON()
        list.push(randomJson);
    });
    console.log(list)
    return list
}

export function createMyProfit() {
    let list = []
    let jsonFormat = {
        "userName": "관리자",
        "totalAsset": getRandomNumber(1000,10000000, true),
        "valueChange": getRandomNumber(0, 10000, true),
        "percentChange": getRandomNumber(0, 300, false),
        "referenceDay": "20220223"
    }
    
    list.push(jsonFormat)
    return list
}



function getRandomNumber(min, max, isInt) {
    if (isInt) {
        return Math.round(Math.random() * (max - min) + min);
    }
    return Math.random() * (max - min) + min;
}

function getRandomJSON() {
    let jsonFormat = {
        "stockName": "AT&T",
        "currentPrice": 2150,
        "stockQuantity": 0.075269,
        "valueChange": 156,
        "percentChange": 7.82,
        "imageURL": ""
    }

    jsonFormat.stockName = stocks[Math.floor(Math.random() * stocks.length)]
    jsonFormat.currentPrice = getRandomNumber(0, 30000, true);
    jsonFormat.stockQuantity = Math.random();
    jsonFormat.valueChange = getRandomNumber(0, 10000, true);
    jsonFormat.percentChange = getRandomNumber(0, 30, false);
    jsonFormat.imageURL = stockImageURL[jsonFormat.stockName];

    return jsonFormat
}