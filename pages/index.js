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

function PlatformCard({ platform }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/platform/${platform.id}`} className="card hover:shadow-lg transition-shadow block h-full">
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-indigo-100 text-indigo-600 font-bold text-xl">
            {platform.logo && !imgError ? (
              <img 
                src={platform.logo} 
                alt={platform.name}
                className="w-full h-full object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <span>{platform.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
            <p className="text-xs text-gray-500">{platform.nameEn}</p>
          </div>
          <span className={`tag ${getPricingTag(platform.pricing)}`}>{platform.pricing}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{platform.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {platform.tags.map(tag => (
            <span key={tag} className={`tag ${getTagClass(tag)}`}>{tag}</span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${
              platform.difficulty === '低' ? 'difficulty-low' :
              platform.difficulty === '中' ? 'difficulty-medium' : 'difficulty-high'
            }`}>
              难度：{platform.difficulty}
            </span>
            {platform.guides && platform.guides.length > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-100">
                📚 {platform.guides.length} 指南
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-indigo-600">
            查看详情 →
          </span>
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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
      {/* 搜索框 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索平台、框架..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
      </div>
      
      {/* 筛选器 */}
      <div className="flex flex-wrap gap-4">
        {/* 分类 */}
        <div>
          <span className="text-xs text-gray-500 block mb-1.5">分类</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors relative ${
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-indigo-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.name} ({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 收费 */}
        <div>
          <span className="text-xs text-gray-500 block mb-1.5">收费</span>
          <div className="flex flex-wrap gap-1.5">
            {pricingOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setActivePricing(opt)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors relative ${
                  activePricing === opt
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {activePricing === opt && (
                  <motion.div
                    layoutId="activePricing"
                    className="absolute inset-0 bg-indigo-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{opt}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 难度 */}
        <div>
          <span className="text-xs text-gray-500 block mb-1.5">难度</span>
          <div className="flex flex-wrap gap-1.5">
            {difficultyOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setActiveDifficulty(opt)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors relative ${
                  activeDifficulty === opt
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {activeDifficulty === opt && (
                  <motion.div
                    layoutId="activeDifficulty"
                    className="absolute inset-0 bg-indigo-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
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

      {/* Header */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🤖 AI Agent 平台导航</h1>
              <p className="text-sm text-gray-500 mt-0.5">发现最优质的 AI Agent 开发工具</p>
            </div>
            <div className="text-sm text-gray-400">
              共 {platforms.length} 个平台/框架
            </div>
          </div>
        </div>
      </header>

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
            {filteredPlatforms.map(platform => (
              <PlatformCard key={platform.id} platform={platform} />
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
