# Data Visualization Gallery · 数据可视化案例集合

基于 **HTML、CSS 和 JavaScript** 的响应式交互图表案例库。每个案例独立存放，可本地预览，也可以使用 GitHub Pages 发布。仓库用于展示与复用可视化方案，**不是**实时数据后台或完整 BI 系统。

## 在线与本地预览

- 仓库根目录 `index.html`：所有已收录案例的入口
- `seo-keywords/index.html`：SEO 关键词案例入口，包含两个矩形树图页面
- `seo-keywords/decking.html`：Composite Decking，Top 100 关键词
- `seo-keywords/cladding.html`：Composite Cladding，Top 100 关键词
- `country-distribution/index.html`：国家 / 地区联系记录分布 Treemap
- `gdp-ranking/index.html`：2024 全球 GDP Top 100 Treemap

**本地使用：** 下载或克隆仓库，直接双击根目录 `index.html`。当前案例使用本地 JS 数据文件，无需安装依赖或启动服务。**线上使用：** 在 GitHub Pages 中选择仓库部署源，入口即根目录 `index.html`。

## 已收录案例

| 案例 | 图表类型 | 数据与交互 |
| --- | --- | --- |
| SEO 关键词搜索量 | Treemap（矩形树图） | Decking / Cladding 两组独立页面；Top 100；关键词搜索、悬停详情、点击复制（受浏览器权限限制） |
| 国家 / 地区联系记录分布 | Treemap（矩形树图） | Top 100 国家 / 地区；联系记录数量与占比；中英文搜索、悬停详情和点击复制 |
| 全球 GDP Top 100 | Treemap（矩形树图） | 2024 年名义 GDP；中文名称、排名及占比；中英文搜索和悬停详情 |

> 后续可以增加询盘统计、网站流量等独立案例，但未完成的功能不作为当前仓库能力。

## 目录结构

```text
data-visualization-gallery/
├── index.html                   # 全站案例目录
├── assets/gallery.css           # 案例目录页样式
├── seo-keywords/                # SEO 关键词独立案例
│   ├── index.html               # 两个关键词数据集的入口
│   ├── decking.html
│   ├── cladding.html
│   ├── css/style.css
│   ├── js/app.js
│   └── data/
│       ├── decking.js
│       ├── cladding.js
│       ├── decking.json
│       └── cladding.json
├── country-distribution/         # 国家 / 地区联系记录分布
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   └── data/
│       ├── countries.js         # 本地打开 HTML 使用
│       └── countries.json       # 可复用的纯数据副本
├── gdp-ranking/                 # 2024 名义 GDP
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   └── data/
│       ├── gdp.js
│       └── gdp.json
└── README.md
```

每个案例维护自己的 HTML、CSS、JavaScript 与数据，不强行抽象跨案例组件；根目录仅保存案例索引。这样新增、移除或维护某个案例不会影响其他案例。

## SEO 关键词案例说明

- 数据源：`Composite-Decking_all-keywords_us_2026-11-06.xlsx` 与 `Composite-Cladding_all-keywords_us_2026-11-06.xlsx`，美国市场，导出于 **2026-11-06**。
- 只提取 `Keyword`（关键词）与 `Volume`（月搜索量）；移除空词及零搜索量记录；关键词不区分大小写去重，相同词保留最高搜索量；降序取 Top 100，搜索量相同时按字母排序。
- Decking 的 Top 100 月搜索量合计 **650,400**；Cladding 合计 **96,220**。这是各关键词估计月搜索量的算术和，**不代表网站自然搜索流量或独立搜索人数**。
- Treemap 矩形面积与当前显示关键词的月搜索量成比例；搜索筛选后会重新分配面积，不能用筛选前后的视觉面积作绝对比较。
- 原始关键词保留品牌词及可能不相关的词，**尚未做语义相关性清洗**。颜色用于区分矩形，不表示难度、增长或评级。
- 支持鼠标悬停、键盘焦点查看完整值；点击尝试复制关键词。浏览器在 `file://` 环境可能不提供剪贴板权限，届时页面仅显示关键词供手动复制。

`data/*.js` 用于支持本地双击打开，`data/*.json` 作为结构化数据副本。**更新数据时必须同步生成同名 JS 和 JSON**，否则会出现两套数据不一致。原始 Excel 未包含在此仓库包中。


## 国家 / 地区联系记录分布案例说明

- 统计范围：共 **6,017** 条联系记录，其中 **6,016** 条具有国家或地区字段；Top 100 国家 / 地区合计 **5,889** 条，占已标注国家记录的 **97.89%**。
- 按记录行数汇总，**未按联系人身份去重**；联系记录数量不等于已核实的有效询盘数量。
- 矩形面积与国家 / 地区的联系记录数成比例；悬停显示中文名称、英文名称、数量和占比，支持中英文搜索。
- 公开数据仅包含国家 / 地区名称、记录数及占比等汇总信息，不包含客户邮箱、姓名、城市或沟通内容。
- `countries.js` 用于支持本地双击打开；`countries.json` 作为结构化数据副本。两者更新时必须同步。

## 2024 全球 GDP Top 100 案例说明

- 数据：世界银行 World Development Indicators，指标 `NY.GDP.MKTP.CD`（GDP, current US$），**2024 年名义 GDP，现价美元**，并非购买力平价（PPP）或人均 GDP。
- 按 GDP 降序展示 100 个国家与经济体，包括世界银行单列的部分地区经济体，因此不等于 100 个主权国家。GDP 显示单位会在“万亿美元”和“亿美元”之间自动切换。
- 数据取自 [2024 年 GDP 排名 CSV](https://github.com/nationdata-org/world-gdp/blob/main/data/world/world-gdp-ranking-2024.csv)（World Bank WDI 整理数据），已与[世界银行官方 2024 排名](https://datacatalogfiles.worldbank.org/ddh-published/0038130/DR0046441/GDP.pdf)核对头部数据。数据后续可能修订；本页面为固定的 2024 年快照。
- 矩形面积按名义 GDP 绘制；悬停显示中英文名称、GDP、排名、占 Top 100 GDP 合计的百分比。该百分比不是全球 GDP 份额。小矩形可通过悬停获取详细信息。
- 数据许可：**CC BY 4.0**。使用时保留世界银行的数据归属说明。
- `gdp.js` 负责支持直接双击本地 HTML；`gdp.json` 为结构化副本，两者更新时需要同步。

## 增加一个新案例

1. 新建目录（例如 `inquiry-analytics/`），独立存放 HTML、CSS、JS 和经过审核的数据。
2. 在仓库根目录 `index.html` 的 `.cases` 区域增加一个链接卡片，指向新案例入口。
3. 检查相对路径、移动端显示、悬停/键盘交互及浏览器控制台，再更新本 README 的案例清单。
4. 真实询盘等业务数据需要先脱敏或汇总，**不要将客户姓名、邮箱、电话、询盘正文或其他敏感数据提交到公开仓库**。

## 维护原则

- **一个案例，一个目录**；优先可维护、可复制的静态项目，不因未来可能的功能提前引入框架或数据库。
- **真实数据与演示数据明确区分**，在页面或 README 记录来源、市场、统计口径与日期；不把关键词搜索量写成网站流量。
- 只提交可公开的数据；实际站点域名、客户信息及访问凭据应在发布前检查。
- 新案例先独立验证，再加入首页目录；旧案例无需随着新案例反复重构。

## 技术

原生 HTML / CSS / JavaScript，无需 NPM 和第三方 CDN。当前 Treemap 使用项目本地 JS 实现矩形布局；后续案例可根据需要独立选择其他图表方案。