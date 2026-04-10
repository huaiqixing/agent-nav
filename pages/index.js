import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { platforms, categories, pricingOptions, difficultyOptions } from '../data/platforms'

function getPricingTag(pricing) {
  if (pricing === '免费') return 'tag-free'
  if (pricing === '付费') return 'tag-paid'
  return 'tag-freemium'
}

function getTagClass(tag) {
  const map = {
    '免费': 'tag-free',
    '免费/付费': 'tag-freemium',
    '付费': 'tag-paid',
    '国内': 'tag-domestic',
    '海外': 'tag-overseas',
    '开源': 'tag-open',
  }
  return map[tag] || 'bg-gray-100 text-gray-600'
}

function PlatformCard({ platform, index }) {
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* 渐变边框效果 */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-vibrant-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 blur-sm`}></div>

      <Link href={`/platform/${platform.id}`} className="relative block h-full">
        <div className="relative bg-white rounded-2xl p-6 h-full shadow-sm group-hover:shadow-2xl transition-all duration-300">
          {/* Logo 区域 - 不规则设计 */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg transition-shadow"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              {platform.logo && !imgError ? (
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-full h-full object-contain p-2"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-br from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {platform.name.charAt(0)}
                </span>
              )}

              {/* 悬停时的发光效果 */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-20 transition-opacity`}></div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {platform.name}
              </h3>
              <p className="text-sm text-gray-500">{platform.nameEn}</p>
            </div>

            {/* 动态标签 */}
            <motion.span
              className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                platform.pricing === '免费'
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                  : platform.pricing === '付费'
                  ? 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
              } shadow-md`}
              whileHover={{ scale: 1.1 }}
            >
              {platform.pricing}
            </motion.span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {platform.description}
          </p>

          {/* 标签区域 - 横向滚动 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {platform.tags.slice(0, 3).map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                  tag === '免费' ? 'bg-green-50 text-green-700 border border-green-200' :
                  tag === '开源' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                  tag === '国内' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                  tag === '海外' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
            {platform.tags.length > 3 && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-500">
                +{platform.tags.length - 3}
              </span>
            )}
          </div>

          {/* 底部信息栏 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                platform.difficulty === '低' ? 'bg-green-100 text-green-700' :
                platform.difficulty === '中' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {platform.difficulty}难度
              </span>
              {platform.guides && platform.guides.length > 0 && (
                <motion.span
                  className="flex items-center gap-1 text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md border border-primary-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>📚</span>
                  <span>{platform.guides.length} 指南</span>
                </motion.span>
              )}
            </div>

            <motion.div
              className="flex items-center gap-1 text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              查看详情
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FilterBar({
  activeCategory,
  setActiveCategory,
  activePricing,
  setActivePricing,
  activeDifficulty,
  setActiveDifficulty,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50 mb-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 搜索框 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索平台、框架..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-gray-800 placeholder-gray-400"
          />
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            animate={{ scale: searchQuery ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 筛选器 - 横向滚动设计 */}
      <div className="space-y-4">
        {/* 分类筛选 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              分类
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-primary rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat.name}
                  <span className={`px-1.5 py-0.5 rounded-md text-xs ${
                    activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 收费筛选 */}
        <div>
          <span className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-500"></span>
            收费模式
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {pricingOptions.map(opt => (
              <motion.button
                key={opt}
                onClick={() => setActivePricing(opt)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activePricing === opt
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activePricing === opt && (
                  <motion.div
                    layoutId="activePricing"
                    className="absolute inset-0 bg-gradient-accent rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{opt}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 难度筛选 */}
        <div>
          <span className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-vibrant-500"></span>
            难度等级
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {difficultyOptions.map(opt => (
              <motion.button
                key={opt}
                onClick={() => setActiveDifficulty(opt)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeDifficulty === opt
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeDifficulty === opt && (
                  <motion.div
                    layoutId="activeDifficulty"
                    className="absolute inset-0 bg-gradient-vibrant rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{opt}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePricing, setActivePricing] = useState('全部')
  const [activeDifficulty, setActiveDifficulty] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPlatforms = useMemo(() => {
    return platforms.filter(p => {
      // 分类筛选
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      // 收费筛选
      if (activePricing !== '全部' && p.pricing !== activePricing) return false
      // 难度筛选
      if (activeDifficulty !== '全部' && p.difficulty !== activeDifficulty) return false
      // 搜索
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && 
            !p.nameEn.toLowerCase().includes(q) &&
            !p.description.toLowerCase().includes(q)) {
          return false
        }
      }
      return true
    })
  }, [activeCategory, activePricing, activeDifficulty, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI Agent 平台导航 - 发现最优质的 AI Agent 开发工具</title>
        <meta name="description" content="收录国内外主流 AI Agent 平台、框架 and 工具，帮你快速找到适合的 AI Agent 开发方案" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header - Hero Section */}
      <motion.header
        className="relative overflow-hidden flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 动态背景层 */}
        <div className="absolute inset-0 animated-gradient opacity-90"></div>

        {/* 装饰性元素 */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-vibrant-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>

        {/* 内容层 */}
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-white text-sm font-medium">收录 {platforms.length}+ 优质平台</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI Agent
              <span className="block bg-gradient-to-r from-white via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                平台导航
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              发现最优质的 AI Agent 开发工具，助力你的创意实现
            </p>

            {/* 快速搜索 */}
            <motion.div
              className="max-w-xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索你感兴趣的平台..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white/50 outline-none shadow-2xl text-gray-800 placeholder-gray-400 text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-gradient-primary text-white shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* 快速导航标签 */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['热门推荐', '免费工具', '开源框架', '低代码平台'].map((tag, idx) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-all"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 底部波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 text-gray-50" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activePricing={activePricing}
          setActivePricing={setActivePricing}
          activeDifficulty={activeDifficulty}
          setActiveDifficulty={setActiveDifficulty}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 结果统计 */}
        <div className="mb-4 text-sm text-gray-500">
          找到 {filteredPlatforms.length} 个结果
        </div>

        {/* 卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPlatforms.map((platform, index) => (
              <PlatformCard key={platform.id} platform={platform} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredPlatforms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">没有找到匹配的平台</p>
            <p className="text-gray-400 text-sm mt-1">试试调整筛选条件</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-400">
            <p>AI Agent 平台导航 · 整理更新于 2026-03</p>
            <p className="mt-1">如果你有推荐的工具，欢迎提交</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
