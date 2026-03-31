import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

export default function PlatformDetail({ platform, relatedPlatforms }) {
  const router = useRouter()
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{platform.name} - AI Agent 平台导航</title>
        <meta name="description" content={platform.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            ← 返回首页
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Platform Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
              {platform.logo ? (
                <img 
                  src={platform.logo} 
                  alt={platform.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML = '<span class="text-3xl">🤖</span>'
                  }}
                />
              ) : (
                <span className="text-3xl">🤖</span>
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
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">核心特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {platform.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Detail */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">收费说明</h2>
          <p className="text-gray-600 leading-relaxed">{platform.pricingDetail}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-indigo-600 text-white text-center py-3 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            访问官网 →
          </a>
          <Link
            href="/"
            className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            查看更多平台
          </Link>
        </div>

        {/* Related Platforms */}
        {related.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                            e.target.parentNode.innerHTML = '<span>🤖</span>'
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
          </div>
        )}
      </main>

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
