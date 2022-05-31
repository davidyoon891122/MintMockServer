const stocks = [
  'AT&T',
  '유아이패스',
  '애플',
  '테슬라',
  '슐럼버거',
  '소파이 테크놀로지',
  '루시드 그룹',
  '필립스 66',
  '파이오니어 내츄럴 리소스',
  'AMD',
  'ASML',
  'AstraZeneca ADR',
  'Constellation Energy',
  'CSX',
  'KLA',
  '달러트리',
  '넷이즈',
  '넷플릭스',
  '데이터도그',
  '도큐사인',
  '램리서치',
  '루시드',
  '룰루레몬',
  '마벨 테크놀러지',
  '마이크로칩 테크',
  '마이크로소프트',
  '마이크론 테크놀로지',
  '매치 그룹',
  '메르카도리브레',
  '메타',
  '모더나',
]

const stockImageURL = {
  'AT&T':
    'https://gateway.foresee.com/sites/att/production/trigger/sitelogo_m.png',
  유아이패스: 'https://static.inews24.com/v1/587cc1a4ebbe48.jpg',
  애플: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201812022340',
  테슬라:
    'https://mblogthumb-phinf.pstatic.net/20160720_1/ooc1001_1468993578490XkftQ_PNG/Screenshot_2016-07-20-12-15-12-1.png?type=w800',
  슐럼버거:
    'https://img.etoday.co.kr/pto_db/2015/03/20150326021310_609353_620_330.jpg',
  '소파이 테크놀로지':
    'https://t1.daumcdn.net/cfile/tistory/991EF9505DF97BA128',
  '루시드 그룹':
    'https://blog.kakaocdn.net/dn/bt0yq8/btrhH7HP6Dn/MfQCJy4LV1K4Jkl116Y57K/img.png',
  '필립스 66':
    'https://e7.pngegg.com/pngimages/1013/296/png-clipart-phillips-66-petroleum-lubricant-conocophillips-company-fortune-company-text.png',
  '파이오니어 내츄럴 리소스':
    'https://1.bp.blogspot.com/-Gk63ezMB5po/VJPbT42XuKI/AAAAAAAAlPw/bkcN7Nw09JE/s1600/Pioneer%2BLogo.png',
  AMD: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/1280px-AMD_logo_pre-2013.svg.png',
  ASML: 'https://e7.pngegg.com/pngimages/1011/178/png-clipart-logo-asml-holding-cymer-brand-product-holding-the-camera-blue-text.png',
  'AstraZeneca ADR':
    'https://totemtalk.com/wp-content/uploads/2020/07/AZN-logo.png',
  'Constellation Energy':
    'https://cdn.freelogovectors.net/wp-content/uploads/2018/05/constellation-logo.png',
  CSX: 'https://image.rocketpunch.com/company/9553/csx_logo.jpg?s=400x400&t=inside',
  KLA: 'https://img.etnews.com/photonews/1901/1151644_20190124151137_957_0001.jpg',
  달러트리:
    'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/ht/2021/11/30/A202111300347_1.jpg',
  넷이즈:
    'https://ww.namu.la/s/9b678f10daf238442b9cd848fe34a70857a38be9f83808ae78a95fb401f830cce584d4d19e6757e004dd5b4698049167361b960f8368339ec760e0806c77a38c250c6e889d26a678ee53c3e1552e5c84',
  넷플릭스:
    'https://cdnimage.dailian.co.kr/news/202107/news_1626825864_1013628_m_1.png',
  데이터도그:
    'https://d2uleea4buiacg.cloudfront.net/files/b48/b489e3a397cebd723e8424a86eb70f6e4fe4e11c8e92988050cb5667247a30fa.m.png',
  도큐사인:
    'https://cphoto.asiae.co.kr/listimglink/6/2020090612300264949_1599363002.png',
  램리서치:
    'https://ww.namu.la/s/1d9a02e3f7afd2d790aee252b4438054ad46091e4e584ce68534f22e1476b7ca4b39b7c0dcda866ff8b0c45c849968e06b4f050b34f1f99ef5fb9913060f83926608a1db6a39ba87638cbf507582c72d',
  루시드: 'https://autoimg.danawa.com/history/brand/612/logo.gif',
  룰루레몬:
    'https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjFfMjM0/MDAxNTYzNjk3MDg1NTY2.l8AZPYdQddZM-4WitvTuHFdDTTxlRxDgiIzI-TKxExEg.rTETB5U6tTBFzSu5_SOLprGcqg8VZ-7rU6F-G3Oekzsg.JPEG.auust/룰루레몬.jpg?type=w800',
  '마벨 테크놀러지':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Marvell_Logo.svg/1200px-Marvell_Logo.svg.png',
  '마이크로칩 테크':
    'https://pds.saramin.co.kr/company/logo/201902/26/pnhtf6_jq7l-0_logo.JPG',
  마이크로소프트: 'https://img.hankyung.com/photo/202111/01.27950322.1.jpg',
  '마이크론 테크놀로지':
    'https://blog.kakaocdn.net/dn/ccrIoU/btrrbUtOTkC/2TcbLty3y7kNDuzNWMA1pk/img.png',
  '매치 그룹':
    'https://blog.kakaocdn.net/dn/b3mJ97/btrcNnctseH/fKOPJqVcRhhsHN8m3fZ1rk/img.png',
  메르카도리브레: 'https://img.hankyung.com/photo/202005/01.23980027.1.png',
  메타: 'https://file.mk.co.kr/meet/yonhap/2021/10/29/image_readtop_2021_1024237_0_073011.jpg',
  모더나:
    'https://img.etoday.co.kr/pto_db/2020/05/20200518225955_1461463_419_267.jpg',
}

module.exports = {
  stocks,
  stockImageURL,
}
