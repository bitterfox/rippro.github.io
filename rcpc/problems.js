// [ID,  名前,  出展,  ポイント]
var problems = [

    ["","==== 基本問題 ====","",0],

    ["0000", "QQ","基本", 2],
    ["0007", "Debt Hell","基本", 2],
    ["0045", "Sum and Average","基本", 2],
    ["0093", "Leap Year","基本", 2],
    ["0003", "Is it a Right Triangle?", "基本", 2],
    ["0136", "Frequency Distribution of Height", "基本", 2],

    ["","==== STLの使い方 ====","",0],

    ["0001", "List of Top 3 Hills", "sort/stringの使い方", 3],
    ["0006", "Reverse Sequence", "stringの使い方", 3],
    ["0002", "Digit Number", "stringかmath.hの使い方", 3],
    ["0029", "English Sentence", "mapの使い方", 3],
    ["0130", "Train", "dequeの使い方", 3],
    ["1173", "The Balance of the World", "stackの使い方", 3],

    ["","==== 数学 ====","",0],

    ["0005", "GCD and LCM", "数学(GCD,LCM)", 3],
    ["0044", "Prime Number II", "数学(素数判定)", 3],

    ["","==== 探索 ====","",0],

    ["0003", "Is it a Right Triangle?", "探索", 3],
    ["1130", "Red and Black", "探索", 5],
    ["0067", "The Number of Island", "探索", 5],
    ["0122", "Summer of Phyonkichi", "探索", 6],
    ["0179", "Mysterious Worm", "探索", 8],
    ["0121", "Seven Puzzle", "探索", 10],

    ["","==== DP(動的計画法) ====","",0],

    ["0042", "A Thief", "DP(ナップサック問題)", 7],
    ["0057", "The Number of Area", "DP(数え上げ)", 4],
    ["0168", "Kannondou", "DP(数え上げ)",4],
    ["0098", "Maximum Sum Sequence II", "DP(部分長方形)", 5],
    ["0092", "Square Searching", "DP(部分長方形)",5],
    ["0191", "Baby Tree", "DP(最適解)",6],
    ["0557", "A First Grader", "DP(数え上げ)",6],
    ["0096", "Sum of 4 Integers II", "DP(数え上げ)",6],
    ["1056", "Ben Toh", "DP(確率)",6],
    ["2035", "It Prefokery Pio", "DP(最長共通部分列問題)", 8],
    ["2221", "KULASIS", "DP(工夫が必要なDP)", "10"],

    ["","==== グラフ ====","",0],

    ["0119", "Taro's Obsession", "グラフ(トポロジカルソート)", 6],
    ["0200", "Traveling Alone: One-way Ticket of Youth", "グラフ(最短経路)", 6],
    ["0180", "Stellar Performance of the Debunkey Family", "グラフ(最小全域木)", 6],
    ["0212", "Highway Express Bus", "グラフ(拡張グラフ)", 10],
    ["0086", "Patrol", "オイラー路,ケーニヒスベルクの橋", 6],
    ["0120", "Patisserie", "グラフ(トラベリングセールスマン問題, ビットDP)", 8],

    ["","==== 幾何 ====","",0],

    ["0079", "Area of Polygon", "幾何(負の面積かヘロンの公式)", 4],
    ["1132", "Circle and Points", "幾何(「ギリギリを攻める」の典型)", 6],

    ["","========= 文字列 =========", "", 0],

    ["1244", "Molecular Formula", "構文解析", 7],
    ["2444", "Substring", "ローリングハッシュ", 10],

    ["","==== その他 ====","",0],

    ["0027", "What day is today?", "その他(ツェラーの公式)", 3],
    ["0502", "Dice", "その他(サイコロ)", 3],

    ["","==== ICPC過去問 ====","",0],

    // AOJ-ICPC by ichyo
    ["1147", "ICPC 得点集計ソフトウェア", "国内予選2007A", 4],
    ["1153", "等しい合計点", "国内予選2008A", 4],
    ["1124", "When Can We Meet?", "国内予選2003A", 4],
    ["1125", "Get Many Persimmon Trees", "国内予選2003B", 4],
    ["1129", "Hanafuda Shuffle", "国内予選2004A", 4],
    ["1159", "次期町長", "国内予選2009A", 4],
    ["1179", "ミレニアム", "国内予選2012A", 4],
    ["2006", "Keitai Message", "模擬国内2005A", 4],
    ["2000", "Misterious Gems", "模擬国内2006A", 4],
    ["2018", "お姫様のギャンブル", "模擬国内2008A", 4],
    ["2149", "幸運の操作者", "模擬国内2009A", 4],
    ["2197", "連続する整数の和", "模擬国内2010A", 4],
    ["2252", "koukyoukoukokukikou", "模擬国内2011A", 4],
    ["2440", "Kagisys", "夏合宿2012:day3bA", 4],
    ["1135", "Ohga's Fortune", "国内予選2005A", 4],
    ["1142", "列車の編成パートII", "国内予選2006B", 6],
    ["2424", "かけざん", "夏合宿2012:day2A", 6],
    ["1240", "Unreliable Message", "アジア地区予選2003A", 6],
    ["2007", "Make Purse Light", "模擬国内2005B", 6],
    ["2019", "お姫様の嫁入り", "模擬国内2008B", 6],
    ["2012", "宇宙ヤシガニ", "模擬国内2007A", 6],
    ["2399", "君のプライバシーを守れ！", "模擬国内2012A", 6],
    ["1276", "Prime Gap", "アジア地区予選2007B", 6],
    ["1137", "Numeral System", "国内予選2005C", 6],
    ["1141", "ディリクレの算術級数定理", "国内予選2006A", 6],
    ["1160", "島はいくつある？", "国内予選2009B", 6],
    ["1165", "角角画伯，かく悩みき", "国内予選2010A", 6],
    ["1172", "チェビシェフの定理", "国内予選2011A", 6],
    ["2001", "Amida,  the City of Miracle", "模擬国内2006", 6],
    ["2150", "Matsuzaki 数", "模擬国内2006", 6],
    ["1180", "繰り返す10進数", "国内予選2012B", 6],
    ["2400", "審判は君だ！", "模擬国内2012B", 6],
    ["1232", "Calling Extraterrestrial Intelligence Again", "アジア地区予選2002A", 8],
    ["2013", "大崎", "模擬国内2007B", 8],
    ["1275", "And Then There Was One", "アジア地区予選2007A", 8],
    ["1285", "Grey Area", "アジア地区予選2008A", 8],
    ["1249", "Make a Sequence", "アジア地区予選2004B", 8],
    ["2155", "Infected Computer", "夏合宿2009:day2A", 8],
    ["2165", "Strange String Manipulation", "夏合宿2009:day3A", 8],
    ["2330", "雅先生の地球侵略日誌", "夏合宿2010:day2A", 8],
    ["2300", "Calender Colors", "夏合宿2011:day3A", 8],
    ["1241", "Lagrange's Four-Square Theorem", "アジア地区予選2003B", 8],
    ["1148", "ログイン/ログアウト記録の解析", "国内予選2007B", 8],
    ["1154", "月曜土曜素因数", "国内予選2008B", 8],
    ["1166", "迷図と命ず", "国内予選2010B", 8],
    ["2014", "土地囲い", "模擬国内2007C", 8],
    ["2198", "ムーンライト牧場", "模擬国内2010B", 8],
    ["2253", "ブレイブ・フォース・ストーリー", "模擬国内2011B", 8],
    ["2242", "Era Name", "模擬地区2010A", 8],
    ["1295", "Cubist Artwork", "アジア地区予選2009A", 10],
    ["2015", "スクウェア・ルート", "模擬国内2007D", 10],
    ["2386", "Sightseeing Tour", "冬合宿2010H", 10],
    ["1277", "Minimal Backgammon", "アジア地区予選2007C", 10],
    ["2340", "Carpenters' Language", "冬コンテスト2011A", 10],
    ["1286", "Expected Allowance", "アジア地区予選2008B", 10],
    ["1325", "Ginkgo Numbers", "アジア地区予選2012A", 10],
    ["2321", "Butterfly", "模擬地区2011B", 10],
    ["1316", "The Sorcerer's Donut", "アジア地区予選2011B", 10],
    ["1237", "Shredding Company", "アジア地区予選2002F", 10],
    ["2232", "Ennichi", "夏合宿2010:day3A", 10],
    ["2311", "お菓子の魔女", "夏合宿2011:day4B", 10],
    ["1250", "Leaky Cryptography", "アジア地区予選2004C", 10],
    ["1126", "The Secret Number", "国内予選2003C", 10],
    ["1136", "Polygonal Line Search", "国内予選2005B", 10],
    ["1167", "ポロック予想", "国内予選2010C", 10],
    ["2199", "差分パルス符号変調", "模擬国内2010C", 10],
    ["2254", "最短ルート", "模擬国内2011C", 10],
    ["2175", "Whist", "模擬地区2009A", 10],
    ["2243", "Step Step Evolution", "模擬地区2010B", 10],
    ["2369", "CatChecker", "冬合宿2010A", 12],
    ["1305", "Membership Management", "アジア地区予選2010A", 12],
    ["1144", "カーリング 2.0", "国内予選2006D", 12],
    ["1251", "Pathological Paths", "アジア地区予選2004D", 12],
    ["2002", "X-Ray Screening System", "模擬国内2006C", 12],
    ["1296", "Repeated Substitution with Sed", "アジア地区予選2009B", 12],
    ["1306", "Balloon Collecting", "アジア地区予選2010B", 12],
    ["1315", "Gift from the Goddess of Program...", "アジア地区予選2011A", 12],
    ["1326", "Stylish", "アジア地区予選2012B", 12],
    ["1327", "One-Dimensional Cellular Automaton", "アジア地区予選2012C", 12],
    ["2166", "Erratic Sleep Habits", "夏合宿2009:day3B", 12],
    ["1127", "Building a Space Station", "国内予選2003D", 12],
    ["1149", "ケーキカット", "国内予選2007C", 12],
    ["2011", "Gather the Maps", "模擬国内2005F", 12],
    ["1248", "The Balance", "アジア地区予選2004A", 12],
    ["2021", "お姫様の危機", "模擬国内2008D", 12],
    ["2301", "Sleeping Time", "夏合宿2011:day3B", 14],
    ["2383", "Rabbit Game Playing", "冬合宿2010E", 14],
    ["1280", "Slim Span", "アジア地区予選2007F", 14],
    ["2176", "For the Peace", "模擬地区2009B", 14],
    ["2320", "Infinity Maze", "模擬地区2011A", 14],
    ["2317", "委員長の魔女", "夏合宿2011:day4H", 14],
    ["2332", "時空のスゴロク・ロード", "夏合宿2010:day2C", 14],
    ["2241", "Usaneko Matrix", "夏合宿2010:day3J", 14],
    ["1155", "如何に汝を満足せしめむ？ いざ数え上げむ…", "国内予選2008C", 14],
    ["1174", "同色パネル結合", "国内予選2011C", 14],
    ["1181", "偏りのあるサイコロ", "国内予選2012C", 14],
    ["2299", "Tiles are Colorful", "夏合宿2011:day2J", 14],
    ["2003", "Railroad Conflict", "模擬国内2006D", 14],
    ["2005", "Water Pipe Construction", "模擬国内2006F", 14],
    ["2153", "鏡の洞窟", "模擬国内2009E", 14],
    ["2426", "宝探し", "夏合宿2012:day2C", 14],
    ["2401", "恒等式", "模擬国内2012C", 14],
    ["2178", "Futon", "模擬地区2009D", 14],
    ["2157", "Dial Lock", "夏合宿2009:day2C", 16],
    ["2233", "Carrot Tour", "夏合宿2010:day3B", 16],
    ["2298", "Starting Line", "夏合宿2011:day2I", 16],
    ["2442", "Convex-Cut", "夏合宿2012:day3bC", 16],
    ["1131", "Unit Fraction Partition", "国内予選2004C", 16],
    ["2152", "制限されたファイルシステム", "模擬国内2009D", 16],
    ["1156", "ちょろちょろロボット", "国内予選2008D", 16],
    ["1320", "City Merger", "アジア地区予選2011F", 16],
    ["1243", "Weather Forecast", "アジア地区予選2003D", 16],
    ["2302", "On or Off", "夏合宿2011:day3C", 16],
    ["2151", "勇敢なお姫様またも現る", "模擬国内2009C", 16],
    ["1175", "そして，いくつになった？", "国内予選2011D", 16],
    ["2022", "お姫様の暗号解読", "模擬国内2008E", 16],
    ["2161", "Defend the Bases", "夏合宿2009:day2G", 16],
    ["2156", "Magic Slayer", "夏合宿2009:day2B", 16],
    ["2169", "Colored Octahedra", "夏合宿2009:day3E", 16],
    ["2182", "Eleven Lover", "模擬地区2009H", 16],
    ["2303", "Marathon Match", "夏合宿2011:day3D", 16],
    ["1235", "Life Line", "アジア地区予選2002D", 16],
    ["2435", "Zero division checker", "夏合宿2012:day3aB", 16],
    ["1150", "崖登り", "国内予選2007D", 16],
    ["1245", "Gap", "アジア地区予選2003F", 16],
    ["1161", "覆面算", "国内予選2009C", 16],
    ["2177", "Champernowne Constant", "模擬地区2009C", 16],
    ["2170", "Marked Ancestor", "夏合宿2009:day3F", 18],
    ["2297", "Rectangular Stamps", "夏合宿2011:day2H", 18],
    ["1287", "Stopped Watches", "アジア地区予選2008C", 18],
    ["2382", "King Slime", "冬合宿2010D", 18],
    ["2342", "Light Road", "冬コンテスト2011C", 16],
    ["1236", "Map of Ninja House", "アジア地区予選2002E", 18],
    ["2441", "FizzBuzz", "夏合宿2012:day3bB", 18],
    ["2425", "全探索お姉さんの休日", "夏合宿2012:day2B", 18],
    ["1157", "大玉転がし", "国内予選2008E", 18],
    ["1140", "Cleaning Robot", "国内予選2005F", 18],
    ["2447", "A Two Floors Dungeon", "夏合宿2012:day4A", 18],
    ["1246", "Concert Hall Scheduling", "アジア地区予選2003G", 18],
    ["1318", "Long Distance Taxi", "アジア地区予選2011D", 18],
    ["1297", "Swimming Jam", "アジア地区予選2009C", 18],
    ["1328", "Find the Outlier", "アジア地区予選2012D", 18],
    ["1331", "Let There Be Light", "アジア地区予選2012G", 18],
    ["2160", "Voronoi Island", "夏合宿2009:day2F", 18],
    ["2223", "Kaeru Jump", "夏合宿2010:day4B", 18],
    ["2438", "YAML", "夏合宿2012:day3aE", 18],
    ["2304", "Reverse Roads", "夏合宿2011:day3E", 18],
    ["1138", "Traveling by Stagecoach", "国内予選2005D", 18],
    ["1253", "Dice Puzzle", "アジア地区予選2004F", 18],
    ["1176", "輪番停電計画", "国内予選2011E", 18],
    ["1162", "離散的速度", "国内予選2009D", 18],
    ["2255", "6÷2(1+2)", "模擬国内2011D", 18],
    ["1168", "ぐらぐら", "国内予選2010D", 18],
    ["1254", "Color the Map", "アジア地区予選2004G", 18],
    ["2009", "Area Separation", "模擬国内2005D", 18],
    ["2249", "Road Construction", "模擬地区2010H", 18],
    ["2322", "Chinese Classics", "模擬地区2011C", 18],
    ["2008", "Dragon Fantasy", "模擬国内2005C", 18],
    ["2306", "Rabbit Party", "夏合宿2011:day3G", 20],
    ["2200", "Mr. リトー郵便局", "模擬国内2010D", 20],
    ["2222", "Alien's Counting", "夏合宿2010:day4A", 20],
    ["2333", "僕の友達は小さい", "夏合宿2010:day2D", 20],
    ["1283", "Most Distant Point from the Sea", "アジア地区予選2007I", 20],
    ["1330", "Never Wait for Weights", "アジア地区予選2012F", 20],
    ["1309", "The Two Men of the Japanese Alps", "アジア地区予選2010E", 20],
    ["2244", "Dungeon Quest II", "模擬地区2010C", 20],
    ["2326", "Number Sorting", "模擬地区2011G", 20],
    ["1145", "全宇宙生命ゲノムデータベース", "国内予選2006E", 20],
    ["2437", "DNA", "夏合宿2012:day3aD", 20],
    ["1311", "Test Case Tweaking", "アジア地区予選2010G", 20],
    ["1289", "Spherical Mirrors", "アジア地区予選2008E", 20],
    ["1302", "Twenty Questions", "アジア地区予選2009H", 20],
    ["1304", "Infected Land", "アジア地区予選2009J", 20],
    ["2334", "街を駆ける道", "夏合宿2010:day2E", 20],
    ["2237", "The Castle", "夏合宿2010:day3F", 20],
    ["2225", "Dungeon Wall", "夏合宿2010:day4D", 20],
    ["2295", "Power of Power", "夏合宿2011:day2F", 20],
    ["2305", "Beautiful Currency", "夏合宿2011:day3F", 20],
    ["1163", "カードゲーム", "国内予選2009E", 20],
    ["1182", "鉄道乗り継ぎ", "国内予選2012D", 20],
    ["2371", "TransferTrain", "冬合宿2010C", 20],
    ["2402", "天の川", "模擬国内2012D", 20],
    ["2245", "Dice Room", "模擬地区2010D", 20],
    ["2247", "Two-Wheel Buggy", "模擬地区2010F", 20],
    ["1312", "Where's Wally", "アジア地区予選2010H", 20],
    ["2224", "Save your cat", "夏合宿2010:day4C", 22],
    ["1291", "Search of Concatenated Strings", "アジア地区予選2008G", 22],
    ["2310", "薔薇園の魔女", "夏合宿2011:day4A", 22],
    ["1288", "Digits on the Floor", "アジア地区予選2008D", 22],
    ["2163", "Tatami", "夏合宿2009:day2I", 22],
    ["2236", "Rabbit Plays Games!", "夏合宿2010:day3E", 22],
    ["2296", "Quest of Merchant", "夏合宿2011:day2G", 22],
    ["1183", "鎖中経路", "国内予選2012E", 22],
    ["1310", "Find the Multiples", "アジア地区予選2010F", 22],
    ["2439", "箱根駅伝", "夏合宿2012:day3aF", 22],
    ["2180", "Water Tank", "模擬地区2009F", 22],
    ["1133", "Water Tank", "国内予選2004E", 22],
    ["1242", "Area of Polygons", "アジア地区予選2003C", 22],
    ["1233", "Equals are Equals", "アジア地区予選2002B", 22],
    ["2403", "敵の敵は味方", "模擬国内2012E", 22],
    ["2201", "不死の宝石", "模擬国内2010E", 22],
    ["1282", "Bug Hunt", "アジア地区予選2007H", 22],
    ["1298", "Separate Points", "アジア地区予選2009D", 22],
    ["1308", "Awkward Lights", "アジア地区予選2010D", 22],
    ["2449", "Connect", "夏合宿2012:day4C", 22],
    ["2167", "Find the Point", "夏合宿2009:day3C", 22],
    ["2294", "Entangled with Lottery", "夏合宿2011:day2E", 22],
    ["2312", "魔法少女さやかちゃん", "夏合宿2011:day4C", 22],
    ["2428", "失われし数", "夏合宿2012:day2E", 22],
    ["2429", "まるかいて", "夏合宿2012:day2F", 22],
    ["2431", "引越し", "夏合宿2012:day2H", 22],
    ["2020", "お姫様の日本語", "模擬国内2008C", 22],
    ["2434", "Audition", "夏合宿2012:day3aA", 22],
    ["1128", "Square Carpets", "国内予選2003E", 22],
    ["2162", "Galaxy Wide Web Service", "夏合宿2009:day2H", 22],
    ["1134", "Name the Crossing", "国内予選2004F", 22],
    ["1290", "Traveling Cube", "アジア地区予選2008F", 22],
    ["2380", "Bubble Puzzle", "冬合宿2010B", 22],
    ["2181", "Neko's Treasure", "模擬地区2009G", 22],
    ["2325", "Mysterious Maze", "模擬地区2011F", 22],
    ["2328", "Mobile Network", "模擬地区2011I", 22],
    ["2256", "ケーキ分割問題", "模擬国内2011E", 24],
    ["1333", "Beautiful Spacing", "アジア地区予選2012I", 24],
    ["2343", "Matrix Operation", "冬コンテスト2011D", 24],
    ["2168", "Luigi’s Tavern", "夏合宿2009:day3D", 24],
    ["2397", "Three-way Branch", "春コンテスト2012I", 24],
    ["1329", "Sliding Block Puzzle", "アジア地区予選2012E", 24],
    ["2318", "舞台装置の魔女", "夏合宿2011:day4I", 24],
    ["2346", "Runaway Domino", "冬コンテスト2011G", 24],
    ["2251", "Merry Christmas", "模擬地区2010J", 24],
    ["2372", "IkaNumber", "冬合宿2010D", 24],
    ["2335", "１０歳の動的計画", "夏合宿2010:day2F", 24],
    ["2336", "スプリング・タイル", "夏合宿2010:day2G", 24],
    ["1252", "Confusing Login Names", "アジア地区予選2004E", 24],
    ["1301", "Malfatti Circles", "アジア地区予選2009G", 24],
    ["2293", "Dangerous Tower", "夏合宿2011:day2D", 24],
    ["2370", "RabbitWalking", "冬合宿2010B", 24],
    ["1319", "Driving an Icosahedral Rover", "アジア地区予選2011E", 24],
    ["2159", "Symmetry", "夏合宿2009:day2E", 24],
    ["2171", "Strange Couple", "夏合宿2009:day3G", 24],
    ["2348", "Testing Circuits", "冬コンテスト2011I", 24],
    ["2436", "Card", "夏合宿2012:day3aC", 24],
    ["2229", "Ropeway", "夏合宿2010:day4H", 24],
    ["2313", "ハコの魔女", "夏合宿2011:day4D", 24],
    ["2443", "Reverse Sort", "夏合宿2012:day3bD", 24],
    ["2446", "Enumeration", "夏合宿2012:day3bG", 24],
    ["2173", "Wind Passages", "夏合宿2009:day3I", 26],
    ["2376", "DisconnectedGame", "冬合宿2010H", 26],
    ["1169", "最強の呪文", "国内予選2010E", 26],
    ["2202", "閘門式運河: 上下に動く水面", "模擬国内2010F", 26],
    ["1238", "True Liars", "アジア地区予選2002G", 26],
    ["1324", "Round Trip", "アジア地区予選2011J", 26],
    ["2345", "Network Reliability", "冬コンテスト2011F", 26],
    ["2257", "桜詩 ～願はくは花の下にて春死なむ～", "模擬国内2011F", 26],
    ["2315", "影の魔女", "夏合宿2011:day4F", 26],
    ["2432", "Sports Days 2.0", "夏合宿2012:day2I", 26],
    ["2374", "RabbitLunch", "冬合宿2010F", 26],
    ["1279", "Geometric Map", "アジア地区予選2007E", 26],
    ["2344", "Multi Ending Story", "冬コンテスト2011E", 24],
    ["2309", "Vector Compression", "夏合宿2011:day3J", 26],
    ["1281", "The Morning after Halloween", "アジア地区予選2007G", 26],
    ["1317", "Weaker than Planned", "アジア地区予選2011C", 26],
    ["2164", "Revenge of the Round Table", "夏合宿2009:day2J", 26],
    ["2379", "Bicube", "冬合宿2010A", 26],
    ["1255", "Inherit the Spheres", "アジア地区予選2004H", 26],
    ["2385", "Shelter", "冬合宿2010G", 26],
    ["2017", "からくり人形", "模擬国内2007F", 28],
    ["2235", "Graph Construction", "夏合宿2010:day3D", 28],
    ["2239", "Nearest Station", "夏合宿2010:day3H", 28],
    ["2179", "Safe Area", "模擬地区2009E", 28],
    ["1143", "六角沼の六角大蛇", "国内予選2006C", 28],
    ["2250", "Operator", "模擬地区2010I", 28],
    ["2373", "HullMarathon", "冬合宿2010E", 28],
    ["1152", "部陪博士，あるいは，われわれはいかにして左右非対称になったか", "国内予選2007F", 28],
    ["2323", "Revenge of Champernowne Constant", "模擬地区2011D", 28],
    ["1313", "Intersection of Two Prisms", "アジア地区予選2010I", 30],
    ["2427", "ほそながいところ", "夏合宿2012:day2D", 30],
    ["2448", "Area Folding", "夏合宿2012:day4B", 30],
    ["1307", "Towns along a Highway", "アジア地区予選2010C", 30],
    ["2430", "最長増加列問題", "夏合宿2012:day2G", 30],
    ["1323", "Encircling Circles", "アジア地区予選2011I", 30],
    ["1139", "Earth Observation with a Mobile Robot Team", "国内予選2005E", 30],
    ["1293", "Common Polynomial", "アジア地区予選2008I", 30],
    ["1158", "ICPC: チョコレートの知的合同分割", "国内予選2008F", 30],
    ["2316", "人魚の魔女", "夏合宿2011:day4G", 30],
    ["2308", "White Bird", "夏合宿2011:day3I", 32],
    ["1314", "Matrix Calculator", "アジア地区予選2010J", 32],
    ["1300", "Chemist's Math", "アジア地区予選2009F", 32],
    ["1322", "ASCII Expression", "アジア地区予選2011H", 32],
    ["2393", "Dungeon Creation", "春コンテスト2012E", 32],
    ["2172", "Queen’s Case", "夏合宿2009:day3H", 32],
    ["2234", "Usagitobi", "夏合宿2010:day3C", 32],
    ["2290", "Attack the Moles", "夏合宿2011:day2A", 32],
    ["1171", "レーザー光の反射", "国内予選2010G", 32],
    ["2327", "Sky Jump", "模擬地区2011H", 36],
    ["2291", "Brilliant Stars", "夏合宿2011:day2B", 36],
    ["2341", "Kth Sentence", "冬コンテスト2011B", 36],
    ["2314", "落書きの魔女", "夏合宿2011:day4E", 36],
    ["1294", "Zigzag", "アジア地区予選2008J", 36],
    ["1321", "Captain Q's Treasure", "アジア地区予選2011G", 36],
    ["2023", "お姫様は戦略家", "模擬国内2008F", 36],
    ["1178", "壊れたドア", "国内予選2011G", 36],
    ["1284", "The Teacher's Side of Math", "アジア地区予選2007J", 36],
    ["2455", "Sun and Moon", "夏合宿2012:day4I", 36],
    ["2405", "姉妹港", "模擬国内2012G", 40],
    ["2404", "ドッグフード", "模擬国内2012F", 40],
    ["2337", "ねこ鍋改造計画（仮）", "夏合宿2010:day2H", 40],
    ["2307", "Palindrome Generator", "夏合宿2011:day3H", 40],
    ["2226", "Psychic Accelerator", "夏合宿2010:day4E", 40],
    ["1146", "影の秘密", "国内予選2006F", 40],
    ["1332", "Company Organization", "アジア地区予選2012H", 40],
    ["1184", "一般化ポーカー", "国内予選2012F", 40],
    ["2375", "CarrotBreeding", "冬合宿2010G", 40],
    ["2183", "Crystal Jails", "模擬地区2009I", 40],
    ["2240", "Lapin Noir", "夏合宿2010:day3I", 40],
    ["2228", "DON'T PANIC!", "夏合宿2010:day4G", 40],
    ["1256", "Crossing Prisms", "アジア地区予選2004I", 40],
    ["1185", "ACM洋菓子店", "国内予選2012G", 44],
    ["2453", "Presentation", "夏合宿2012:day4G", 44],
    ["2230", "How to Create a Good Game", "夏合宿2010:day4I", 44],
    ["2248", "Camera Control", "模擬地区2010G", 44],
    ["1303", "Hobby on Rails", "アジア地区予選2009I", 44],
    ["1278", "Lowest Pyramid", "アジア地区予選2007D", 44],
    ["1170", "古い記憶", "国内予選2010F", 44],
    ["2203", "魔法島物語2", "模擬国内2010G", 44],
    ["2158", "Double Sorting", "夏合宿2009:day2D", 44],
    ["2154", "海岸線の浸食", "模擬国内2009F", 44],
    ["1292", "Top Spinning", "アジア地区予選2008H", 44],
    ["2384", "Rabbit Jumping", "冬合宿2010F", 44],
    ["2016", "プールの監視員", "模擬国内2007E", 44],
    ["2347", "Sunny Graph", "冬コンテスト2011H", 44],
    ["1164", "締まっていこう", "国内予選2009F", 44],
    ["2338", "よくわかる二重魔法", "夏合宿2010:day2I", 44],
    ["2377", "ThreeRooks", "冬合宿2010I", 44],
    ["1151", "くるくる", "国内予選2007E", 44],
    ["1177", "番犬派遣会社", "国内予選2011F", 44],
    ["1334", "Cubic Colonies", "アジア地区予選2012J", 44],
    ["2339", "問題文担当者は働かない！", "夏合宿2010:day2J", 44],
    ["2433", "最終防衛線", "夏合宿2012:day2J", 44],
    ["2231", "Cruel Bingo", "夏合宿2010:day4J", 48],
    ["2319", "ソウルジェムゲーム", "夏合宿2011:day4J", 48],
    ["2378", "SolveMe", "冬合宿2010J", 48],
    ["2227", "Bouldering", "夏合宿2010:day4F", 48],
    ["2246", "Alice and Bomb", "模擬地区2010E", 48],
    ["1299", "Origami Through-Hole", "アジア地区予選2009E", 48],
    ["2258", "全自動円形掃除機", "模擬国内2011G", 48],
    ["2387", "Tampopo Machine", "冬合宿2010I", 48],
    ["2174", "Secret Operation", "夏合宿2009:day3J", 48],
    ["2238", "Nurie", "夏合宿2010:day3G", 48],
    ["2184", "Cave Explorer", "模擬地区2009J", 48]
];
