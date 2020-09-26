
// route path
export const ROUTE_PATH = {
  HOME: '/',
  USER: '/user',
  SETTING: '/setting',
  CART: '/cart',
  LOCATION: '/location',

  COMMENT: '/comment',
  COMMENT_LIST: '/comment/:id',

  HOME_NEWS: '/home/news',
  HOME_NEWS_ID: '/home/news/:id',

  HOME_PHOTOES: '/home/photoes',
  HOME_PHOTOE_ID: '/home/photo/:id',

  HOME_GODDS: '/home/goods',
  HOME_GODDS_ID: '/home/goods/:id',

  HOME_MOVIES: '/home/movies'
}

// tabBar 导航
export const tabBarElements = [
  {
    name: "首页",
    routePath: ROUTE_PATH.HOME,
    icon: home,
    activeIcon: home_fill,
  },
  {
    name: "位置",
    routePath: ROUTE_PATH.LOCATION,
    icon: address,
    activeIcon: address_fill,
  },
  {
    name: "购物袋",
    routePath: ROUTE_PATH.CART,
    icon: cart,
    activeIcon: cart_fill,
    ball: true,
  },
  {
    name: "我的",
    imgName: "member",
    routePath: ROUTE_PATH.USER,
    icon: user,
    activeIcon: user_fill,
  },
];

// 首页菜单
export const menus = [
  {
    name: "今日要闻",
    routePath: ROUTE_PATH.HOME_NEWS,
    imgName: menu1
  },
  {
    name: "购物/美食",
    routePath: ROUTE_PATH.HOME_GODDS,
    imgName: menu2
  },
  {
    name: "旅游/分享",
    routePath: ROUTE_PATH.HOME_PHOTOES,
    imgName: menu3,
  },
  {
    name: "番剧/电影",
    routePath: ROUTE_PATH.HOME_MOVIES,
    imgName: menu4
  },
  {
    name: "Let's talk",
    routePath: "#",
    imgName: menu5,
  },
  {
    name: "雷锋日记",
    routePath: "#",
    imgName: menu6,
  }
];



// 是按转换
export const transformTime = (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => moment(dataStr).format(pattern);

// 随即姓名生成器
export const getRandomName = () => {
  const firstname = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭"];
  const lastName = ["建华", "小明", "小红", "有为", "建刚", "小刚", "建国", "文革", '援朝', '国庆', '国富', '梅', '强', '琴琴', '红雷', '德华', '悟空'];
  var str1 = firstname[Math.floor(Math.random() * (firstname.length))];
  var str2 = lastName[Math.floor(Math.random() * (lastName.length))];
  return `${str1} ${str2}`;
}
