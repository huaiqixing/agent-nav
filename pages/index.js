import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
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
  return (
    <Link href={`/platform/${platform.id}`} className="card hover:shadow-md transition-shadow block">
      <div className="flex items-start gap-3 mb-3">
        {/* Logo */}
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
          {platform.logo ? (
            <img 
              src={platform.logo} 
              alt={platform.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = '<span class="text-xl">🤖</span>'
              }}
            />
          ) : (
            <span className="text-xl">🤖</span>
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
        <span className={`text-xs font-medium ${
          platform.difficulty === '低' ? 'difficulty-low' :
          platform.difficulty === '中' ? 'difficulty-medium' : 'difficulty-high'
        }`}>
          难度：{platform.difficulty}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          查看详情 →
        </span>
      </div>
    </Link>
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
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
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
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activePricing === opt
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt}
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
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeDifficulty === opt
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt}
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
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI Agent 平台导航 - 发现最优质的 AI Agent 开发工具</title>
        <meta name="description" content="收录国内外主流 AI Agent 平台、框架和工具，帮你快速找到适合的 AI Agent 开发方案" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
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
      <main className="max-w-6xl mx-auto px-4 py-8">
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
          {filteredPlatforms.map(platform => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
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
