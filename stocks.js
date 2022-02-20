import { json } from "express";



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

function getRandomNumber(min, max, isInt) {
    if (isInt) {
        return Math.round(Math.random() * (max - min) + min);
    }
    return Math.random() * (max - min) + min;
}

function getRandomJSON() {

    const stocks = ["AT&T", "유아이패스", "애플", "테슬라", "서던", "슐럼버거"
    ,"소파이 테크놀로지", "루시드 그룹", "필립스 66", "파이오니어 내츄럴 리소스"]


    let jsonFormat = {
        "stockName": "AT&T",
        "currentPrice": 2150,
        "stockQuantity": 0.075269,
        "valueChange": 156,
        "percentChange": 7.82,
    }

    jsonFormat.stockName = stocks[Math.floor(Math.random() * stocks.length)]
    jsonFormat.currentPrice = getRandomNumber(0, 30000, true);
    jsonFormat.stockQuantity = Math.random();
    jsonFormat.valueChange = getRandomNumber(0, 10000, true);
    jsonFormat.percentChange = getRandomNumber(0, 30, false);

    return jsonFormat
}