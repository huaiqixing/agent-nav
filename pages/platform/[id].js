import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { platforms } from '../../data/platforms'

function getPricingTag(pricing) {
  if (pricing === '免费') return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' }
  if (pricing === '付费') return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
  return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' }
}

function getDifficultyColor(difficulty) {
  if (difficulty === '低') return 'text-green-600'
  if (difficulty === '中') return 'text-yellow-600'
  return 'text-red-600'
}

function getCategoryName(category) {
  const map = {
    'platform': '平台',
    'framework': '框架',
    'automation': '自动化',
    'local': '本地部署',
  }
  return map[category] || category
}

function RelatedPlatformCard({ p }) {
  const [imgError, setImgError] = useState(false)
  
  return (
    <Link 
      key={p.id} 
      href={`/platform/${p.id}`}
      className="p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all block group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform text-indigo-600 font-bold">
          {p.logo && !imgError ? (
            <img 
              src={p.logo} 
              alt={p.name} 
              className="w-full h-full object-contain p-1"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xs">{p.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
          <p className="text-xs text-gray-500 truncate">{p.pricing}</p>
        </div>
      </div>
    </Link>
  )
}

export default function PlatformDetail({ platform, relatedPlatforms }) {
  const router = useRouter()
  const [imgError, setImgError] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  
  if (router.isFallback) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">加载中...</p>
    </div>
  }

  if (!platform) {
    return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <p className="text-gray-500 text-lg">未找到该平台</p>
      <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
        ← 返回首页
      </Link>
    </div>
  }

  const pricingStyle = getPricingTag(platform.pricing)
  const related = relatedPlatforms.filter(p => p.id !== platform.id).slice(0, 3)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{platform.name} - AI Agent 平台导航</title>
        <meta name="description" content={platform.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header - 创意活力风格 */}
      <motion.header
        className="relative overflow-hidden flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-500 to-vibrant-500"></div>

        {/* 动态装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        {/* 浮动内容卡片 */}
        <div className="relative max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
          >
            {/* 返回按钮 */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6 group"
            >
              <motion.span
                className="group-hover:-translate-x-1 transition-transform"
                whileHover={{ x: -3 }}
              >
                ←
              </motion.span>
              返回首页
            </Link>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Logo */}
              <motion.div
                className="relative w-32 h-32 mx-auto md:mx-0"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl blur-lg opacity-50"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl flex items-center justify-center shadow-xl border-2 border-white/50">
                  {platform.logo && !imgError ? (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="w-20 h-20 object-contain"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-4xl font-bold bg-gradient-to-br from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {platform.name.charAt(0)}
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {platform.name}
                    </h1>
                    <p className="text-lg text-gray-500">{platform.nameEn}</p>
                  </div>
                  <motion.span
                    className={`px-4 py-2 rounded-xl text-sm font-bold ${
                      platform.pricing === '免费'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                        : platform.pricing === '付费'
                        ? 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    } shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform.pricing}
                  </motion.span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {platform.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {platform.tags.map(tag => (
                    <motion.span
                      key={tag}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 text-gray-50" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path>
          </svg>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Platform Header */}
        <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100 flex-shrink-0 text-indigo-600 font-bold text-3xl">
              {platform.logo && !imgError ? (
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    const parent = e.target.parentNode
                    const name = platform.name || platform.nameEn || '?'
                    const initial = name[0].toUpperCase()
                    const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6']
                    const color = colors[name.charCodeAt(0) % colors.length]
                    const span = document.createElement('span')
                    span.textContent = initial
                    span.style.cssText = `width:56px;height:56px;border-radius:10px;background:${color};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:bold;color:white;`
                    parent.appendChild(span)
                  }}
                />
              ) : (
                <span>{platform.name.charAt(0)}</span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{platform.name}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">{platform.nameEn}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${pricingStyle.bg} ${pricingStyle.text} ${pricingStyle.border}`}>
                  {platform.pricing}
                </span>
              </div>
              
              <p className="text-gray-600 mt-4 leading-relaxed">{platform.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {platform.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Grid */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-1">分类</p>
            <p className="font-semibold text-gray-900">{getCategoryName(platform.category)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-1">难度</p>
            <p className={`font-semibold ${getDifficultyColor(platform.difficulty)}`}>
              {platform.difficulty}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-1">价格</p>
            <p className="font-semibold text-gray-900">{platform.pricing}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-1">类型</p>
            <p className="font-semibold text-gray-900">{platform.pricingDetail}</p>
          </div>
        </motion.div>

        {/* Tab 切换内容区域 */}
        <motion.div
          variants={item}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-8"
        >
          {/* Tab 导航 */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['核心特点', '收费说明', '学习指南'].map((tab, idx) => (
              <motion.button
                key={tab}
                className={`flex-1 px-6 py-4 text-sm font-semibold whitespace-nowrap relative transition-colors touch-optimized ${
                  activeTab === idx ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(idx)}
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab 内容 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {activeTab === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platform.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all group"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      收费详情
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{platform.pricingDetail}</p>
                  </div>
                </div>
              )}

              {activeTab === 2 && platform.guides && platform.guides.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platform.guides.map((guide, idx) => (
                    <motion.a
                      key={idx}
                      href={guide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-100 group hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-xl shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          📚
                        </motion.div>
                        <span className="font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                          {guide.title}
                        </span>
                      </div>
                      <motion.span
                        className="text-primary-500 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              )}

              {activeTab === 2 && (!platform.guides || platform.guides.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  暂无学习指南
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-indigo-600 text-white text-center py-3 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
          >
            访问官网 →
          </a>
          <Link
            href="/"
            className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-sm"
          >
            查看更多平台
          </Link>
        </motion.div>

        {/* Related Platforms */}
        {related.length > 0 && (
          <motion.div variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">相关平台</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/platform/${p.id}`}
                  className="p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="w-7 h-7 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            const parent = e.target.parentNode
                            const name = p.name || p.nameEn || '?'
                            const initial = name[0].toUpperCase()
                            const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6']
                            const color = colors[name.charCodeAt(0) % colors.length]
                            const span = document.createElement('span')
                            span.textContent = initial
                            span.style.cssText = `width:40px;height:40px;border-radius:8px;background:${color};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;color:white;`
                            parent.appendChild(span)
                          }}
                        />
                      ) : (
                        <span>🤖</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.pricing}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-400">
            <p>AI Agent 平台导航 · 整理更新于 2026-03</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = platforms.map(platform => ({
    params: { id: platform.id }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const platform = platforms.find(p => p.id === params.id)
  
  // 获取同分类的平台作为相关推荐
  const relatedPlatforms = platform 
    ? platforms.filter(p => p.category === platform.category)
    : []

  return {
    props: {
      platform: platform || null,
      relatedPlatforms
    },
    revalidate: 3600 // 每小时重新生成
  }
}
